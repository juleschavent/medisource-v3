import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { server } from '../../config';
import { MenuItem, Select } from '@mui/material';
import OrganeMultipleSelect from '../../components/OrganeMultipleSelect';
import TraitementMultipleSelect from '../../components/TraitementMultipleSelect';

const CreateOrgane = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState();
  const [organeList, setOrganeList] = useState();
  const [hasOrgane, setHasOrgane] = useState([]);
  const [traitementList, setTraitementList] = useState();
  const [hasTraitement, setHasTraitement] = useState([]);

  useEffect(() => {
    fetch(`${server}/api/organe`)
      .then((res) => res.json())
      .then((data) => setOrganeList(data))
    fetch(`${server}/api/traitement`)
      .then((res) => res.json())
      .then((data) => setTraitementList(data))
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newData = {
      name,
      desc,
      image
    };
    await fetch(`${server}/api/maladie`, {
      method: 'POST',
      body: JSON.stringify({ newData }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(
        fetch(`${server}/api/new-maladie/${name}`)
          .then((response) => response.json())
          .then((data) => {
            // // INSERT INTO MALADIE HAS ORGANE
            hasOrgane.forEach(async (organe) => {
              const joinData = {
                maladieId: data[0]?.id_maladie,
                organeId: organe
              };
              await fetch(
                `${server}/api/maladie-has-organe/${data[0].id_maladie}`,
                {
                  method: 'POST',
                  body: JSON.stringify({ joinData }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
              )
            })
            // INSERT INTO TRAITEMENT HAS MALADIE
            hasTraitement.forEach(async (traitement) => {
              const joinData = {
                maladieId: data[0]?.id_maladie,
                traitementId: traitement
              };
              await fetch(
                `${server}/api/traitement-has-maladie/${data[0].id_maladie}`,
                {
                  method: 'POST',
                  body: JSON.stringify({ joinData }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
              )
            })
            setTimeout(() => {
              router.push(`/maladie-list/${data[0].id_maladie}`)
            }, 1000)
          })
      )
  };

  return (
    <div>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <OrganeMultipleSelect list={organeList} setHasOrgane={setHasOrgane} />
      <TraitementMultipleSelect
        list={traitementList}
        setHasTraitement={setHasTraitement}
      />
      <ReactQuill preserveWhitespace value={desc} onChange={setDesc} />
      <Button onClick={handleUpdate}>Save</Button>
      <Button onClick={() => router.back()} color="warning">
        Cancel
      </Button>
    </div>
  );
};

export default CreateOrgane;
