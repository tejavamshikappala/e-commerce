import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.price * eachCartItem.quantity
      })

      let itemValue
      if (cartList.length === 1) {
        itemValue = (
          <p className="total-items">{cartList.length} Item in cart</p>
        )
      } else {
        itemValue = (
          <p className="total-items">{cartList.length} Items in cart</p>
        )
      }

      return (
        <>
          <div className="cart-summary-container">
            <h1 className="order-total-value">
              <span className="order-total-label">Order Total : </span> Rs{' '}
              {total}
              /-
            </h1>
            {itemValue}{' '}
            <button type="button" className="checkout-button d-sm-none">
              Checkout
            </button>
          </div>
          <button type="button" className="checkout-button d-lg-none">
            Checkout
          </button>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
