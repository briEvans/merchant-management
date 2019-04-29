import React, { Component } from 'react';
import ProductItem from './ProductItem';
import SellProduct from './SellProduct';
import { withStore } from '@spyna/react-store'

import './App.css';
import './Sell.css';

const endpoint = 'http://localhost:8080/api/bananas';

// Given a target date, return the number of days between now and target date
function daysBetween(targetDate) {
  let now = new Date();

  return Math.round(Math.abs((+targetDate) - (+now))/8.64e7);
};

class Sell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: Array.from(props.products)
    };
    this.getProducts = props.getProducts.bind(this);
    this.getExpired = this.getExpired.bind(this);
    this.onSell = this.onSell.bind(this);
  };

  componentDidMount () {
    this.setState({isLoaded: true});
  }

  // return and updatesthe number of expired products in inventory
  getExpired () {
    let count = 0;

    this.state.products.forEach(product => {
      if (daysBetween(new Date(product.buyDate), new Date(product.sellDate)) > 10) {
        count++;
      }
    });
    this.props.store.set('expiredProducts', count);
    return count;
  }

  onSell(quantity) {
    let productsAvailable;
    let rev;
    let date;
    let today;

    this.getExpired();
    productsAvailable = this.state.products.length - this.props.store.get('expiredProducts');

    quantity = quantity | 0;

    if (quantity < 1) {
      alert('Must choose a quantity > 0');
    }
    else if (quantity > productsAvailable) {
      alert('You cant sell more than what is Available.');
    } else {
      rev = this.props.store.get('revenue') + 0.35*(quantity);
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

        this.getProducts();
        this.props.store.set('revenue', rev);
        this.props.store.set('soldProducts', sold);
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="container-center">
          <div className="container-header">
            <h2>Track your sales</h2>
            <span>Inventory Items: {this.state.products.length}</span>{' | '}
            <span>Revenue: $  {this.props.store.get('revenue')}</span>
          </div>
          <div className="add-product">
            <SellProduct
              onSell={this.onSell}
              getProducts={this.getProducts} />
          </div>
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
