import React, { Component } from 'react';
import PropTypes from 'prop-types';


class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  };

  onSubmit(ev) {
    ev.preventDefault();
    this.props.onAdd(this.nameInput.value, this.priceInput.value);
    this.nameInput.value = "";
    this.priceInput.value = "";
  }

  render() {

    return (
      <form onSubmit={this.onSubmit}>
        <h2>Add Product</h2>
        <input
          placeholder="Name"
          ref={nameInput => this.nameInput = nameInput}
        />
        <input
          placeholder="Price"
          ref={priceInput => this.priceInput = priceInput}
        />
        <button>Add</button>
        <hr/>
      </form>
    );
  }
}

export default AddProduct;
