import styles from '../styles/Header.module.scss';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext } from 'react';
import { SystemeContext } from '../store/contextSysteme';

export default function AlertLostModification() {
  const { isAlert, handleCancelAlert, handleDiscardAlert } =
    useContext(SystemeContext);
  return (
    <Dialog
      open={isAlert}
      onClose={handleCancelAlert}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogTitle id="alert-dialog-title">
          Attention, toute modification non sauvegardée sera perdu.
        </DialogTitle>
        <DialogContentText id="alert-dialog-description">
          Etes vous certain de vouloir continuer ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelAlert}>Annuler</Button>
        <Button onClick={handleDiscardAlert} autoFocus>
          Ne pas sauvegarder
        </Button>
      </DialogActions>
    </Dialog>
  );
}
