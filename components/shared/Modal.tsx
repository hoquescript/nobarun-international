import React from 'react';
import ReactModal from 'react-modal';
import { AiOutlineWarning } from 'react-icons/ai';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface ModalProps {
  modalIsOpen: boolean;
  setIsOpen: any;
  title: string;
  confirmHandler: any;
  body?: string;
}
const Modal = (props: ModalProps) => {
  const { modalIsOpen, setIsOpen, title, body, confirmHandler } = props;

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <ReactModal
      className="modal"
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Example Modal"
    >
      <div className="gradient-bar"></div>
      <div className="text-wrapper">
        <h3>{title}</h3>
        <AiOutlineWarning className="modal__icon" />
        <p>{body || 'Are you sure you want to Delete this?'}</p>
        <button className="button button-no" onClick={closeModal}>
          Cancel
        </button>
        <button
          className="button button-yes"
          onClick={() => {
            confirmHandler();
            closeModal();
          }}
        >
          Confirm
        </button>
      </div>
    </ReactModal>
    // </div>
  );
};

export default Modal;
