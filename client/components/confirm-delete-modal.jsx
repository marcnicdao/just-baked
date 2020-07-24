import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ConfirmDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    const { modal } = this.state;
    const { className, deleteCartItem } = this.props;
    return (
      <div>
        <Modal isOpen={modal} toggle={this.toggle} className={className}>
          <ModalHeader toggle={this.toggle}>Confirm delete</ModalHeader>
          <ModalBody>
            Are you sure you want to remove this item from your cart?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => deleteCartItem()}>Delete</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ConfirmDelete;
