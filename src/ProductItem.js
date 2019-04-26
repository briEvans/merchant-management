import React, { Component } from 'react';

class ProductItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      button: props.button
    }
  };

  render() {
    const { id, buyDate, sellDate } = this.props;

    return (
      <div>
      <div className="item">
      <span className="col">{id}</span>
      <b>Buy Date:</b> {buyDate} {' | '}
      {sellDate ? <div className="red"> sold on sellDate</div> : <div className="green">In Stock</div>}
      {this.state.button}
      </div>
      </div>
    );
  }
}

export default ProductItem;
