import { server } from '../../config';
import Link from 'next/link';
import { MenuItem, Select } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useMemo } from 'react';
import { useOrderByName } from '../../lib/UseOrderByName';
import { MsSelect } from '../../components/MsSelect';
import { ESelectTypes } from '../../lib/types';

const TraitementList = ({ data }) => {

  const orderedList = useMemo(() => (
    useOrderByName(data, 'name_traitement')
  ), [data]);


  return (
    <MsSelect list={data} type={ESelectTypes.TRAITEMENT} />
  );
};

export default TraitementList;

export async function getServerSideProps(context) {
  const res = await fetch(`${server}/api/traitement`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true
    };
  }

  return {
    props: { data }
  };
}
