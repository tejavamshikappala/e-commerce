import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {id, title, brand, quantity, price, imageUrl} = cartItemDetails
      const onClickDecrement = () => {
        decrementCartItemQuantity(id)
      }
      const onClickIncrement = () => {
        incrementCartItemQuantity(id)
      }
      const onRemoveCartItem = () => {
        removeCartItem(id)
      }
      const totalPrice = price * quantity

      return (
        <li className="cart-item">
          <div>
            <img className="cart-product-image" src={imageUrl} alt={title} />

            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{title}</p>
              <p className="cart-product-brand">by {brand}</p>
            </div>
          </div>

          <div className="cart-quantity-container">
            <button
              type="button"
              className="quantity-controller-button"
              data-testid="minus"
              onClick={onClickDecrement}
            >
              <BsDashSquare className="icon-dash" />
            </button>
            <p className="for-count">{quantity}</p>
            <button
              type="button"
              className="quantity-controller-button"
              data-testid="plus"
              onClick={onClickIncrement}
            >
              <BsPlusSquare className="icon-dash" />
            </button>
          </div>
          <div className="total-price-remove-container">
            <p className="cart-total-price">Rs {totalPrice}/-</p>
            <button
              className="remove-button"
              type="button"
              onClick={onRemoveCartItem}
            >
              Remove
            </button>
            <button
              className="delete-button"
              type="button"
              onClick={onRemoveCartItem}
              data-testid="remove"
            >
              <AiFillCloseCircle
                size={24}
                color="#616E7C"
                className="icon-dash"
              />
            </button>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
