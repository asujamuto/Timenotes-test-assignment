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
import star from './star.png'
import star2 from './star_full.png'
import { useEffect } from 'react';
import list from './list.json'

const filter = createFilterOptions<FilmOptionType>();

export default function FreeSoloCreateOptionDialog() {
    const [value, setValue] = React.useState<FilmOptionType | null>(null);
    const [open, toggleOpen] = React.useState(false);

    const top100Films = list.top100Films;
    const options = top100Films.map((option: { title: string, year: number }) => {
        return {
            typeTitle: option.bookmarked ? 'Bookmarked' : 'Tasks',
            ...option
        }
    });



    const handleClose = () => {
        setDialogValue({
            title: '',
            year: '',
        });
        toggleOpen(false);
    };

    const [dialogValue, setDialogValue] = React.useState({
        title: '',
        year: '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValue({
            title: dialogValue.title,
            year: parseInt(dialogValue.year, 10),
        });
        handleClose();
    };

    return (
        <React.Fragment>
            <Autocomplete
                id="timenotes"
                value={value}
                options={options}

                groupBy={(option) => option.typeTitle}
                getOptionLabel={(option) => option.title}

                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            toggleOpen(true);
                            setDialogValue({
                                title: newValue,
                                year: '',
                            });
                        });
                    } else if (newValue && newValue.inputValue) {
                        toggleOpen(true);
                        setDialogValue({
                            title: newValue.inputValue,
                            year: '',
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
                            title: `Create new task "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}

                getOptionLabel={(option) => {
                    // for example value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.title;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                        <li style={{
                            display: 'flex',
                            width: '100%',
                            justifyItems: 'center',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                            {...optionProps} >
                            {option.title}
                            <Box
                                component="img"
                                sx={{
                                    height: 20,
                                    width: 20,
                                    maxHeight: { xs: 20, md: 20 },
                                    maxWidth: { xs: 20, md: 20 },
                                }}
                                alt="The house from the offer."
                                src={option.year % 2 == 0 ? star : star2}
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
                    <DialogTitle>Add a new film</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Did you miss any film in our list? Please, add it!
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={dialogValue.title}
                            onChange={(event) =>
                                setDialogValue({
                                    ...dialogValue,
                                    title: event.target.value,
                                })
                            }
                            label="title"
                            type="text"
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            value={dialogValue.year}
                            onChange={(event) =>
                                setDialogValue({
                                    ...dialogValue,
                                    year: event.target.value,
                                })
                            }
                            label="year"
                            type="number"
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
    title: string;
    year?: number;
}

