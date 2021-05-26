import React from 'react';
import { useDispatch } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import { closeModal } from './modalReducer';

export default function ModalWrapper({ children }) {
  const dispatch = useDispatch();
  return (
    <Modal open={true} onClose={() => dispatch(closeModal())}>
      {children}
    </Modal>
  );
}
