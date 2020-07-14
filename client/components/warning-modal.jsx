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
          <h5><b>Warning:</b> This Website is for demonstration purposes only</h5>
          <h5>By clicking <b>Accept</b>, I undestand that no real purchases will be made and personal information should not be used.</h5>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}><h6>Accept</h6></Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default WarningModal;
