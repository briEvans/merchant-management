import React, { Component } from 'react';

class ProductItem extends Component {

  render() {
    const { id, buyDate, sellDate } = this.props;

    return (
      <div>
        <div className="item">
          <span className="col">{id}</span>
          <b>Buy Date:</b> {buyDate} {' | '}
          {sellDate ? <div className="red"> Sold on {sellDate}</div> : <span className="green">In Stock</span>}
        </div>
      </div>
    );
  }
}

export default ProductItem;
