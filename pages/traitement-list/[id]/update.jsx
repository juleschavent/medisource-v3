import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { server } from '../../../config';
import { useRouter } from 'next/router';
import { MenuItem, Select } from '@mui/material';
import OrganeMultipleSelect from '../../../components/OrganeMultipleSelect';
import TraitementMultipleSelect from '../../../components/TraitementMultipleSelect';
import MaladieMultipleSelect from '../../../components/MaladieMultipleSelect';

export default function TraitementUpdate({ data: temp }) {
  const router = useRouter();
  const data = temp[0];
  const [name, setName] = useState(data?.name_traitement);
  const [desc, setDesc] = useState(data?.desc_traitement);
  const [image, setImage] = useState(data?.image_maladie);
  const [maladieList, setMaladieList] = useState();
  const [hasMaladie, setHasMaladie] = useState([]);

  useEffect(() => {
    fetch(`${server}/api/maladie`)
      .then((res) => res.json())
      .then((data) => setMaladieList(data));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newData = {
      id: data.id_traitement,
      name,
      desc,
      image,
      hasMaladie
    };
    // UPDATE TRAITEMENT ONLY
    await fetch(`${server}/api/traitement/${data.id_traitement}`, {
      method: 'PUT',
      body: JSON.stringify({ newData }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await fetch(`${server}/api/traitement-has-maladie/${data.id_traitement}`, {
      method: 'DELETE'
    });

    // CREATE NEW UPDATED MALADIE RELATION
    hasMaladie.forEach(async (maladie) => {
      const joinData = {
        maladieId: maladie,
        traitementId: newData.id
      };
      await fetch(`${server}/api/traitement-has-maladie/${data.id_maladie}`, {
        method: 'POST',
        body: JSON.stringify({ joinData }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    });

    router.back();
  };

  return (
    <div>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <MaladieMultipleSelect list={maladieList} setHasMaladie={setHasMaladie} id={data.id_traitement} />
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
  const res = await fetch(`${server}/api/traitement/${id}`);
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
