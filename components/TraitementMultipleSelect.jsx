import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { server } from '../config';

export default function TraitementMultipleSelect({ list, setHasTraitement, id }) {
  const [tempTraitement, setTempTraitement] = useState([]);
  const [currTraitement, setCurrTraitement] = useState([]);

  console.log(currTraitement);

  useEffect(() => {
    fetch(`${server}/api/maladie-has-traitement/${id}`)
      .then((res) => res.json())
      .then((data) => setCurrTraitement(data));
  }, [])

  useEffect(() => {
    const arr = [];
    currTraitement?.forEach((el) => {
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

  const orderedList = useMemo(() => (
    list?.sort((a, b) => {
      const titleA = a.name_traitement.toLowerCase();
      const titleB = b.name_traitement.toLowerCase();
      if (titleA < titleB) {
        return -1;
      }
      return (titleA > titleB) ? 1 : 0;
    })), [list])

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
            {selected.map((value) => {
              return tempTraitement.map((traitement) => {
                if (traitement === value) {
                  return <Chip key={value} label={value} />
                }
              })
            })}
          </Box>
        )}
      >
        {orderedList?.map((item) => (
          <MenuItem key={item.name_traitement} value={item.name_traitement}>
            {item.name_traitement}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
