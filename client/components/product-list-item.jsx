import React from 'react';

class ProductListItem extends React.Component {
  render() {
    const { image, name, price, productId, shortDescription, setView } = this.props;
    return (
      <div onClick={setView} key={productId} className="card col-lg-3 col-sm-4 col-12 item-card p-lg-2">
        <img src={image} className="item-img my-2" alt="..."></img>
        <div className="card-body">
          <h5 >{name}</h5>
          <p className="price">{price}</p>
          <p >{shortDescription}</p>
        </div>
      </div>

    );
  }
}

export default ProductListItem;
