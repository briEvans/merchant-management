import React, { Component } from 'react';

import './App.css';
import './Home.css';

class Home extends Component {
    render() {
      return (
        window.location.pathname === '/' ?
          (<div className="bg">
            <span className="cta">
              <h2>Welcome to your Store, Bob</h2>
              <p> Check your inventory, manage sales, or see analytics.</p>
            </span>
          </div>)
      :
        (<div className="bg"></div>)
    );
  };
};

export default Home;
