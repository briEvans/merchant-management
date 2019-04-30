import React, { Component } from 'react';
import { withStore } from '@spyna/react-store'

import './App.css';
import './Analytics.css';

class Analytics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };
  };

  render() {
    return (
      <div className="container">
        <div className="container-center">
          <div className="container-header">
            <h2>Analytics</h2>
          </div>
          <div className="items">
            <div className="analytics-stat">Unexpired Products:
              <span className="analytics-num">{this.props.allProducts.length - this.props.expiredProducts}</span>
            </div>
            <div className="analytics-stat">Expired Products:
              <span className="analytics-num">{this.props.expiredProducts}</span>
            </div>
            <div className="analytics-stat">Sold:
              <span className="analytics-num">{this.props.soldProducts}</span>
            </div>
            <div className="analytics-stat">Losses from Expired:
              <span className="analytics-num">${Number(Math.round(this.props.expiredProducts*0.35+'e2')+'e-2')}</span>
            </div>
            <div className="analytics-stat">Net Revenue:
              <span className="analytics-num">${this.props.revenue}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStore(Analytics);
