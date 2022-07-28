import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

export default function TraitementMultipleSelect({ list, setHasTraitement }) {
  const [tempTraitement, setTempTraitement] = useState([]);

  useEffect(() => {
    const arr = [];
    list?.forEach((el) => {
      arr.push(el.name_traitement);
    });
    setTempTraitement(arr);
  }, [list]);

  useEffect(() => {
    const result = [];
    list?.forEach((li) => {
      tempTraitement?.forEach((traitement) => {
        li.name_traitement === traitement
          ? result.push(li.id_traitement)
          : null;
      });
    });
    setHasTraitement(result);
  }, [tempTraitement, list]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setTempTraitement(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <p>Traitements liés</p>
      <Select
        multiple
        value={tempTraitement}
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
          <MenuItem key={item.name_traitement} value={item.name_traitement}>
            {item.name_traitement}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
