import React, { Component } from 'react';
import ProductItem from './ProductItem';
import AddProduct from './AddProduct';
import { withStore } from '@spyna/react-store'

import './App.css';
import './Buy.css';

const buyFromSupplierRoute = 'http://localhost:8080/api/bananas';

class Buy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: props.products,
      isLoaded: false
        };

    this.getProducts = props.getProducts.bind(this);

    this.onAdd = this.onAdd.bind(this);
  };

  onAdd(quantity) {

    if (quantity < 1) {
      alert('Must choose a quantity < 0');
    } else {
    let rev = this.props.store.get('revenue') - quantity*0.25;
    let date = new Date();
    let today = date.getFullYear() +
    '-' + `${date.getMonth() + 1}`.padStart(2, 0) +
    '-' + `${date.getDate()}`.padStart(2, 0);

    quantity = quantity | 0;
    fetch(buyFromSupplierRoute,
      {
        method: 'POST',
        headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
        body: JSON.stringify({
          number: parseInt(quantity),
          buyDate: today
        })
    }).then(res => {
      this.getProducts();
      this.props.store.set('revenue', rev);
    });
  }
  };

  render() {
    return (
      <div className="container">
        <div className="container-center">
        <div className="container-header">
          <h2>Buy from your supplier</h2>
          <span>Inventory Items: {this.state.products.length}</span>{' | '}
          <span>Revenue: ${this.props.store.get('revenue')}</span>
      </div>
      {
        <AddProduct
          onAdd={this.onAdd}
          getProducts={this.getProducts}
        />
      }
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

export default withStore(Buy);
