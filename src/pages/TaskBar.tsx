import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Box } from '@mui/system';
import star from '../assets/star.png'
import star2 from '../assets/star_full.png'
import { useMutation, useQuery } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { bookmark, unbookmark, saveTask } from './mutations';

const filter = createFilterOptions<FilmOptionType>();

interface Record {
    inputValue?: string;
    id: number;
    name: string;
    bookmarked: boolean;
}



export default function FreeSoloCreateOptionDialog(taskList: object, token: string) {
    const [value, setValue] = React.useState<FilmOptionType | null>(null);
    const [open, toggleOpen] = React.useState(false);
    const accessToken = localStorage.getItem('token')


    const options = taskList.taskList.data.map((option: Record) => {
        return {
            typeTitle: option.bookmarked ? 'Bookmarked' : 'Tasks',
            ...option
        }
    });

    const queryClient = useQueryClient();

    const saveTaskMutation = useMutation({
        mutationFn: (newTask) => saveTask(newTask.name, accessToken),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        }
    });

    const bookmarkMutation = useMutation({
        mutationFn: (bookmarkedState) => bookmark(bookmarkedState.id, accessToken),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        }
    })
    const unbookmarkMutation = useMutation({
        mutationFn: (bookmarkedState) => unbookmark(bookmarkedState.id, accessToken),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        }
    })

    const changeBookmarkState = (bookmark: boolean, id: number, token: string) => {

        if (bookmark)
            unbookmarkMutation.mutate({ id, token })
        else
            bookmarkMutation.mutate({ id, token })
    }



    const handleClose = () => {
        setDialogValue({
            name: '',
        });
        toggleOpen(false);
    };

    const [dialogValue, setDialogValue] = React.useState({
        name: '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValue({
            name: dialogValue.name,
        });

        saveTaskMutation.mutate({ name: dialogValue.name, token: accessToken })

        handleClose();
    };

    return (
        <React.Fragment>
            <Autocomplete
                id="timenotes"
                value={value}
                options={options}

                groupBy={(option) => option.typeTitle}
                getOptionLabel={(option) => option.name}

                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            toggleOpen(true);
                            setDialogValue({
                                name: newValue,
                            });
                        });
                    } else if (newValue && newValue.inputValue) {
                        toggleOpen(true);
                        setDialogValue({
                            name: newValue.inputValue,
                        });
                    } else {
                        setValue(newValue);
                    }
                }}

                filterOptions={(options, params) => {
                    const filtered = filter(options, params);


                    if (params.inputValue !== '') {
                        filtered.push({
                            typeTitle: 'Create Task',
                            inputValue: params.inputValue,
                            name: `Create new task "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}

                getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.name;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                        <li key={option.id} style={{
                            display: 'flex',
                            width: '100%',
                            justifyItems: 'center',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                            {...optionProps} >
                            {option.name}
                            <Box
                                component="img"
                                sx={{
                                    height: 20,
                                    width: 20,
                                    maxHeight: { xs: 20, md: 20 },
                                    maxWidth: { xs: 20, md: 20 },
                                }}
                                onClick={() => changeBookmarkState(option.bookmarked, option.id, accessToken)}
                                alt="The house from the offer."
                                src={option.bookmarked ? star2 : star}
                            />
                        </li>
                    )
                }}
                sx={{ width: 300 }}
                freeSolo
                renderInput={(params) => <TextField {...params} label="Task Dialog" />}
            />
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Add a new task</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Here you can add new task
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={dialogValue.name}
                            onChange={(event) =>
                                setDialogValue({
                                    ...dialogValue,
                                    name: event.target.value,
                                })
                            }
                            label="name"
                            type="text"
                            variant="standard"
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}

interface FilmOptionType {
    inputValue?: string;
    name: string;
    year?: number;
}