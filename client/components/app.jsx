import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetail from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(result => (result.json()))
      .then(cart => this.setState({
        cart: cart
      }));
  }

  componentDidMount() {
    this.getCartItems();
  }

  addToCart(product) {
    fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => result.json())
      .then(cartItem => this.setState({
        cart: this.state.cart.concat(cartItem)
      }));
  }

  render() {
    const { view, cart } = this.state;
    const productView = view.name === 'catalog'
      ? <ProductList setView={this.setView} />
      : <ProductDetail params={view.params}
        setView={this.setView}
        addToCart={this.addToCart}/>;
    return (
      <div className='container-fluid justify-content-center p-0'>
        <Header cartItemCount={cart.length}/>
        {productView}
      </div>
    );
  }
}
