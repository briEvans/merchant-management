import React, { Component } from 'react';
import ProductItem from './ProductItem';
import AddProduct from './AddProduct';

import './App.css';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: this.props.products,
      revenue: this.props.revenue,
    };
  };

    render() {
      return (
              <div className="container">>
            </div>
          );
        }
      }

      export default Home;
