import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

export default function MaladieMultipleSelect({ list, setHasMaladie }) {
  const [tempMaladie, setTempMaladie] = useState([]);

  useEffect(() => {
    const arr = [];
    list?.forEach((el) => {
      arr.push(el.name_maladie);
    });
    setTempMaladie(arr);
  }, [list]);

  useEffect(() => {
    const result = [];
    list?.forEach((li) => {
      tempMaladie?.forEach((maladie) => {
        li.name_maladie === maladie
          ? result.push(li.id_maladie)
          : null;
      });
    });
    setHasMaladie(result);
  }, [tempMaladie, list]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setTempMaladie(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <p>maladies liés</p>
      <Select
        multiple
        value={tempMaladie}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {list?.map((item) => (
          <MenuItem key={item.name_maladie} value={item.name_maladie}>
            {item.name_maladie}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
