import * as React from 'react';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import FormGroup from '@mui/material/FormGroup';
import { Input, inputClasses } from '@mui/base/Input';
import { styled } from '@mui/system';
import clsx from 'clsx';
import { Button, Container, Typography, FormLabel, TextField } from '@mui/material';
import { useState } from 'react';
import { FunctionComponent } from '../common/types';
import { FormSubmitHandler } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import Home from './Home';


/* const verification = async (email, password) => {
    // Fetcher function
    const getAuthData = async (email, password) => {
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

    const { data, error, isLoading } = await getAuthData(email, password);
    if (error) return { error: `Error: ${error.message}` };
    if (isLoading) return { data: "isLoading" };
    else return data;
};

 */
export default function LoginScreen() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassoword] = useState<string>('');
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);
    const [authData, setAuthData] = useState<object>({});
    const navigate = useNavigate();



    const [fetchData, setFetchData] = useState<boolean>(false)



    /* const handleSubmit = (event) => {
        event.preventDefault()
        setEmail(event.email)
        setPassoword(event.password)
        setFetchData(true)
        setAuthData(() => verification(email, password))
    } */

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const authData = await verification(email, password);

        /* if (authData.error || authData.data?.error === "Invalid email or password") {
            setErrorMessage('Invalid email or password');
        } else {
            // navigate('/home');
        } */
    };


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
                    Login Screen
                </Typography>
                <FormGroup sx={{ gap: 2 }}>
                    <FormControl defaultValue="" required>
                        {/* <Label>Email</Label> */}
                        <FormLabel>Email</FormLabel>
                        <StyledInput onChange={e => setEmail(e.target.value)} name="email" placeholder="Write your name here" />
                        <HelperText />
                    </FormControl>
                    <FormControl defaultValue="" required>
                        <FormLabel>Password</FormLabel>
                        <StyledInput onChange={e => setPassoword(e.target.value)} name="password" placeholder="Write your password here" />
                        <HelperText />
                    </FormControl>
                    <Button variant="outlined" type="submit">Submit</Button>
                    <Button onClick={() => { navigate({ to: '/home' }) }}>Next</Button>
                </FormGroup>
            </form>
        </Container>
    );
}

const StyledInput = styled(Input)(
    ({ theme }) => `

  .${inputClasses.input} {
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  }
`,
);

const Label = styled(
    ({ children, className }: { children?: React.ReactNode; className?: string }) => {
        const formControlContext = useFormControlContext();
        const [dirty, setDirty] = React.useState(false);

        React.useEffect(() => {
            if (formControlContext?.filled) {
                setDirty(true);
            }
        }, [formControlContext]);

        if (formControlContext === undefined) {
            return <p>{children}</p>;
        }

        const { error, required, filled } = formControlContext;
        const showRequiredError = dirty && required && !filled;

        return (
            <p className={clsx(className, error || showRequiredError ? 'invalid' : '')}>
                {children}
                {required ? ' *' : ''}
            </p>
        );
    },
)`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props: {}) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
        if (formControlContext?.filled) {
            setDirty(true);
        }
    }, [formControlContext]);

    if (formControlContext === undefined) {
        return null;
    }

    const { required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};