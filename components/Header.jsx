import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import { auth } from '../lib/firebase';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';

export default function Header() {
  return (
    <section className='flex items-center justify-end py-12 bg-blue rounded-br-[4rem] relative'>
      <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center'>
        <Link href="/">
          <HomeIcon 
            className='text-white mr-2 cursor-pointer' 
            style={{ fontSize: '2.4rem'}}
          />
        </Link >
        <Link href="/">
          <span className='text-2xl font-semibold text-white cursor-pointer'>
            Medisource
          </span>
        </Link>
      </div>
      <Button onClick={() => auth.signOut()}>
        <LogoutIcon 
          className='!text-xl text-white' 
          style={{ fontSize: '2.4rem' }} 
        />
      </Button>
    </section >
  );
}
