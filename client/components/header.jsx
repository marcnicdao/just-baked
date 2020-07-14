import React from 'react';

class Header extends React.Component {

  render() {
    const { cartItemCount, setView } = this.props;
    return (
      <header className="header px-4 pt-4 d-flex justify-content-between">
        <h3 className="logo"
          onClick={() => setView('catalog', {})}>justBaked</h3>
        <div className="cart-icon"
          onClick={() => setView('cart', {})}>
          <div>
            <span>{cartItemCount} items</span>
            <i className="fas fa-shopping-cart fa-lg text-white"></i>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
