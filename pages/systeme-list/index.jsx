import { useContext, useState } from 'react';
import Header from '../../components/Header';
import OrganeList from '../../components/OrganeList';
import Container from '@mui/material/Container';
import { SystemeContext } from '../../store/contextSysteme';
import { MainContext } from '../../store/contextMain';
import SystemeSelect from '../../components/SystemeSelect';
import { server } from '../../config';
import Link from 'next/link';
import { MenuItem, Select } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const SystemeList = ({ data }) => {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Select label="Systeme" value="none">
          <MenuItem value={'none'}>Sélectionner un système</MenuItem>
          {data &&
            data.map((systeme) => (
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
