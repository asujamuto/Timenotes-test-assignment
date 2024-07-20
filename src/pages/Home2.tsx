import { FormControl} from '@mui/base/FormControl';
import FormGroup from '@mui/material/FormGroup';
import { Button, Container, Typography, FormLabel, TextField } from '@mui/material';
import { useState } from 'react';
import { FunctionComponent } from '../common/types';
import { useQuery } from '@tanstack/react-query';
import Autocomplete from '@mui/material/Autocomplete';
import top100Films from './list.json'

const getAuthData = async (email: string, password: string) => {
        const res = await fetch('https://timtest.timenotes.io/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        return res.json();
    };


const getTasks = async (token: string) => {
	
    const getAuthData = async (token: string) => {
		const res = await fetch('https://timtest.timenotes.io/api/v1/tasks?page=1&per_page=10', {
            method: 'GET',
            headers: {
                'Authorization': token,
            },
            
        });
        return res.json();
    };

    const { dataToken, error, isLoading } = await getAuthData(token);

    if (error) return { title: `Error: ${error.message}` };
    if (isLoading) return { title: "isLoading" };
    else return dataToken;

};



const Home = (): FunctionComponent => {

	const [bookmarked, setBookmarked] = useState<any>()
	

	const { dataToken, error, isLoading } = useQuery(
		{
			queryFn: async () => await getAuthData('sokolowskipiotr297@protonmail.com', 'sokolowskipiotr297'),
			queryKey: ['token'],
		}
	)
	if(isLoading) return <h1>isLoading</h1>	
	if (error) return <h1>Error {error.message}</h1>
	else
	{
		console.log(dataToken)
	}
	// const { data, error, isLoading } = useQuery('tasks', getTasks(token))

	const handleSubmit = () => {
		//add to bookmarked
	}
	
	return (
		<Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            justifyContent: 'center',
		}}>
			<form onSubmit={() => handleSubmit}>
				<Typography variant='h4' mb={5}>
					TaskList					
				</Typography>
				<Autocomplete
					disablePortal
					id="combo-box-demo"
					options={top100Films.top100Films}
					sx={{ width: 300 }}
					renderInput={(params) => <TextField {...params} label="Movie" />}
				/>
				<div>{dataToken ? dataToken : "Token"  }</div>
				{/* {
					tasks.map((element) => { 
						return <div>{element.name}</div>
					})
				} */}
				<FormGroup sx={{ gap: 2 }}>
					{/* <FormControl defaultValue="" required>	
						<TextField
							onChange={e => setBookmarked(e.target.value)}
							name="password"
							placeholder="Write your password here"
						/>
					</FormControl> */}
					<Button variant="outlined" type="submit">Add to bookmarked</Button>
				</FormGroup>
			</form>

		</Container>
	);
};

export default Home
