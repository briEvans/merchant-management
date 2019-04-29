import React, { Component } from 'react';
import AddProduct from './AddProduct';
import { withStore } from '@spyna/react-store'

import './App.css';
import './Analytics.css';

class Analytics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: props.products,
      expiredProducts: props.store.get('expiredProducts'),
      sold: props.store.get('sold'),
      revenue: props.store.get('revenue'),
      isLoaded: false
    };

    this.getProducts = props.getProducts.bind(this);
  };


  render() {
    return (
      <div className="container">
        <div className="container-center">
          <div className="container-header">
            <h2>Analytics</h2>
          </div>
          <div className="items">
            <div className="stat">Unexpired Products: <span className="number">{this.state.products.length - this.props.store.get('expiredProducts')}</span></div>
            <div className="stat">Expired Products: <span className="number">{this.state.expiredProducts}</span></div>
            <div className="stat">Sold: <span className="number">{this.state.sold}</span> </div>
            <div className="stat">Losses from Expired: <span className="number">${this.state.expiredProducts*0.35}</span></div>
            <div className="stat">Net Revenue: <span className="number">${this.state.revenue}</span></div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStore(Analytics);
