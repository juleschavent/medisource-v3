import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { server } from '../../config';

const CreateSysteme = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newData = {
      name,
      desc,
      image
    };
    await fetch(`${server}/api/systeme`, {
      method: 'POST',
      body: JSON.stringify({ newData }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => router.push(`/systeme-list/${data.insertId}`))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <ReactQuill preserveWhitespace value={desc} onChange={setDesc} />
      <Button onClick={handleUpdate}>Save</Button>
      <Button onClick={() => router.back()} color="warning">
        Cancel
      </Button>
    </div>
  );
};

export default CreateSysteme;
