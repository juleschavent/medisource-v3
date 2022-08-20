import { server } from '../../config';
import Link from 'next/link';
import { MenuItem, Select } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useMemo } from 'react';

const TraitementList = ({ data }) => {

  const orderedList = useMemo(() => (
    data?.sort((a, b) => {
      const titleA = a.name_traitement.toLowerCase();
      const titleB = b.name_traitement.toLowerCase();
      if (titleA < titleB) {
        return -1;
      }
      return (titleA > titleB) ? 1 : 0;
    })), [data])

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
