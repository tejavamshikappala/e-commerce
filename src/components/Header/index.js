import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartListItems = cartList.length
      let Auth
      if (cartListItems > 0) {
        Auth = (
          <li className="li-element">
            <Link to="/cart" className="link">
              Cart<span>{cartListItems}</span>
            </Link>
          </li>
        )
      } else {
        Auth = (
          <li className="li-element">
            <Link to="/cart" className="link">
              Cart
            </Link>
          </li>
        )
      }
      const onLogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }
      return (
        <div className="for-column-in-mobile">
          <nav className="nav-element">
            <Link to="/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                alt="logo"
                className="imageClass"
              />
            </Link>

            <button type="button" className="nav-mobile-btn" onClick={onLogout}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                alt="nav logout"
                className="nav-bar-img"
              />
            </button>

            <ul className="nav-links">
              <li className="li-element">
                <Link to="/" className="link">
                  Home
                </Link>
              </li>
              <li className="li-element">
                <Link to="/products" className="link">
                  Product
                </Link>
              </li>
              {Auth}
              <li className="li-element">
                <button
                  className="button-Element"
                  type="button"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
          <div className="nav-menu-mobile">
            <ul className="nav-menu-list-mobile">
              <li className="nav-menu-item-mobile">
                <Link to="/" className="nav-link">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                    alt="nav home"
                    className="nav-bar-img"
                  />
                </Link>
              </li>

              <li className="nav-menu-item-mobile">
                <Link to="/products" className="nav-link">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                    alt="nav products"
                    className="nav-bar-img"
                  />
                </Link>
              </li>
              <li className="nav-menu-item-mobile">
                <Link to="/cart" className="nav-link">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                    alt="nav cart"
                    className="nav-bar-img"
                  />
                  {cartListItems > 0 ? (
                    <p className="para">{cartListItems}</p>
                  ) : (
                    ''
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default withRouter(Header)
