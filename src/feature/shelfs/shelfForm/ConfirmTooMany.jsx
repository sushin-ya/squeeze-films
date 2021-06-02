import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

export default function ConfirmTooMany({ confirmOpen, handleClose }) {
  return (
    <Dialog open={confirmOpen} onClose={handleClose}>
      <DialogTitle id='alert-dialog-title'>
        選択した映画が多すぎます！！！
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          オール・タイム・ベスト映画は１０本以下にしぼってください
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          戻る
        </Button>
        <Button onClick={handleClose} color='primary' autoFocus>
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  );
}
