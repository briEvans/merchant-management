import React, { Component } from 'react';

class SellProduct extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

  };

  onSubmit(ev) {
    ev.preventDefault();
    this.props.onSell(this.quantityInput.value, this.quantityInput.value);
    this.quantityInput.value = "";
  };

  render() {

    return (
      <div className="add-product">
      <form onSubmit={this.onSubmit}>
        <input
          type="number"
            placeholder="Quantity"
            ref={quantityInput => {this.quantityInput = quantityInput}}
            />
          <button>Sell Product</button>
      </form>
      </div>
    );
  }
}

export default SellProduct;
