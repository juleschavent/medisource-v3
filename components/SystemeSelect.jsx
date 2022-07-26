import { useEffect, useState } from 'react';
import SystemeRead from './SystemeRead';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { server } from '../config';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Link from 'next/link';

export default function SystemeSelect() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentSysteme, setCurrentSysteme] = useState();

  const handleChange = (e) => {
    setCurrentSysteme(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${server}/api/systeme`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, []);

  if (loading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>error</p>;
  }
  return (
    <>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Select onChange={handleChange} label="Systeme" value="none">
            <MenuItem value={'none'}>Sélectionner un système</MenuItem>
            {data &&
              data.map((systeme) => (
                <MenuItem key={systeme.id_systeme} value={systeme.id_systeme}>
                  <Link href={`/systeme-list/${systeme.id_systeme}`}>
                    {systeme.name_systeme}
                  </Link>
                </MenuItem>
              ))}
          </Select>
          <AddCircleIcon />
        </div>
      </div>
    </>
  );
}
