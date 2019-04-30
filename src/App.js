import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.scss';

// Internal Routes
import Home from './Components/Home';
import Buy from './Components/Buy';
import Sell from './Components/Sell';
import Analytics from './Components/Analytics';

const endpoint = 'http://localhost:8080/api/bananas';


/* {@func} daysBetween - calculcate the # of days between targetDate and now
 * @params {Date} targetDate a date in milliseconds
 * @return {Number} the number of days between targetDate and now
*/
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


   /* {@func} getAllProducts - fetches list of products and updates the state
    * @return {Object} Array of objects
    */
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
        });
        return data;
      });
    };

   /* {@func} getSoldProducts - Returns the number of sold products
    * @params {object} allProducts, an array of all objects
    * @return {Number} the number of products sold
    */
    getSoldProducts (allProducts) {
      let count = 0;

      allProducts.forEach(product => {
        if (product.sellDate === null) {
          count++;
        }
      });
      return allProducts.length - count;
    }

    /* {@func} getExpiredProducts - Returns the number of expired products
     * @params {object} allProducts, an array of all objects
     * @return {Number} the number of products that are expired
     */
    getExpiredProducts (allProducts) {
      let count = 0;

      allProducts.forEach(product => {
        if (daysBetween(new Date(product.buyDate), new Date(product.sellDate)) > 10) {
          count++;
        }
      });
      return count;
    };

    /* {@func} calculateRevenue - Calculate net revenue
     * @params {object} allProducts, an array of all products
     * @params {object} soldProducts, an array of sold products
     * @return {Number} the net revenue
     */
     calculateRevenue (allProducts, soldProducts) {
       const rev = (soldProducts*0.35)
       - (allProducts.length*0.20);
        return Number(Math.round(rev+'e2')+'e-2');
    };

    render() {
      return (
        <Router>
            <header className="App-header">
              <h1 className="header">My Store Dashboard</h1>
              <ul className="nav">
                <li>
                  <Link className="app-link" to="/" >HOME</Link>
                </li>
                <li>
                  <Link className="app-link" to="/buy">BUY</Link>
                </li>
                <li>
                  <Link className="app-link" to="/sell">SELL</Link>
                </li>
                <li>
                  <Link className="app-link" to="/analytics">ANALYTICS</Link>
                </li>
              </ul>
            </header>

            <Route path="/" component={() => <Home/>}
            />

            <Route path="/buy" component={ () => <Buy
                allProducts={this.state.allProducts}
                getAllProducts={this.getAllProducts}
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

export default App;
