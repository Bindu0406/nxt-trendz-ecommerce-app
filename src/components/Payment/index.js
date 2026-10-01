import {Component} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import './index.css'

const paymentOptionsList = [
  {id: 'CARD', displayText: 'Card', isDisabled: true},
  {id: 'NET_BANKING', displayText: 'Net Banking', isDisabled: true},
  {id: 'UPI', displayText: 'UPI', isDisabled: true},
  {id: 'WALLET', displayText: 'Wallet', isDisabled: true},
  {id: 'COD', displayText: 'Cash on Delivery', isDisabled: false},
]

class Payment extends Component {
  state = {
    paymentMethod: '',
    isOrderPlaced: false,
  }

  updatePaymentMethod = event => {
    this.setState({paymentMethod: event.target.id})
  }

  onConfirmOrder = () => {
    this.setState({isOrderPlaced: true})
  }

  render() {
    const {paymentMethod, isOrderPlaced} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const totalItems = cartList.length
          const totalPrice = cartList.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
          )

          return (
            <Popup
              modal
              trigger={
                <button type="button" className="checkout-button">
                  Checkout
                </button>
              }
              position="top center"
            >
              {close => (
                <div className="popup-container">
                  {isOrderPlaced ? (
                    <div className="success-view-container">
                      <p className="success-message">
                        Your order has been placed successfully
                      </p>
                    </div>
                  ) : (
                    <div className="payment-content-container">
                      <button
                        type="button"
                        className="close-button"
                        onClick={() => close()}
                      >
                        &#x2715;
                      </button>
                      <h1 className="payment-heading">Payment Details</h1>
                      <p className="payment-sub-heading">Payment Method</p>
                      <ul className="payment-options-list">
                        {paymentOptionsList.map(eachOption => (
                          <li
                            key={eachOption.id}
                            className="payment-option-item"
                          >
                            <input
                              type="radio"
                              name="paymentOption"
                              id={eachOption.id}
                              value={eachOption.id}
                              disabled={eachOption.isDisabled}
                              onChange={this.updatePaymentMethod}
                            />
                            <label
                              htmlFor={eachOption.id}
                              className={`payment-option-label ${
                                eachOption.isDisabled ? 'disabled-label' : ''
                              }`}
                            >
                              {eachOption.displayText}
                            </label>
                          </li>
                        ))}
                      </ul>
                      <div className="order-summary-container">
                        <p className="order-details-heading">Order details:</p>
                        <p className="summary-text">
                          Quantity:{' '}
                          <span className="summary-value">{totalItems}</span>
                        </p>
                        <p className="summary-text">
                          Total Price:{' '}
                          <span className="summary-value">
                            Rs {totalPrice}/-
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="confirm-order-button"
                        disabled={paymentMethod !== 'COD'}
                        onClick={this.onConfirmOrder}
                      >
                        Confirm Order
                      </button>
                    </div>
                  )}
                </div>
              )}
            </Popup>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Payment
