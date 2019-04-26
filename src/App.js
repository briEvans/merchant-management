import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import { createStore } from '@spyna/react-store'

import Home from './Home';
import Buy from './Buy';
import Sell from './Sell';
import Analytics from './Analytics';

const getAllItemsRoute = 'http://localhost:8080/api/bananas';
const StoreContext = React.createContext();

 class App extends Component {
   constructor(props) {
     super(props);

     this.state = {
       products: [],
       isLoaded: false,
       localStorageMode: false
     };
     console.log('props:', props);
     this.getProducts = this.getProducts.bind(this);
   };

   componentWillMount() {
     const products = this.getProducts();
     this.setState({ products });
   };
   getProducts() {
     return fetch(getAllItemsRoute)
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
        <div>
          <header className="App-header">
            <h1>My Store Manager</h1>

            <ul className="nav">
              <li>
                <Link className="App-link" to="/" >HOME</Link>
              </li>
              <li>
                <Link className="App-link" to="/buy">BUY
                {}</Link>
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
          <Route
            path="/buy"
            component={ () => <Buy
              products={this.state.products}
              revenue={this.state.revenue}
              getProducts={this.getProducts}
              />}
          />
          <Route path="/sell" component={ () => <Sell
            products={this.state.products}
            revenue={this.state.revenue}
            getProducts={this.getProducts}
            />}
            />
          <Route path="/analytics" component={Analytics} />

          </div>
      </Router>
    );
  }
}

const initVal = {
  revenue: 0
}

export default createStore(App, initVal);
