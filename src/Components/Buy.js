import React, { Component } from 'react';

// Internal Routes
import ProductItem from './ProductItem';
import AddProduct from './AddProduct';
import '../App.scss';

const endpoint = 'http://localhost:8080/api/bananas';

class Buy extends Component {
  constructor(props) {
    super(props);

    this.getAllProducts = props.getAllProducts.bind(this);
    this.onAdd = this.onAdd.bind(this);
  };

  /* {@func} onAdd - Handler for adding a new product
   * @params {Number} quantity of products to add
   */
  onAdd(quantity) {
    let date;
    let today;

    if (quantity < 1) {
      alert('Must choose a quantity < 0');
    } else {

    // Capture Today's date in the proper format
    date = new Date();
    today = date.getFullYear() +
    '-' + `${date.getMonth() + 1}`.padStart(2, 0) +
    '-' + `${date.getDate()}`.padStart(2, 0);

    quantity = quantity | 0;

    // Purchase new products
    fetch(endpoint,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            buyDate: today,
            number: parseInt(quantity)
          })
        }).then(res => {
          this.getAllProducts();
        });
      }
    };

render() {
  return (
    <div className="container">
      <div className="container-center">
        <div className="container-header">
          <h2>Buy from supplier</h2>
          <span className="general-stat">Inventory Items: {this.props.allProducts.length}</span>{' | '}
            <span className="general-stat">Revenue: ${this.props.revenue}</span>
        </div>

        {
          <AddProduct
            onAdd={this.onAdd}
            getAllProducts={this.getAllProducts}
            />
        }
        <div className="items">
          {
            this.props.allProducts.length > 0 ? (
              this.props.allProducts.map(product => {
                return (
                  <ProductItem
                    key={product.id}
                    id={product.id}
                    buyDate={product.buyDate}
                    sellDate={product.sellDate}
                  />
                )
              })
            ) :
            (<h4> You do not have any items in stock</h4>)
          }
          </div>
        </div>
      </div>
    );
  }
}

export default Buy;
