import styles from '../styles/Header.module.scss';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

export default function Header() {
  return (
    <section
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Link href="/">
        <HomeIcon />
      </Link>
      <h1 className={styles.title}>Medisource</h1>
    </section>
  );
}
