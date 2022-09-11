import { Container } from '@mui/system';
import { useMemo } from 'react';
import Header from '../components/Header';
import { useUserData } from '../lib/UseUserData';
import '../styles/globals.scss';
import Enter from './enter';

function MyApp({
  Component, pageProps 
}) {
  const userData = useUserData();

  const isAllowed = useMemo(() => {
    if (userData.user?.uid === process.env.NEXT_PUBLIC_UID_ADMIN || userData.user?.uid === process.env.NEXT_PUBLIC_UID_USER) {
      return true;
    }
    return false;
  }, [userData]);

  return (
    isAllowed ? (
      <>
        <Header />
        <Container maxWidth="lg" className='mt-6'>
          <Component {...pageProps} />
        </Container>
      </>
    ) : <Enter />
  );
}

export default MyApp;
