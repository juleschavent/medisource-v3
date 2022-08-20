import { server } from '../../config';
import Link from 'next/link';
import { MenuItem, Select } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useMemo } from 'react';
import { useOrderByName } from '../../lib/UseOrderByName';

const TraitementList = ({ data }) => {

  const orderedList = useMemo(() => (
    useOrderByName(data, 'name_traitement')
  ), [data])


  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Select label="Maladie" value="none">
          <MenuItem value={'none'}>Sélectionner un traitement</MenuItem>
          {data &&
            orderedList.map((traitement) => (
              <Link
                key={traitement.id_traitement}
                href={`/traitement-list/${traitement.id_traitement}`}
              >
                <MenuItem value={traitement.id_traitement}>
                  {traitement.name_traitement}
                </MenuItem>
              </Link>
            ))}
        </Select>
        <Link href="/traitement-list/create">
          <AddCircleIcon />
        </Link>
      </div>
    </div>
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
