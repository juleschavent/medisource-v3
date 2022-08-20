import { server } from '../../config';
import Link from 'next/link';
import { MenuItem, Select } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useMemo } from 'react';
import { useOrderByName } from '../../lib/UseOrderByName';

const SystemeList = ({ data }) => {

  const orderedList = useMemo(() => (
    useOrderByName(data, "name_systeme")
  ), [data])

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Select label="Systeme" value="none">
          <MenuItem value={'none'}>Sélectionner un système</MenuItem>
          {data &&
            orderedList.map((systeme) => (
              <Link
                key={systeme.id_systeme}
                href={`/systeme-list/${systeme.id_systeme}`}
              >
                <MenuItem value={systeme.id_systeme}>
                  {systeme.name_systeme}
                </MenuItem>
              </Link>
            ))}
        </Select>
        <Link href="/systeme-list/create">
          <AddCircleIcon />
        </Link>
      </div>
    </div>
  );
};

export default SystemeList;

export async function getServerSideProps(context) {
  const res = await fetch(`${server}/api/systeme`);
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
