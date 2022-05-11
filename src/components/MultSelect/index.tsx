import React from 'react';
import './style.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { iconShow } from '../../assets/index';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
    'Energia',
    'Água',
    'Internet',
    'Gás'
];

interface IProps {
    onChange: (e: any) => void,
    valueItem: string[]
}

const MultSelect: React.FC <IProps> = (props) => {
    const handleChange = (event: SelectChangeEvent<typeof props.valueItem>) => {
        const {
            target: { value },
        } = event;
        props.onChange(typeof value === 'string' ? value.split(',') : value)
    };

    return (
        <FormControl sx={{ m: 1, width: 228, height: 56 }} variant="filled">
            {props.valueItem.length == 0 ? 
                <InputLabel id="demo-multiple-checkbox-label"></InputLabel>
                :
                <InputLabel id="demo-multiple-checkbox-label">Serviços</InputLabel>
            }
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                displayEmpty
                value={props.valueItem}
                onChange={handleChange}
                input={<OutlinedInput label="Todos os serviços" />}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Todos os serviços</em>;
                    }
                    return selected.join(', ');
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem disabled value="">
                    <em>Todos os serviços</em>
                </MenuItem>
            {names.map((id: any, index: number) => (
                <MenuItem key={index} value={id}>
                    <Checkbox checked={props.valueItem.indexOf(id) > -1} />
                    <ListItemText primary={id} />
                </MenuItem>
            ))}
            </Select>
      </FormControl>
    );
};

export default MultSelect;