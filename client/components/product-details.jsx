import React from 'react';
import AddToCartModal from './add-to-cart-modal';

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
      const { setView, addToCart } = this.props;
      const { image, longDescription, name, price, productId, shortDescription } = this.state.product;
      const { product } = this.state;
      return (
        <div className="container col-sm-12 col-md-9">
          <div key={productId} className="container-fluid details-main-container card">
            <div className="back-div">
              <button onClick={() => setView('catalog', {})}
                className="details-back-button btn btn-outline-dark">{'Back to catalog'}
              </button>
            </div>
            <div className="details-container container-fluid d-flex flex-wrap">
              <div className="details-img col-md-5 col-sm-12 mb-5 card">
                <img src={image}/>
              </div>
              <div className="details-short col-md-6 col-sm-12">
                <h2 className="details-title">{name}</h2>
                <p className="details-price">{`$${(price / 100).toFixed(2)}`}</p>
                <p>{shortDescription}</p>
                <AddToCartModal buttonLabel='Add to cart'
                  addToCart={() => addToCart(product)}
                  setView={setView}/>
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
