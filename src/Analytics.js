import React, { Component } from 'react';
import ProductItem from './ProductItem';
import AddProduct from './AddProduct';

import './App.css';
import './Analytics.css';

const products = [
  {
    name: 'iPad',
    price: 200
  },
  {
    name: 'iPhone',
    price: 650
  }
];

localStorage.setItem('products', JSON.stringify(products));

class Analytics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: JSON.parse(localStorage.getItem('products'))
    };

    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);

  };

  // Read from Database
  componentWillMount() {
    const products = this.getProducts();
    this.setState({ products });
  };

  getProducts() {
    return this.state.products;
  };

  onDelete(name) {
    const products = this.getProducts();

    const filteredProducts = products.filter(product => {
      return product.name !== name;
    })

    this.setState({ products: filteredProducts});
  };

  onAdd(name, price) {
    const products = this.getProducts();

    products.push({name, price});
    this.setState({ products });
  };

  onEditSubmit(name, price, originalName) {
    let products = this.getProducts();

    products = products.map(product => {
      if (product.name === originalName) {
        product.name = name;
        product.price = price;
      }

    return product;
  });
  this.setState({ products });
};


  render() {
    return (
      <div className="container-analytics">
        <h2>Manage Stock</h2>
        <h3>Keep track of your stock and Analytics more from your supplier</h3>
        <AddProduct
          onAdd={this.onAdd}
        />
        {
          this.state.products.map(product => {
            return (
              <ProductItem
                key={product.name}
                name={product.name}
                price={product.price}
                onDelete={this.onDelete}
                onEditSubmit={this.onEditSubmit}

              />
            )
          })
        }
      </div>
    );
  }
}

export default Analytics;
