import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

export default function OrganeMultipleSelect({ list, setHasOrgane }) {
  const [tempOrgane, setTempOrgane] = useState([]);

  useEffect(() => {
    const arr = [];
    list?.forEach((el) => {
      arr.push(el.name_organe);
    });
    setTempOrgane(arr);
  }, [list]);

  useEffect(() => {
    const result = [];
    list?.forEach((li) => {
      tempOrgane?.forEach((organe) => {
        li.name_organe === organe ? result.push(li.id_organe) : null;
      });
    });
    setHasOrgane(result);
  }, [tempOrgane, list]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setTempOrgane(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <p>Organes liés</p>
      <Select
        multiple
        value={tempOrgane}
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
          <MenuItem key={item.name_organe} value={item.name_organe}>
            {item.name_organe}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
