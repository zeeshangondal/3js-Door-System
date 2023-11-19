import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap components

const MyModal = ({ isOpen, onClose, title, subtitle, paragraph, cancelButtonText, onConfirm }) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{subtitle}</p>
        <p>{paragraph}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {cancelButtonText}
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = () => {
    // Add your logic for the Confirm button here
    console.log('Confirm button clicked');
    closeModal();
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <MyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Modal Title"
        subtitle="Modal Subtitle"
        paragraph="This is the modal content. You can customize it as needed."
        cancelButtonText="Cancel"
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default App;
