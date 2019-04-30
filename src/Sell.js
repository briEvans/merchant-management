import React, { Component } from 'react';
import ProductItem from './ProductItem';
import SellProduct from './SellProduct';
import { withStore } from '@spyna/react-store'

import './App.css';
import './Sell.css';

const endpoint = 'http://localhost:8080/api/bananas';

class Sell extends Component {
  constructor(props) {
    super(props);

    this.getAllProducts = props.getAllProducts.bind(this);
    this.onSell = this.onSell.bind(this);
    this.sellPro = this.onSell.bind(this);

  };

  onSell(quantity) {
    let productsAvailable;
    let rev;
    let date;
    let today;

    productsAvailable = this.props.allProducts.length
      - this.props.expiredProducts
      - this.props.soldProducts;

      console.log('\navail: ', productsAvailable,
    '\nall length: ', this.props.allProducts.length, '\nexpired: ', this.props.expiredProducts, '\nsolkd: ',this.props.soldProducts );
    quantity = quantity | 0;

    if (quantity < 1) {
      alert('Must choose a quantity > 0');
    }
    else if (quantity > productsAvailable) {
      alert('You cant sell more than what is Available.');
    } else {
      date = new Date();
      today = date.getFullYear() +
        '-' + `${date.getMonth() + 1}`.padStart(2, 0) +
        '-' + `${date.getDate()}`.padStart(2, 0);

      fetch(endpoint,
        {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            sellDate: today,
            number: parseInt(quantity)
          })
      }).then(res => {
        let sold = this.props.store.get('sold') + 1;

        this.getAllProducts();
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="container-center">
          <div className="container-header">
            <h2>Track your sales</h2>
            <span className="general-stat">Inventory Items: {this.props.allProducts.length}</span>{' | '}
            <span className="general-stat">Revenue: ${this.props.revenue}</span>
          </div>

          <div className="add-product">
            <SellProduct
              onSell={this.onSell}
              getAllProducts={this.getAllProducts} />
          </div>

          <div className="items">
            {
              this.props.allProducts.length > 0 ? (
                this.props.allProducts.map(product => {
                  return (
                    <ProductItem
                      key={product.id}
                      id={product.id}
                      buyDate={product.buyDate}
                      sellDate={product.sellDate}
                      />
                  )
                })
              ) : (<h4> You do not have any items in stock</h4>)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withStore(Sell);
