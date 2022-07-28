import { Container } from '@mui/system';
import Header from '../components/Header';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Component {...pageProps} />
      </Container>
    </>
  );
}

export default MyApp;
