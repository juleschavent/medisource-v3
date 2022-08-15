import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AlertDelete from '../../../components/AlertDelete';
import { server } from '../../../config';

const Traitement = ({ data: req, id }) => {
  const data = req[0];
  const [deleteAlerte, setDeleteAlerte] = useState(false);
  const [linkMaladie, setLinkMaladie] = useState();

  useEffect(() => {
    fetch(`${server}/api/traitement-has-maladie/${id}`)
      .then((res) => res.json())
      .then((data) => setLinkMaladie(data));
  }, []);

  return (
    <>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2>{data?.name_traitement}</h2>
          <p>Maladies liés :</p>
          <ul>
            {linkMaladie?.map((maladie) => (
              <li key={maladie.name_maladie}>
                {maladie.name_maladie}
              </li>
            ))}
          </ul>
          <Link href={`/traitement-list/${id}/update`}>
            <EditIcon />
          </Link>
        </div>
        <div dangerouslySetInnerHTML={{ __html: data?.desc_traitement }} />
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
        route="traitement"
        deleteAlerte={deleteAlerte}
        setDeleteAlerte={setDeleteAlerte}
        id={id}
      />
    </>
  );
};

export default Traitement;

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
