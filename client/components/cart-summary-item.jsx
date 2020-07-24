import React from 'react';
import ConfirmDelete from './confirm-delete-modal';

class CartSumamryItem extends React.Component {
  constructor(props) {
    super(props);
    this.modal = React.createRef();
  }

  render() {
    const { item, addToCart, deleteCartItem } = this.props;
    const { image, name, price, shortDescription, quantity, cartItemId } = item;
    const deleteCallBack = quantity === 1
      ? () => this.modal.current.toggle()
      : () => deleteCartItem(cartItemId);

    return (
      <div className={`card cart-item flex-row flex-wrap
                       align-items-center col-xs-12 col-md-10`}>
        <img className="item-img col-12 col-sm-5" src={image} />
        <div className='col-12 col-sm-6 my-2'>
          <h5>{name}</h5>
          <p className="price">{`$${(price / 100).toFixed(2)}`}</p>
          <p>{shortDescription}</p>
          <div className='d-flex justify-content-center quantity'>
            <ConfirmDelete ref={this.modal}
              deleteCartItem={() => deleteCartItem(cartItemId)}/>
            <button onClick={deleteCallBack} className='btn btn-outline-dark'>-</button>;
            <span className='my-auto mx-1'>{quantity}</span>
            <button onClick={() => addToCart(item)} className='btn btn-outline-dark'>+</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartSumamryItem;
