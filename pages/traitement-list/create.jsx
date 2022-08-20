import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { server } from '../../config';
import MaladieMultipleSelect from '../../components/MaladieMultipleSelect';

const CreateTraitement = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState();
  const [maladieList, setMaladieList] = useState();
  const [hasMaladie, setHasMaladie] = useState([]);

  useEffect(() => {
    fetch(`${server}/api/maladie`)
      .then((res) => res.json())
      .then((data) => setMaladieList(data))
  }, []);

  console.log(name);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const newData = {
      name,
      desc,
      image
    };
    await fetch(`${server}/api/traitement`, {
      method: 'POST',
      body: JSON.stringify({ newData }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        response.ok ? console.log('success') : console.log('error')
      })
      .then(
        fetch(`${server}/api/new-traitement/${name}`)
          .then((response) => response.json())
          .then((data) => {
            hasMaladie.forEach(async (maladie) => {
              const joinData = {
                maladieId: maladie,
                traitementId: data[0]?.id_traitement
              };
              console.log(data);
              await fetch(
                `${server}/api/maladie-has-traitement/${data[0].id_maladie}`,
                {
                  method: 'POST',
                  body: JSON.stringify({ joinData }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
              ).then((response) => {
                response.ok
                  ? console.log('create maladie relation')
                  : console.log('error');
              })
            })
            setTimeout(() => {
              router.push(`/traitement-list/${data[0].id_traitement}`)
            }, 1000)
          })
      )
  };

  return (
    <div>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <MaladieMultipleSelect
        list={maladieList}
        setHasMaladie={setHasMaladie}
      />
      <ReactQuill preserveWhitespace value={desc} onChange={setDesc} />
      <Button onClick={handleUpdate}>Save</Button>
      <Button onClick={() => router.back()} color="warning">
        Cancel
      </Button>
    </div>
  );
};

export default CreateTraitement;
