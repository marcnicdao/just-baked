import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.formHandler = this.formHandler.bind(this);
  }

  formHandler(e) {
    const { id, value } = e.target;

    this.setState({
      [id]: value
    });
  }

  render() {
    const { name, creditCard, shippingAddress } = this.state;
    const { placeOrder } = this.props;
    return (
      <div className='checkout-container container col-10'>
        <h1>My Cart</h1>
        <h4>Order Total</h4>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={this.formHandler}/>
          </div>
          <div className="form-group">
            <label htmlFor="creditCard">Credit Card</label>
            <input type="text"
              className="form-control"
              id="creditCard"
              placeholder="Enter Card Number"
              value={creditCard}
              onChange={this.formHandler}/>
          </div>
          <div className="form-group">
            <label htmlFor="shippingAddress">Address</label>
            <textarea className="form-control"
              id="shippingAddress"
              rows="3"
              value={shippingAddress}
              onChange={this.formHandler}/>
          </div>
          <button type="button"
            className="btn btn-primary"
            onClick={() => placeOrder(this.state)}>Place Order</button>
        </form>
      </div>
    );
  }
}

export default CheckoutForm;
