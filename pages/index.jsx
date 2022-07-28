import { useContext, useState } from 'react';
import Header from '../components/Header';
import Container from '@mui/material/Container';
import styles from '../styles/Home.module.scss';
import Link from 'next/link';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <div style={{ display: 'flex', marginTop: 40, justifyContent: 'center' }}>
        <Link href="/systeme-list">
          <p className={styles.tab}>Systeme</p>
        </Link>
        <Link href="/organe-list">
          <p className={styles.tab}>Organe</p>
        </Link>
        <Link href="/maladie-list">
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
