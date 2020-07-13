import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DemoModal = props => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Warning</ModalHeader>
        <ModalBody>
          <h4><b>WARNING:</b> This Website is for demonstration purposes only</h4>
          <h4>By clicking <b>Accept</b>, I undestand that no real purchases will be made and personal information should not be used.</h4>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}><h4>Accept</h4></Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DemoModal;
