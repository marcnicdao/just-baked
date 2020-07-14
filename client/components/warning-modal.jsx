import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const WarningModal = props => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Attention</ModalHeader>
        <ModalBody>
          <p><b>Warning:</b> This Website is for demonstration purposes only</p>
          <p>By clicking <b>Accept</b>, I understand that no real purchases will be made and personal information should not be used.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Accept</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default WarningModal;
