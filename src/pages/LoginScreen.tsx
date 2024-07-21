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
import { getAuthData } from './queries';
import { useEffect } from 'react';

export default function LoginScreen() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassoword] = useState<string>('');
    const [inputs, setInputs] = useState<object>({});
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);
    const [authData, setAuthData] = useState<object>({});
    const [accessToken, setAccessToken] = useState<string>("");
    const navigate = useNavigate();


    
    const authQuery = useQuery({
        queryKey: ['token'],
        queryFn: () => getAuthData(email, password),
    });

    useEffect(() => {
       authQuery.refetch()
       console.log(authQuery.data)
        
        
    }, [email, password])

    

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(event.target.email.value)
        console.log(event.target.password.value)

        setEmail(event.target.email.value)
        setPassoword(event.target.password.value)

        if(authQuery.data.accessToken && accessToken !== undefined)
        {
            setAccessToken(authQuery.data.accessToken)
            localStorage.setItem('token', authQuery.data.accessToken)
            navigate({ to: '/home' })
        }
        
    };
    
    const auth = true;
        

    if(accessToken == "")
    {
        
        return (
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh',
                justifyContent: 'center',
            }}>
                <form onSubmit={handleSubmit}>
                    <Typography variant='h4' mb={5}>
                        Login Screen
                    </Typography>
                    <FormGroup sx={{ gap: 2 }}>
                        <FormControl defaultValue="" required>
                            {/* <Label>Email</Label> */}
                            <FormLabel>Email</FormLabel>
                            <StyledInput
                                name="email"
                                label="email"
                                onChange={e => setEmail(e.target.value)}
                                value={inputs.email}
                                placeholder="Write your name here" />
                            <HelperText />
                        </FormControl>
                        <FormControl defaultValue="" required>
                            <FormLabel>Password</FormLabel>
                            <StyledInput
                                name="password"
                                label="password"
                                onChange={e => setPassoword(e.target.value)}
                                value={inputs.password}
                                placeholder="Write your password here" />
                            <HelperText />
                        </FormControl>
                        <Button variant="outlined" type="submit">Submit</Button>
                        <Button onClick={() => { navigate({ to: '/home' }) }}>Next</Button>
                    </FormGroup>
                </form>
            </Container>
        );

    }
    else
        navigate({ to: '/home', params: accessToken })
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