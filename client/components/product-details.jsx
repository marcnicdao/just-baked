import React from 'react';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    const { productId } = this.props.params;
    fetch(`api/products/${productId}`)
      .then(result => result.json())
      .then(product => this.setState({ product: product }));
  }

  render() {
    if (this.state.product) {
      const { setView } = this.props;
      const { image, longDescription, name, price, productId, shortDescription } = this.state.product;
      return (
        <div className="p-5">
          <div key={productId} className="container-fluid details-main-container card">
            <span onClick={() => setView('catalog', {})} className="details-back-button">{'<Back to catalog'}</span>
            <div className="details-container container-fluid d-flex flex-wrap">
              <div className="details-img col-7 mb-5">
                <img src={image}/>
              </div>
              <div className="details-short col-5">
                <h1 className="details-title">{name}</h1>
                <p className="details-price">{`$${(price / 100).toFixed(2)}`}</p>
                <p>{shortDescription}</p>
              </div>
              <div className="details-long col-12">{longDescription}</div>
            </div>
          </div>
        </div>
      );
    } else return null;
  }
}

export default ProductDetail;
