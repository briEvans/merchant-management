import React, { Component } from 'react';

class ProductItem extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { id, buyDate, sellDate } = this.props;

    return (
      <div>
          <span>{id}</span>
          {` | `}
          <span>{buyDate}</span>
          {` | `}
          <span>{sellDate ? sellDate : 'In Stock'}</span>
      </div>
    );
  }
}

export default ProductItem;
