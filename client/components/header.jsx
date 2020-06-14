import React from 'react';

class Header extends React.Component {

  render() {
    const { cartItemCount } = this.props;
    return (
      <header className="header px-4 pt-4 d-flex justify-content-between">
        <h3>$ Wicked Sales</h3>
        <div>
          <h4>
            <span>{cartItemCount} items</span>
            <i className="fas fa-shopping-cart fa-lg text-white"></i>
          </h4>
        </div>
      </header>
    );
  }
}

export default Header;
