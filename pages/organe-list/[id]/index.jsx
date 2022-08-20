import { server } from '../../../config';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AlertDelete from '../../../components/AlertDelete';
import { useMemo } from 'react';

const Organe = ({ data: temp, id }) => {
  const data = temp[0];
  const [deleteAlerte, setDeleteAlerte] = useState(false);
  const [systeme, setSysteme] = useState();

  useEffect(() => {
    fetch(`${server}/api/systeme/${data.systeme_organe}`)
      .then((response) => response.json())
      .then((res) => setSysteme(res))
  }, [data])

  return (
    <>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2>{data?.name_organe}</h2>
          {systeme && <p>{systeme[0]?.name_systeme}</p>}
          <Link href={`/organe-list/${id}/update`}>
            <EditIcon />
          </Link>
        </div>
        <div dangerouslySetInnerHTML={{ __html: data?.desc_organe }} />
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

export default Organe;

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
