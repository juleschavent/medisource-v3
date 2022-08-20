import { server } from '../../config';
import Link from 'next/link';
import { MenuItem, Select } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useMemo } from 'react';
import { useOrderByName } from '../../lib/UseOrderByName';

const OrganeList = ({ data }) => {

  const orderedList = useMemo(() => (
    useOrderByName(data, 'name_organe')
  ), [data])


  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Select label="Organe" value="none">
          <MenuItem value={'none'}>Sélectionner un organe</MenuItem>
          {data &&
            orderedList.map((organe) => (
              <Link
                key={organe.id_organe}
                href={`/organe-list/${organe.id_organe}`}
              >
                <MenuItem value={organe.id_organe}>
                  {organe.name_organe}
                </MenuItem>
              </Link>
            ))}
        </Select>
        <Link href="/organe-list/create">
          <AddCircleIcon />
        </Link>
      </div>
    </div>
  );
};

export default OrganeList;

export async function getServerSideProps(context) {
  const res = await fetch(`${server}/api/organe`);
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
