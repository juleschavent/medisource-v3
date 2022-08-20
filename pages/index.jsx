import { useContext, useState } from 'react';
import Header from '../components/Header';
import Container from '@mui/material/Container';
import styles from '../styles/Home.module.scss';
import Link from 'next/link';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <div className="flex mt-10 justify-center text-lg text-base font-semibold gap-4">
        <Link href="/systeme-list">
          <span className='px-8 py-4 bg-cultured rounded-1 cursor-pointer'>Systeme</span>
        </Link>
        <Link href="/organe-list">
          <span className='px-8 py-4 bg-cultured rounded-1 cursor-pointer'>Organe</span>
        </Link>
        <Link href="/maladie-list">
          <span className='px-8 py-4 bg-cultured rounded-1 cursor-pointer'>Maladie</span>
        </Link>
        <Link href="/traitement-list">
          <span className='px-8 py-4 bg-cultured rounded-1 cursor-pointer'>Traitement</span>
        </Link>
      </div>
    </Container>
  );
};

export default Home;
