import React, { Component } from 'react';

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

  };

  onSubmit(ev) {
    ev.preventDefault();
    this.props.onAdd(this.quantityInput.value);
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
      <button>Add Product</button>
      </form>
    );
  }
}

export default AddProduct;
