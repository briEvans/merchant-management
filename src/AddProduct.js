import React, { Component } from 'react';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0
    }
    this.onSubmit = this.onSubmit.bind(this);

  };

  onSubmit(ev) {
    ev.preventDefault();
    this.props.onAdd(this.quantityInput.value, this.quantityInput.value);
    this.quantityInput.value = "";
  }

  render() {

    return (
      <form onSubmit={this.onSubmit}>
        <input
            placeholder="Quantity"
            ref={nameInput => {this.nameInput = nameInput}}
            />
      <button>Add Product</button>
        <hr/>
      </form>
    );
  }
}

export default AddProduct;
