import UseAutocomplete from "./SearchBar";
import CheckboxesTags from "./CheckboxesTags";
import Grouped from "./Grouped";
import FreeSoloCreateOptionDialog from "./TaskBar";
import { Container } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAuthData, getTasks  } from "./queries";
import { Typography, Button } from "@mui/material";
import { useMatch, useParams } from "@tanstack/react-router";


export default function Home() {
	const [tasks, setTasks] = useState(null);
	const accessToken = localStorage.getItem('token')

	
	const logOut = () => {
		localStorage.removeItem('token')	
		window.location.reload()
	}

	const tasksQuery = useQuery({
		queryKey: ['tasks', accessToken],
		queryFn: () => getTasks(accessToken),
		enabled: !!accessToken && accessToken !== null,
		refetchInterval: 60000,
		staleTime: 30000
	});
	
	
	

	if(!accessToken) return <div>No access</div>
	
	useEffect(() => {
		if (tasksQuery.data) {
			setTasks(tasksQuery.data);
		}
	}, [tasksQuery])



	return (
		<>
			
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				height: '100vh',
				justifyContent: 'center',
			}}
		>

			<Typography variant="h4" mb={4}>Task Search Bar</Typography>
			{!tasksQuery.isLoading && tasks !== null ?
				<FreeSoloCreateOptionDialog taskList={tasks} token={accessToken} /> :
				<div>Loading</div>

			}
			<Button variant="none" onClick={logOut}>Log Out</Button>
		</Container>
		</>
	);
}