import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

export default function ConfirmDelete({
  confirmOpen,
  handleClose,
  handleDelete,
  myShelfId,
}) {
  return (
    <Dialog
      open={confirmOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {'オール・タイム・ベスト１０を削除しますか？'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          削除すると復元できませんので、ご確認のほどお願いいたします。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleDelete(myShelfId)} color='primary'>
          削除
        </Button>
        <Button onClick={handleClose} color='primary' autoFocus>
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  );
}
