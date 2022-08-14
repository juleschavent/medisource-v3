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
      .then((data) => setOrganeList(data));
    fetch(`${server}/api/traitement`)
      .then((res) => res.json())
      .then((data) => setTraitementList(data));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newData = {
      name,
      desc,
      image
    };
    let newMaladie;
    await fetch(`${server}/api/maladie`, {
      method: 'POST',
      body: JSON.stringify({ newData }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        response.ok ? console.log('success') : console.log('error');
      })
      .then(
        fetch(`${server}/api/new-maladie/${name}`)
          .then((response) => response.json())
          .then((data) =>
          console.log(data[0]),
            // INSERT INTO MALADIE HAS ORGANE
            hasOrgane.forEach(async (organe) => {
              const joinData = {
                maladieId: data[0]?.id_maladie,
                organeId: organe
              };
              await fetch(
                `${server}/api/maladie-has-organe/${data.id_maladie}`,
                {
                  method: 'POST',
                  body: JSON.stringify({ joinData }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
              ).then((response) => {
                response.ok
                  ? console.log('create organe relation')
                  : console.log('error');
              });
            }),
          )
      )
      .then(
        fetch(`${server}/api/new-maladie/${name}`)
          .then((response) => response.json())
          .then((data) =>
          console.log(data)
            // INSERT INTO TRAITEMENT HAS MALADIE
            // hasTraitement.forEach(async (traitement) => {
            //   const joinData = {
            //     maladieId: data[0]?.id_maladie,
            //     traitementId: traitement
            //   };
            //   await fetch(
            //     `${server}/api/traitement-has-maladie/${data.id_maladie}`,
            //     {
            //       method: 'POST',
            //       body: JSON.stringify({ joinData }),
            //       headers: {
            //         'Content-Type': 'application/json'
            //       }
            //     }
            //   ).then((response) => {
            //     response.ok
            //       ? console.log('create traitement relation')
            //       : console.log('error');
            //   });
            // })
          )
      )
      // .then(
      //   fetch(`${server}/api/new-maladie/${name}`)
      //     .then((response) => response.json())
      //     .then((data) =>
      //       hasTraitement.forEach(async (traitement) => {
      //         const joinData = {
      //           maladieId: data[0].id_maladie,
      //           traitementId: traitement
      //         };
      //         await fetch(
      //           `${server}/api/traitement-has-maladie/${data.id_maladie}`,
      //           {
      //             method: 'POST',
      //             body: JSON.stringify({ joinData }),
      //             headers: {
      //               'Content-Type': 'application/json'
      //             }
      //           }
      //         ).then((response) => {
      //           response.ok
      //             ? console.log('create organe relation')
      //             : console.log('error');
      //         });
      //       })
      //     )
      // );

    //   // CREATE NEW UPDATED TRAITEMENT RELATION
    //   hasTraitement.forEach(async (traitement) => {
    //     const joinData = {
    //       maladieId: newData.id,
    //       traitementId: traitement
    //     };
    //     await fetch(`${server}/api/traitement-has-maladie/${data.id_maladie}`, {
    //       method: 'POST',
    //       body: JSON.stringify({ joinData }),
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     }).then((response) => {
    //       response.ok
    //         ? console.log('create traitement relation')
    //         : console.log('error');
    //     });
    //   });
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
