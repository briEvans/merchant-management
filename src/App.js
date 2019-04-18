import React, { Component } from 'react';
import ProductItem from './ProductItem';
import './App.css';

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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };

    this.onDelete = this.onDelete.bind(this);
  };

  // Read from Database
  componentWillMount() {
    const products = this.getProducts();
    this.setState({ products });
  };

  getProducts() {
    console.log('get products: ', products);
    return products = JSON.parse(localStorage.getItem('products'));
  };

  onDelete(name) {
    console.log('delete: ', name);

    this.setState({});
  };

  render() {
    return (
      <div className="App">
        <h1>Products Manager</h1>
        {
          this.state.products.map(product => {
            return (
              <ProductItem
                key={product.name}
                name={product.name}
                price={product.price}
              />
            )
          })
        }
      </div>
    );
  }
}

export default App;
