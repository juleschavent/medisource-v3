import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { server } from '../../config';
import { MenuItem, Select } from '@mui/material';

const CreateOrgane = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState();
  const [systeme, setSysteme] = useState();
  const [systemeList, setSystemeList] = useState();

  useEffect(() => {
    fetch(`${server}/api/systeme`)
      .then((res) => res.json())
      .then((data) => setSystemeList(data));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newData = {
      name,
      desc,
      image,
      systeme
    };
    await fetch(`${server}/api/organe`, {
      method: 'POST',
      body: JSON.stringify({ newData }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => router.push(`/organe-list/${data.insertId}`))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Select
        label="Systeme"
        // defaultValue="default"
        onChange={(e) => setSysteme(e.target.value)}
      >
        <MenuItem value="default">Selectionner un systeme</MenuItem>
        {systemeList?.map((systeme) => (
          <MenuItem value={systeme.id_systeme} key={systeme.id_systeme}>
            {systeme.name_systeme}
          </MenuItem>
        ))}
      </Select>
      <ReactQuill preserveWhitespace value={desc} onChange={setDesc} />
      <Button onClick={handleUpdate}>Save</Button>
      <Button onClick={() => router.back()} color="warning">
        Cancel
      </Button>
    </div>
  );
};

export default CreateOrgane;
