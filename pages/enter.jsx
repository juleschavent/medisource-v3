import { useContext } from 'react';
import { UserContext } from '../context/authContext';
import { auth, firestore, googleAuthProvider } from '/lib/firebase';
import LoginIcon from '@mui/icons-material/Login';
import { Button } from '@mui/material';

export default function Enter() {
  const { user } = useContext(UserContext);
  return (
    <div className='w-full h-full flex items-center justify-center'>
      {
        user ? <SignOutButton /> : <SignInButton />
      }
    </div>
  );
}

function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <Button 
      className="flex items-center border-none px-4 py-2 rounded-2 cursor-pointer"
      onClick={signInWithGoogle}
      variant="contained"
      disableElevation
    >
      <LoginIcon className='mr-4 text-xl' />
      <span className='text-base'>Sign in with Google</span>
    </Button>
  );
}

function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}
