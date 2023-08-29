import {Component} from 'react'
import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {ThreeDots} from 'react-loader-spinner'

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import CartContext from '../../context/CartContext'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'

import './index.css'

const apiStatus = {
  initial: 'initial',
  success: 'success',
  failure: 'failure',
  progress: 'progress',
}
class ProductDetails extends Component {
  state = {
    activeApiStatus: apiStatus.initial,
    productData: [],
    similarProducts: [],
    quantity: 1,
  }

  componentDidMount() {
    this.gettingResults()
  }

  updateData = data => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,

    style: data.style,
    title: data.title,
    totalReviews: data.total_reviews,
  })

  gettingResults = async () => {
    this.setState({activeApiStatus: apiStatus.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    //  console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = this.updateData(data)
      const updatedSimilarData = data.similar_products.map(each =>
        this.updateData(each),
      )
      //  console.log(updatedSimilarData)

      //   console.log(formattedData)
      this.setState({
        similarProducts: updatedSimilarData,
        productData: formattedData,
        activeApiStatus: apiStatus.success,
      })
    }
    if (response.ok === false) {
      this.setState({activeApiStatus: apiStatus.failure})
    }
  }

  onDecrement = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  forSuccessFunction = () => (
    <CartContext.Consumer>
      {value => {
        const {productData, similarProducts, quantity} = this.state
        const {
          availability,
          brand,
          description,

          imageUrl,
          price,
          rating,

          title,
          totalReviews,
        } = productData
        const {addCartItem} = value
        const addingToCart = () => {
          addCartItem({...productData, quantity})
        }

        return (
          <div className="for-success-container">
            <div className="inner-success-container">
              <img src={imageUrl} className="image-product" alt="product" />
              <div className="text-container">
                <h1 className="header-ele">{title}</h1>
                <h3 className="header-eleh3">Rs {price}/-</h3>
                <div className="rating-and-review-container">
                  <div className="rating">
                    <p>{rating}</p>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="starone"
                      className="star"
                    />
                  </div>
                  <p className="reviews"> {totalReviews} Reviews</p>
                </div>
                <p className="description">{description}</p>
                <p className="available">
                  <span>Available: </span>
                  {availability}
                </p>
                <p className="available">
                  <span>Brand: </span>
                  {brand}
                </p>
                <hr />
                <div className="button-container">
                  <button
                    type="button"
                    className="buttonIcon"
                    onClick={this.onDecrement}
                  >
                    <BsDashSquare className="icon-dash" />
                  </button>
                  <p className="for-count">{quantity}</p>
                  <button
                    type="button"
                    className="buttonIcon"
                    onClick={this.onIncrement}
                  >
                    <BsPlusSquare className="icon-dash" />
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="button-element-pro"
                    onClick={addingToCart}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
            <div className="for-similar-container">
              <h1 className="similar-products-heading">Similar Products</h1>

              <ul className="similar-products-list">
                {similarProducts.map(eachSimilarProduct => (
                  <SimilarProductItem
                    productDetails={eachSimilarProduct}
                    key={eachSimilarProduct.id}
                  />
                ))}
              </ul>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  forFailure = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button-not-found-element">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  forLoading = () => (
    <div className="products-details-loader-container">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible
      />
    </div>
  )

  forResult = () => {
    const {activeApiStatus} = this.state
    switch (activeApiStatus) {
      case apiStatus.success:
        return this.forSuccessFunction()
      case apiStatus.failure:
        return this.forFailure()
      case apiStatus.progress:
        return this.forLoading()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.forResult()}
      </>
    )
  }
}
export default ProductDetails
