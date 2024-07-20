import UseAutocomplete from "./SearchBar";
import CheckboxesTags from "./CheckboxesTags";
import Grouped from "./Grouped";
import FreeSoloCreateOptionDialog from "./FreeSoloCreateOptionType";
import { Container } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const getAuthData = async (email, password) => {
	try {
		const res = await fetch('https://timtest.timenotes.io/api/v1/login', {
			method: "POST",
			headers: {
				"Accept": "*/*",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			}),
		});

		return await res.json();
	} catch (error) {
		console.log(error);
		return { title: "error" };
	}
};

const getTasks = async (token) => {
	const res = await fetch('https://timtest.timenotes.io/api/v1/tasks?page=1&per_page=10', {
		method: 'GET', headers: {
			'Authorization': token,
		},
	});
	return res.json();
};

export default function Home() {
	const [tasks, setTasks] = useState(null);
	const [accessToken, setAccessToken] = useState(null);

	const authQuery = useQuery({
		queryKey: ['token'],
		queryFn: () => getAuthData('sokolowskipiotr297@protonmail.com', 'sokolowskipiotr297'),
		refetchInterval: 600000,
		staleTime: 300000,
	});

	const tasksQuery = useQuery({
		queryKey: ['tasks', accessToken],
		queryFn: () => getTasks(accessToken),
		enabled: !!accessToken && accessToken !== null,   
		refetchInterval: 60000,
		staleTime: 59999
	});

	useEffect(() => {
		if (authQuery.data)
		{
			setAccessToken(authQuery.data.accessToken)
		}
		if (tasksQuery.data) {
			setTasks(tasksQuery.data);
		}
	}, [authQuery.data]);

	if (authQuery.isLoading || tasksQuery.isLoading) return <div>Loading...</div>;
	if (authQuery.error || tasksQuery.error) return <div>Request Failed</div>;

	
	console.log(tasks)
	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				height: '100vh',
				justifyContent: 'center',
			}}
		>
			{tasks !== null ? tasks.data.map(e => {
				return <div>{e.name}</div>
			}) : ""}
			<FreeSoloCreateOptionDialog taskList={tasks} />
		</Container>
	);
}
