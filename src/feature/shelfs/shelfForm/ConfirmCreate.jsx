import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

export default function ConfirmCreate({
  confirmOpen,
  handleClose,
  handleSubmit,
  data,
  myShelf,
  isUpdate,
}) {
  return (
    <Dialog
      open={confirmOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {isUpdate
          ? 'オール・タイム・ベスト１０を更新しますか？'
          : 'オール・タイム・ベスト１０を作成しますか？'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          内容をよくご確認の上、決定ボタンを押してください！
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSubmit(data, myShelf)} color='primary'>
          決定
        </Button>
        <Button onClick={handleClose} color='primary' autoFocus>
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  );
}
