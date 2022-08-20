import { server } from '../../../config';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AlertDelete from '../../../components/AlertDelete';

const Systeme = ({ data: temp, id }) => {
  const data = temp[0];

  const [deleteAlerte, setDeleteAlerte] = useState(false);

  return (
    <>
      <div className='bg-cultured p-4 rounded-2'>
        <div className='flex items-center'>
          <h2 className='text-base'>{data?.name_systeme}</h2>
          <Link href={`/systeme-list/${id}/update`}>
            <EditIcon className='ml-2 cursor-pointer' color="primary" />
          </Link>
        </div>
        <div dangerouslySetInnerHTML={{ __html: data?.desc_systeme }} className='max-w-[830px]' />
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
        route="systeme"
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
  const res = await fetch(`${server}/api/systeme/${id}`);
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
