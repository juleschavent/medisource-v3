import { useContext, useEffect } from 'react';
import { UserContext } from '../context/authContext';
import { auth, firestore, googleAuthProvider } from '/lib/firebase';

export default function Enter() {
  const { user } = useContext(UserContext);
  return (
    <div>
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
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={'/google.png'} width="30px" /> Sign in with Google
    </button>
  );
}

function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}
