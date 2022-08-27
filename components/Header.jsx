import styles from '../styles/Header.module.scss';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import { auth } from '../lib/firebase';

export default function Header() {
  return (
    <>
      <section className='flex items-center justify-center py-12 bg-blue rounded-br-22'>
        <Link href="/">
          <HomeIcon className='text-2xl text-white mr-2 cursor-pointer' />
        </Link >
        <Link href="/">
          <span className='text-2xl font-semibold text-white cursor-pointer'>Medisource</span>
        </Link>
      </section >
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </>
  );
}
