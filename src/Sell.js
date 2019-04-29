import React, { Component } from 'react';
import ProductItem from './ProductItem';
import SellProduct from './SellProduct';
import { withStore } from '@spyna/react-store'

import './App.css';
import './Sell.css';

const buyFromSupplierRoute = 'http://localhost:8080/api/bananas';

function daysBetween(buyDate) {
  let now = new Date();

  return Math.round(Math.abs((+buyDate) - (+now))/8.64e7);
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

  getExpired () {
    let count = 0;

    this.state.products.forEach(product => {
      if (daysBetween(new Date(product.buyDate), new Date(product.sellDate)) > 10) {
        count++;
      }
    });
    console.log('expired count', count);
    this.props.store.set('expiredProducts', count);
    return count;
  }


  onSell(quantity) {
    quantity = quantity | 0;
    if (quantity < 1) {
      alert('Must choose a quantity < 0');
    }
    else if (quantity > this.state.products.length) {
      alert('You cant sell more than what is it stock.');
    } else if (quantity > (this.state.products.length - this.getExpired())) {
      alert('You dont have enough unexpired Products. Buy More Fresh Items.');
    } else {
    let rev = this.props.store.get('revenue') + 0.35*(quantity);
    let date = new Date();
    let today = date.getFullYear() +
    '-' + `${date.getMonth() + 1}`.padStart(2, 0) +
    '-' + `${date.getDate()}`.padStart(2, 0);

      fetch(buyFromSupplierRoute,
        {
          method: 'PUT',
          headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
             },
          body: JSON.stringify({
            number: parseInt(quantity),
            sellDate: today
          })
      }).then(res => {
        let sold = this.props.store.get('sold') + 1;

        this.getProducts();
        this.props.store.set('revenue', rev);
        this.props.store.set('sold', sold);
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
                ) :
                (<h4> You do not have any items in stock</h4>)
              }
        </div>
        </div>
      </div>
    );
  }
}

export default withStore(Sell);
