import { useEffect, useState, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { server } from '../config';
import { useOrderByName } from '../lib/UseOrderByName';

export default function OrganeMultipleSelect({ list, setHasOrgane, id }) {
  const [tempOrgane, setTempOrgane] = useState([]);
  const [currOrgane, setCurrOrgane] = useState([]);

  useEffect(() => {
    fetch(`${server}/api/maladie-has-organe/${id}`)
      .then((res) => res.json())
      .then((data) => setCurrOrgane(data));
  }, []);

  useEffect(() => {
    const arr = [];
    currOrgane?.forEach((el) => {
      arr.push(el.name_organe);
    });
    setTempOrgane(arr);
  }, [currOrgane]);

  useEffect(() => {
    const result = [];
    list?.forEach((li) => {
      tempOrgane?.forEach((organe) => {
        li.name_organe === organe ? result.push(li.id_organe) : null;
      });
    });
    setHasOrgane(result);
  }, [tempOrgane, list]);

  const orderedList = useMemo(() => (
    useOrderByName(list, 'name_organe')
  ), [list]);

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
            {selected.map((value) => {
              return tempOrgane.map((organe) => {
                if (organe === value) {
                  return <Chip key={value} label={value} />;
                }
              });
            })}
          </Box>
        )}
      >
        {orderedList?.map((item) => (
          <MenuItem key={item.name_organe} value={item.name_organe}>
            {item.name_organe}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
