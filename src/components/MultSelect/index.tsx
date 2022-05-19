import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface IProps {
    onChange: (e: any) => void,
    valueItem: string[] | any,
    width: number,
    list: any
};

const theme = createTheme({
    components: {
        MuiSelect: {
            styleOverrides: {
                select: {
                    color: '#2C3941',
                    fontWeight: '700',
                    fontFamily: 'Inter', 
                    borderRadius: '8px',
                    border: '1px solid #AFAFAF', 
                    background: '#fff',
                    paddingTop: '15px',
                    "& :hover": {
                        border: 'none'
                    }
                },
                
            }
        },
        MuiInputLabel: {
            styleOverrides:{
                root: {
                    color: '#AFAFAF',
                    background: 'transparent',
                    "&.Mui-focused": {
                        "color": "#AFAFAF",
                        'background': 'transparent',
                    },
                },
                
            }
        },
        MuiFormControl: {
          styleOverrides: {
              root: {
                  border: '0',
                  "*": {
                      "border": 'none',
                  }
              },
          }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    color: '#2C3941',
                    fontWeight: '700',
                    fontFamily: 'Inter', 
                    background: "transparent"
                }
            }
        },
        
    }
});

const MultSelect: React.FC <IProps> = (props) => {
    const handleChange = (event: SelectChangeEvent<typeof props.valueItem>) => {
        const {
            target: { value },
        } = event;
        props.onChange(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <ThemeProvider theme={theme}>
            <FormControl sx={{ minWidth: props.width, height: 50 }} variant="filled">
                {props.valueItem.length == 0 ? 
                    <span style={{display: 'none'}}/>
                    :
                    <InputLabel>Serviços</InputLabel>
                }
                <Select
                    multiple
                    displayEmpty
                    disableUnderline
                    disableInjectingGlobalStyles
                    value={props.valueItem}
                    onChange={handleChange}
                    input={<OutlinedInput label="Todos os serviços" />}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                        return <em>Todos os serviços</em>;
                        }
                        return selected.join(', ');
                    }}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem disabled value="">
                        <em style={{borderBottom: '1px solid #AFAFAF', width: '100%'}}>Todos os serviços</em>
                    </MenuItem>
                {props.list?.map((id: any, index: number) => (
                    <MenuItem key={index} value={id}>
                        <Checkbox checked={props.valueItem.indexOf(id) > -1} />
                        <ListItemText primary={id} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </ThemeProvider>
    );
};

export default MultSelect;