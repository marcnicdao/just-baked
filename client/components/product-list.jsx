import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  getProducts() {
    fetch('/api/products')
      .then(result => result.json())
      .then(products => this.setState({ products: products }));
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const { products } = this.state;
    const { setView } = this.props;
    const productGrid = products.map(item => {
      const { image, name, productId, shortDescription } = item;
      const price = `$${(item.price / 100).toFixed(2)}`;
      return (<ProductListItem image={image}
        name={name}
        price={price}
        productId={productId}
        shortDescription={shortDescription}
        key={productId}
        setView={() => setView('details', { productId: productId })}/>);
    });
    return (
      <div className={`d-flex flex-wrap card-container
      justify-content-center container-fluid`}>
        {productGrid}
      </div>
    );
  }
}

export default ProductList;
