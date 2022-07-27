import { server } from '../../../config';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AlertDelete from '../../../components/AlertDelete';

const Systeme = ({ data: temp, id }) => {
  const data = temp[0];

  console.log(data);

  const [deleteAlerte, setDeleteAlerte] = useState();

  return (
    <>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2>{data?.name_organe}</h2>
          <p> systeme {data?.name_systeme} </p>
          <Link href={`/organe-list/${id}/update`}>
            <EditIcon />
          </Link>
        </div>
        <p dangerouslySetInnerHTML={{ __html: data?.desc_organe }} />
        <Button
          color="error"
          variant="contained"
          disableElevation
          onClick={() => setDeleteAlerte(true)}
        >
          Supprimer
        </Button>
      </div>
      <AlertDelete
        route="organe"
        deleteAlerte={deleteAlerte}
        setDeleteAlerte={setDeleteAlerte}
        id={id}
      />
    </>
  );
};

export default Systeme;

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
