import React, { Component } from 'react';
import ProductItem from './ProductItem';
import AddProduct from './AddProduct';

import './App.css';
import './Buy.css';

const buyFromSupplierRoute = 'http://localhost:8080/api/bananas';

// localStorage.setItem('products', JSON.stringify(products));

class Buy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: props.products,
      isLoaded: false,
    };
    this.getProducts = props.getProducts.bind(this);
    this.onAdd = this.onAdd.bind(this);
  };

  // Read from Database
  componentDidMount() {
    this.getProducts();
  };

  onAdd(quantity) {
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
    });
  };

  render() {
    return (
      <div className="container-buy">
        <h2>Manage Stock</h2>
        <h3>Keep track of your stock and buy more from your supplier</h3>
        {
          <AddProduct
            onAdd={this.onAdd}
            getProducts={this.getProducts}
          />
        }
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
    );
  }
}

export default Buy;
