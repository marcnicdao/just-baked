import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AddToCartModal = props => {
  const {
    buttonLabel,
    className,
    setView,
    addToCart
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" onClick={() => {
        toggle();
        addToCart();
      }}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          Item added. Would you like to checkout?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Continue Shopping</Button>{' '}
          <Button color="secondary" onClick={() => setView('cart', {})}>View Cart</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddToCartModal;
