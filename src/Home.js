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
              <div>
                <div className="container">
                  <div className="home-buy-container"></div>
                  <div className="home-sell-container"></div>
                  <div className="home-analytics-container"></div>
                </div>
            </div>
          );
        }
      }

      export default Home;
