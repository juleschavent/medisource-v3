import { useContext, useState } from 'react';
import Header from '../components/Header';
import Container from '@mui/material/Container';
import styles from '../styles/Home.module.scss';
import Link from 'next/link';
import { Button } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <div className="flex mt-10 justify-center text-lg text-base font-semibold gap-4">
        <Link href="/systeme-list">
          <Button variant='contained' className='w-[12.5rem]'>
            <span className='text-base'>Systeme</span>
          </Button>
        </Link>
        <Link href="/organe-list">
          <Button variant='contained' className='w-[12.5rem]'>
            <span className='text-base'>Organe</span>
          </Button>
        </Link>
        <Link href="/maladie-list">
          <Button variant='contained' className='w-[12.5rem]'>
            <span className='text-base'>Maladie</span>
          </Button>
        </Link>
        <Link href="/traitement-list">
          <Button variant='contained' className='w-[12.5rem]'>
            <span className='text-base'>Traitement</span>
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default Home;
