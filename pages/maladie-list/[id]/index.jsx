import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AlertDelete from '../../../components/AlertDelete';
import { server } from '../../../config';

const Systeme = ({ data: req, id }) => {
  const data = req[0];
  const [deleteAlerte, setDeleteAlerte] = useState(false);
  const [linkOrgane, setLinkOrgane] = useState();
  const [linkTraitement, setLinkTraitement] = useState();

  useEffect(() => {
    fetch(`${server}/api/maladie-has-organe/${id}`)
      .then((res) => res.json())
      .then((data) => setLinkOrgane(data));
    fetch(`${server}/api/maladie-has-traitement/${id}`)
      .then((res) => res.json())
      .then((data) => setLinkTraitement(data));
  }, []);

  return (
    <>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2>{data?.name_maladie}</h2>
          <p>Organes liés :</p>
          <ul>
            {linkOrgane?.map((organe) => (
              <li key={organe.name_organe}>{organe.name_organe}</li>
            ))}
          </ul>
          <p>Traitements liés :</p>
          <ul>
            {linkTraitement?.map((traitement) => (
              <li key={traitement.name_traitement}>
                {traitement.name_traitement}
              </li>
            ))}
          </ul>
          <Link href={`/maladie-list/${id}/update`}>
            <EditIcon />
          </Link>
        </div>
        <div dangerouslySetInnerHTML={{ __html: data?.desc_maladie }} />
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
        route="maladie"
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
