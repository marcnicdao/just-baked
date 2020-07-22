import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {

  groupItemsById(products) {
    const result = {};

    products.forEach(item => {
      Object.keys(item).forEach(key => {
        if (!result[item.productId]) result[item.productId] = {};
        result[item.productId][key] = item[key];
      });
      if (!result[item.productId].quantity) result[item.productId].quantity = 1;
      else result[item.productId].quantity++;
    });
    return Object.values(result);
  }

  render() {
    const { products, setView, addToCart, deleteCartItem } = this.props;
    const totalPrice = products.reduce((accumulator, product) => {
      return accumulator + Number((product.price / 100));
    }, 0).toFixed(2);

    const itemList = this.groupItemsById(products).map(item => {
      return (
        <CartSummaryItem item={item}
          key={item.cartItemId}
          addToCart={addToCart}
          deleteCartItem={deleteCartItem} />
      );
    });
    const footerText = totalPrice === '0.00'
      ? <h2>{'Your cart is empty'}</h2>
      : <div>
        <h4>{`Total: $${totalPrice}`}</h4>
        <button type="button"
          className="btn btn-primary my-2"
          onClick={() => setView('checkout', {})}>Checkout</button>
      </div>;
    return (
      <div className="container col-sm-12 col-lg-9">

        <div className="details-main-container">
          <div className="back-div">
            <button onClick={() => setView('catalog', {})}
              className="details-back-button btn btn-outline-dark">{'Back to catalog'}
            </button>

          </div>
          <h1>Your Cart</h1>
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
