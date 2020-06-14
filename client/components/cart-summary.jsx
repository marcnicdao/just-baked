import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  render() {
    const { products, setView } = this.props;
    const itemList = products.map(item => {
      return (
        <CartSummaryItem item={item}
          key={item.cartItemId}/>
      );
    });
    return (
      <div className="container col-10 p-5">
        <div className="container-fluid details-main-container card">
          <span onClick={() => setView('catalog', {})}
            className="details-back-button">{'<Back to catalog'}</span>
          {itemList}
        </div>
      </div>
    );
  }
}

export default CartSummary;
