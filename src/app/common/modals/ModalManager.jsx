import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../../../feature/auth/LoginForm';
import RegisterForm from '../../../feature/auth/RegisterForm';
import AccountForm from '../../../feature/auth/AccountForm';

export default function ModalManager() {
  const modalLookup = { LoginForm, RegisterForm, AccountForm };
  const currentModal = useSelector((state) => state.modals);
  let renderModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderModal}</span>;
}
