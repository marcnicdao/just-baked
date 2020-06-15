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
          key={item.cartItemId}/>
      );
    });
    const footerText = totalPrice === 0
      ? <h2>{'Your cart is empty'}</h2>
      : <h4>{`Total: $${totalPrice}`}</h4>;
    return (
      <div className="container col-10 p-5">
        <div className="container-fluid details-main-container card">
          <span onClick={() => setView('catalog', {})}
            className="details-back-button">{'<Back to catalog'}</span>
          {itemList}
          {footerText}
        </div>
      </div>
    );
  }
}

export default CartSummary;
