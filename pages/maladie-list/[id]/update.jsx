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

export default function SystemeUpdate({ data: temp }) {
  const router = useRouter();
  const data = temp[0];
  const [name, setName] = useState(data?.name_maladie);
  const [desc, setDesc] = useState(data?.desc_maladie);
  const [image, setImage] = useState(data?.image_maladie);
  const [organeList, setOrganeList] = useState();
  const [hasOrgane, setHasOrgane] = useState([]);
  const [traitementList, setTraitementList] = useState();
  const [hasTraitement, setHasTraitement] = useState([]);

  useEffect(() => {
    fetch(`${server}/api/organe`)
      .then((res) => res.json())
      .then((data) => setOrganeList(data));
    // fetch(`${server}/api/maladie-has-organe/${data.id_maladie}`)
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));

    fetch(`${server}/api/traitement`)
      .then((res) => res.json())
      .then((data) => setTraitementList(data));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newData = {
      id: data.id_maladie,
      name,
      desc,
      image,
      hasOrgane,
      hasTraitement
    };
    // UPDATE MALADIE ONLY
    await fetch(`${server}/api/maladie/${data.id_maladie}`, {
      method: 'PUT',
      body: JSON.stringify({ newData }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // DELETE ALL RELATION WITH ORGANE
    await fetch(`${server}/api/maladie-has-organe/${data.id_maladie}`, {
      method: 'DELETE'
    });

    // CREATE NEW UPDATED ORGANE RELATION
    hasOrgane.forEach(async (organe) => {
      const joinData = {
        maladieId: newData.id,
        organeId: organe
      };
      await fetch(`${server}/api/maladie-has-organe/${data.id_maladie}`, {
        method: 'POST',
        body: JSON.stringify({ joinData }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    });

    // DELETE ALL RELATION WITH TRAITEMENT
    await fetch(`${server}/api/maladie-has-traitement/${data.id_maladie}`, {
      method: 'DELETE'
    });

    // CREATE NEW UPDATED TRAITEMENT RELATION
    hasTraitement.forEach(async (traitement) => {
      const joinData = {
        maladieId: newData.id,
        traitementId: traitement
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
      <OrganeMultipleSelect list={organeList} setHasOrgane={setHasOrgane} id={data.id_maladie} />
      <TraitementMultipleSelect
        list={traitementList}
        setHasTraitement={setHasTraitement}
        id={data.id_maladie}
      />
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
  const res = await fetch(`${server}/api/maladie/${id}`);
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
