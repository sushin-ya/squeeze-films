import React from 'react';
import { useSelector } from 'react-redux';

export default function ModalManager() {
  const modalLookup = {};
  const currentModal = useSelector((state) => state.modal);
  let renderModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderModal}</span>;
}
