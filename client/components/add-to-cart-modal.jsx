import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AddToCartModal = props => {
  const {
    buttonLabel,
    className,
    setView,
    addToCart,
    scrollToView
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary"
        className = "mb-2"
        onClick={() => {
          toggle();
          addToCart();
        }}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          Item added. Would you like to checkout?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => {
            setView('catalog', {});
            scrollToView();
          } }>Continue Shopping</Button>{' '}
          <Button color="secondary" onClick={() => setView('cart', {})}>View Cart</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddToCartModal;
