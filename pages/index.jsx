import { useContext, useState } from 'react';
import Header from '../components/Header';
import OrganeList from '../components/OrganeList';
import Container from '@mui/material/Container';
import styles from '../styles/Home.module.scss';
import { SystemeContext } from '../store/contextSysteme';
import { MainContext } from '../store/contextMain';
import Link from 'next/link';

const Home = () => {
  const { tab, handleTab } = useContext(MainContext);
  return (
    <Container maxWidth="lg">
      <div style={{ display: 'flex', marginTop: 40, justifyContent: 'center' }}>
        <Link href="/systeme-list">
          <p className={styles.tab}>Systeme</p>
        </Link>
        <Link href="/organe-list">
          <p className={styles.tab}>Organe</p>
        </Link>
        <Link href="/maladie">
          <p className={styles.tab}>Maladie</p>
        </Link>
        <Link href="/traitement">
          <p className={styles.tab}>Traitement</p>
        </Link>
      </div>
    </Container>
  );
};

export default Home;
