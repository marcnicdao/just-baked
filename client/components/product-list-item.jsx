import React from 'react';

class ProductListItem extends React.Component {
  render() {
    const { image, name, price, productId, shortDescription, setView } = this.props;
    return (
      <div onClick={setView} key={productId} className="card col-lg-3 col-md-4 item-card p-5">
        <img src={image} className="card-img-top item-img" alt="..."></img>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="price">{price}</p>
          <p className="card-text">{shortDescription}</p>
        </div>
      </div>

    );
  }
}

export default ProductListItem;
