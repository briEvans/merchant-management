import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    this.props.onDelete(this.props.name);
  };

  render() {
    const { name, price } = this.props;

    return (
      <div className="products">
        <div>
          <span>{name}</span>
          {` | `}
          <span>{price}</span>
          {` | `}
          <button onClick={this.onDelete}>Delete</button>
        </div>
      </div>
    );
  }
}

export default ProductItem;
