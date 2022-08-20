import { server } from '../../config';
import Link from 'next/link';
import { MenuItem, Select } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useMemo } from 'react';

const MaladieList = ({ data }) => {

  const orderedList = useMemo(() => (
    data?.sort((a, b) => {
      const titleA = a.name_maladie.toLowerCase();
      const titleB = b.name_maladie.toLowerCase();
      if (titleA < titleB) {
        return -1;
      }
      return (titleA > titleB) ? 1 : 0;
    })), [data])

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Select label="Maladie" value="none">
          <MenuItem value={'none'}>Sélectionner une maladie</MenuItem>
          {data &&
            orderedList.map((maladie) => (
              <Link
                key={maladie.id_maladie}
                href={`/maladie-list/${maladie.id_maladie}`}
              >
                <MenuItem value={maladie.id_maladie}>
                  {maladie.name_maladie}
                </MenuItem>
              </Link>
            ))}
        </Select>
        <Link href="/maladie-list/create">
          <AddCircleIcon />
        </Link>
      </div>
    </div>
  );
};

export default MaladieList;

export async function getServerSideProps(context) {
  const res = await fetch(`${server}/api/maladie`);
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
