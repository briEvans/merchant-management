import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

// State Management Library
import { createStore } from '@spyna/react-store'

// Internal Routes
import Home from './Home';
import Buy from './Buy';
import Sell from './Sell';
import Analytics from './Analytics';

const endpoint = 'http://localhost:8080/api/bananas';

// Given a target date, return the number of days between target date and now
function daysBetween(targetDate) {
  let now = new Date();

  return Math.round(Math.abs((+targetDate) - (+now))/8.64e7);
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      localStorageMode: false,
      allProducts: [],
      soldProducts: 0,
      expiredProducts: 0,
      revenue: 0,
     };

     this.getAllProducts = this.getAllProducts.bind(this);
     this.getExpiredProducts = this.getExpiredProducts.bind(this);
     this.getSoldProducts = this.getSoldProducts.bind(this);
     this.calculateRevenue = this.calculateRevenue.bind(this);
   };

   componentDidMount() {
     this.getAllProducts();
     this.setState({ isLoaded: 'true'});
    }

   // Fetch a list of products from API
   getAllProducts() {
     return fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const expired = this.getExpiredProducts(data);
        const sold = this.getSoldProducts(data);
        const rev = this.calculateRevenue(data, this.getSoldProducts(data));

        this.setState({
          allProducts: data.reverse(),
          expiredProducts: expired,
          soldProducts: sold,
          revenue: rev
        }, () => console.log('state: ', this.state))
        return data;
      });
    };

    // return and update the number of sold products in inventory
    getSoldProducts (allProducts) {
      let count = 0;

      allProducts.forEach(product => {
        if (product.sellDate === null) {
          count++;
        }
      });
      return allProducts.length - count;
    }

    // return and update the number of expired products in inventory
    getExpiredProducts (allProducts) {
      let count = 0;

      allProducts.forEach(product => {
        if (daysBetween(new Date(product.buyDate), new Date(product.sellDate)) > 10) {
          count++;
        }
      });
      return count;
    };

    calculateRevenue (allProducts, soldProducts) {
       const rev = (soldProducts*0.35)
       - (allProducts.length*0.25);
        return Number(Math.round(rev+'e2')+'e-2');
    };

  render() {

      const style = this.state.hideHomePage ? {display: 'none'} : {};

      return (
        <Router>
            <header className="App-header">
              <h1 className="header">My Store Dashboard</h1>
              <ul className="nav">
                <li>
                  <Link className="App-link" to="/" >HOME</Link>
                </li>
                <li>
                  <Link className="App-link" to="/buy">BUY</Link>
                </li>
                <li>
                  <Link className="App-link" to="/sell">SELL</Link>
                </li>
                <li>
                  <Link className="App-link" to="/analytics">ANALYTICS</Link>
                </li>
              </ul>
            </header>

            <Route path="/" component={() => <Home/>}
            />
            <Route path="/buy" component={ () => <Buy
                allProducts={this.state.allProducts}
                getAllProducts={this.getAllProducts}
                handleHomeToggle={this.handleHomeToggle}
                revenue={this.state.revenue} />}
            />
            <Route path="/sell" component={ () => <Sell
                allProducts={this.state.allProducts}
                getAllProducts={this.getAllProducts}
                soldProducts={this.state.soldProducts}
                expiredProducts={this.state.expiredProducts}
                revenue={this.state.revenue} />}
            />
            <Route path="/analytics" component={ () => <Analytics
                allProducts={this.state.allProducts}
                soldProducts={this.state.soldProducts}
                expiredProducts={this.state.expiredProducts}
                revenue={this.state.revenue}/>}
            />
        </Router>
      );
  }
}

// State to pass to the react-store object
let initVal = {
  revenue: 0
}

export default createStore(App, initVal);
