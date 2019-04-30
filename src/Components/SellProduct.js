import React, { Component } from 'react';

class SellProduct extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  };

  /* {@func} onSubmit- Handler for product form
   * @params {Object} ev, the event
   */
  onSubmit(ev) {
    ev.preventDefault();
    this.props.onSell(this.quantityInput.value, this.quantityInput.value);
    this.quantityInput.value = "";
  };

  render() {
    return (
      <form className="product-form" onSubmit={this.onSubmit}>
        <input
          type="number"
          placeholder="Quantity"
          ref={quantityInput => {this.quantityInput = quantityInput}}
        />
        <button>Sell Product</button>
      </form>
    );
  }
}

export default SellProduct;
