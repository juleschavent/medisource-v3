import styles from '../styles/Header.module.scss';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/router';
import { server } from '../config';

export default function AlertDelete({
  route,
  deleteAlerte,
  setDeleteAlerte,
  id
}) {
  const router = useRouter();
  const handleDelete = async (e) => {
    e.preventDefault();
    await fetch(`${server}/api/${route}/${id}`, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      response.ok ? router.back() : console.log('error');
    });
  };
  return (
    <Dialog
      open={deleteAlerte}
      onClose={() => setDeleteAlerte(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogTitle id="alert-dialog-title">
          Attention, toute suppression sera définitive !
        </DialogTitle>
        <DialogContentText id="alert-dialog-description">
          Etes vous certain de vouloir continuer ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setDeleteAlerte(false)}
          autoFocus
          variant="contained"
        >
          Annuler
        </Button>
        <Button onClick={handleDelete} variant="contained" color="error">
          Supprimer définitivement
        </Button>
      </DialogActions>
    </Dialog>
  );
}
