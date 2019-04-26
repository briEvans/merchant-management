import React, { Component } from 'react';
import ProductItem from './ProductItem';
import AddProduct from './AddProduct';
import { withStore } from '@spyna/react-store'

import './App.css';
import './Sell.css';

class Sell extends Component {
  constructor(props) {
    super(props);
    console.log('props: sell: ', props);

    this.state = {
      products: Array.from(props.products),
      isLoaded: false
    };
    console.log('props: sell: ', props);
    this.getProducts = props.getProducts.bind(this);
    this.onSell = this.onSell.bind(this);
  };

  componentDidMount () {
    this.setState({isLoaded: true});
  }

  onSell(ev) {

    let rev = this.props.store.get('revenue') + 0.35;
    this.props.store.set('revenue', rev);
  };


  render() {
    return (
      <div className="container-sell">
        <h2>Track your sales</h2>
          <span>Inventory Items: {this.state.products.length}</span>{' | '}
          <span>Revenue: $  {this.props.store.get('revenue')}</span>
        <div className="items">
          {
            this.state.products.length > 0 ? (
                this.state.products.map(product => {
                  return (
                    <ProductItem
                      key={product.id}
                      id={product.id}
                      buyDate={product.buyDate}
                      sellDate={product.sellDate}
                      button=<button className="btn-sell" onClick={this.onSell}>Sell</button>

                    />
                  )
                })
              ) :
              (<h4> You do not have any items in stock</h4>)
            }
        </div>
      </div>
    );
  }
}

export default withStore(Sell);
