import React from 'react';

class CartSumamryItem extends React.Component {
  render() {
    const { image, name, price, shortDescription } = this.props.item;

    return (
      <div className={`card cart-item flex-row flex-wrap item-card
                       align-items-center col-sm-12 col-lg-3`}>
        <img className="item-img" src={image} />
        <div>
          <h5>{name}</h5>
          <p className="price">{`$${(price / 100).toFixed(2)}`}</p>
          <p>{shortDescription}</p>
        </div>
      </div>
    );
  }
}

export default CartSumamryItem;
