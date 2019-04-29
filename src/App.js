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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      localStorageMode: false,
      products: []
     };

     this.getProducts = this.getProducts.bind(this);
   };

   componentWillMount() {
     const products = this.getProducts();
     this.setState({ products });
   };

   // Home is mounted on the route '/' so need to render home views with Toggle
   toggleHomeView() {

   };

   // Fetch a list of products from API
   getProducts() {
     return fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          products: json
        })
      });
    };

  render() {
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

          <Route path="/" component={() => <Home/>} />
          <Route path="/buy" component={ () => <Buy
              products={this.state.products}
              revenue={this.state.revenue}
              getProducts={this.getProducts}/>}
          />
          <Route path="/sell" component={ () => <Sell
              products={this.state.products}
              revenue={this.state.revenue}
              getProducts={this.getProducts}/>}
          />
          <Route path="/analytics" component={ () => <Analytics
              products={this.state.products}
              revenue={this.state.revenue}
              getProducts={this.getProducts}/>}
          />
      </Router>
    );
  }
}

const initVal = {
  allProducts: [],
  expiredProducts: 0,
  soldProducts: 0,
  revenue: 0
}

export default createStore(App, initVal);
