import { server } from '../../config';
import Link from 'next/link';
import { MenuItem, Select } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const OrganeList = ({ data }) => {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Select label="Maladie" value="none">
          <MenuItem value={'none'}>Sélectionner une maladie</MenuItem>
          {data &&
            data.map((maladie) => (
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

export default OrganeList;

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
