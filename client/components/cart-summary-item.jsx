import React from 'react';

class CartSumamryItem extends React.Component {
  render() {
    const { image, name, price, shortDescription } = this.props.item;

    return (
      <div className="card cart-item container-fluid flex-row align-items-center">
        <div className="cart-img-container card">
          <img className="cart-img" src={image} />
        </div>
        <div>
          <h2>{name}</h2>
          <p className="price">{`$${(price / 100).toFixed(2)}`}</p>
          <p>{shortDescription}</p>
        </div>
      </div>
    );
  }
}

export default CartSumamryItem;
