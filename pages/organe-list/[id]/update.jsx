import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { server } from '../../../config';
import { useRouter } from 'next/router';
import { MenuItem, Select } from '@mui/material';

export default function OrganeUpdate({ data: temp }) {
  const router = useRouter();
  const data = temp[0];
  const [name, setName] = useState(data?.name_organe);
  const [desc, setDesc] = useState(data?.desc_organe);
  const [image, setImage] = useState(data?.image_organe);
  const [systeme, setSysteme] = useState(data?.systeme_organe);
  const [systemeList, setSystemeList] = useState();

  useEffect(() => {
    fetch(`${server}/api/systeme`)
      .then((res) => res.json())
      .then((data) => setSystemeList(data));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newData = {
      id: data.id_organe,
      name,
      desc,
      image,
      systeme
    };
    await fetch(`${server}/api/organe/${data.id_organe}`, {
      method: 'PUT',
      body: JSON.stringify({ newData }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      response.ok ? router.back() : console.log('error');
    });
  };

  return (
    <div>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Select
        label="Systeme"
        defaultValue={data?.systeme_organe || ''}
        onChange={(e) => setSysteme(e.target.value)}
      >
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
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(`${server}/api/organe/${id}`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true
    };
  }

  return {
    props: { data, id }
  };
}
