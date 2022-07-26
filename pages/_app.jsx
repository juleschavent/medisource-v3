import { Container } from '@mui/system';
import Header from '../components/Header';
import MainContextProvider from '../store/contextMain';
import SystemeContextProvider from '../store/contextSysteme';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <MainContextProvider>
      <SystemeContextProvider>
        <Header />
        <Container maxWidth="lg">
          <Component {...pageProps} />
        </Container>
      </SystemeContextProvider>
    </MainContextProvider>
  );
}

export default MyApp;
