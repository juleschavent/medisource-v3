import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { server } from '../config';
import { useOrderByName } from '../lib/UseOrderByName';

export default function MaladieMultipleSelect({ list, setHasMaladie, id }) {
  const [tempMaladie, setTempMaladie] = useState([]);
  const [currMaladie, setCurrMaladie] = useState([]);

  useEffect(() => {
    fetch(`${server}/api/traitement-has-maladie/${id}`)
      .then((res) => res.json())
      .then((data) => setCurrMaladie(data));
  }, [])

  useEffect(() => {
    const arr = [];
    currMaladie?.forEach((el) => {
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

  const orderedList = useMemo(() => (
    useOrderByName(list, 'name_maladie')
  ), [list])

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
            {selected.map((value) => {
              return tempMaladie.map((maladie) => {
                if (maladie === value) {
                  return <Chip key={value} label={value} />
                }
              })
            })}
          </Box>
        )}
      >
        {orderedList?.map((item) => (
          <MenuItem key={item.name_maladie} value={item.name_maladie}>
            {item.name_maladie}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
