import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetail from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkoutForm';

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
    this.placeOrder = this.placeOrder.bind(this);
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

  placeOrder(order) {
    fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(this.setState({
        cart: [],
        view: {
          name: 'catalog',
          params: {}
        }
      }));
  }

  render() {
    const { view, cart } = this.state;
    let productView;
    switch (view.name) {
      case 'catalog':
        productView = <ProductList setView={this.setView} />;
        break;
      case 'details':
        productView = <ProductDetail params={view.params}
          setView={this.setView}
          addToCart={this.addToCart} />;
        break;
      case 'cart':
        productView = <CartSummary products={cart}
          setView={this.setView} />;
        break;
      case 'checkout':
        productView = <CheckoutForm setView={this.setView}
          placeOrder={this.placeOrder} />;
        break;
    }
    return (
      <div className='container-fluid justify-content-center p-0'>
        <Header cartItemCount={cart.length}
          setView={this.setView} />
        {productView}
      </div>
    );
  }
}
