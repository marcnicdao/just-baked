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
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  render() {
    const { view } = this.state;
    const productView = view.name === 'catalog'
      ? <ProductList setView={this.setView} />
      : <ProductDetail params={view.params}
        setView={this.setView}/>;
    return (
      <div className='container-fluid justify-content-center p-0'>
        <Header/>
        {productView}
      </div>
    );
  }
}
