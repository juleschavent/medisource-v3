import { server } from '../config';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

export default function SystemeUpdate({ data, handleEdit, setIsSaved }) {
  const [name, setName] = useState(data?.name_systeme);
  const [desc, setDesc] = useState(data?.desc_systeme);
  const [image, setImage] = useState(data?.image_systeme);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newData = {
      id: data.id_systeme,
      name,
      desc,
      image
    };
    await fetch(`${server}/api/systeme/${data.id_systeme}`, {
      method: 'PUT',
      body: JSON.stringify({ newData }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      response.ok ? (handleEdit(), setIsSaved(true)) : console.log('error');
    });
  };

  return (
    <div>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <ReactQuill value={desc} onChange={setDesc} />
      <Button onClick={handleUpdate}>Save</Button>
      <Button onClick={handleEdit} color="warning">
        Cancel
      </Button>
    </div>
  );
}
