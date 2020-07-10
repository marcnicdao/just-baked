import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  render() {
    const { products, setView } = this.props;
    const totalPrice = products.reduce((accumulator, product) => {
      return accumulator + Number((product.price / 100));
    }, 0).toFixed(2);
    const itemList = products.map(item => {
      return (
        <CartSummaryItem item={item}
          key={item.cartItemId} />
      );
    });
    const footerText = totalPrice === '0.00'
      ? <h2>{'Your cart is empty'}</h2>
      : <div>
        <h4>{`Total: $${totalPrice}`}</h4>
        <button type="button"
          className="btn btn-primary"
          onClick={() => setView('checkout', {})}>Checkout</button>
      </div>;
    return (
      <div className="container col-sm-12 col-lg-9">
        <div className="details-main-container">
          <span onClick={() => setView('catalog', {})}
            className="summary-back-button">{'<Back to catalog'}</span>
          <div className="d-flex flex-wrap">
            {itemList}
          </div>
          {footerText}
        </div>
      </div>
    );
  }
}

export default CartSummary;
