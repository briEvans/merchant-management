import React, { Component } from 'react';

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

  };

  onSubmit(ev) {
    ev.preventDefault();
    this.props.onAdd(this.quantityInput.value, this.quantityInput.value);
    this.quantityInput.value = "";
  };

  render() {

    return (
      <div>
      <form onSubmit={this.onSubmit}>
        <input
            placeholder="Quantity"
            ref={quantityInput => {this.quantityInput = quantityInput}}
            />
      <button>Add Product</button>
        <hr/>
      </form>
      </div>
    );
  }
}

export default AddProduct;
