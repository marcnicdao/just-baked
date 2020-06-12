import React from 'react';

class ProductListItem extends React.Component {
  render() {
    const { image, name, price, productId, shortDescription } = this.props;
    return (
      <div key={productId} className="card col-3 item-card">
        <img src={image} className="card-img-top item-img" alt="..."></img>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p>{price}</p>
          <p className="card-text">{shortDescription}</p>
        </div>
      </div>

    );
  }
}

export default ProductListItem;
