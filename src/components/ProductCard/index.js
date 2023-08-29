import {Link} from 'react-router-dom'

import './index.css'

const ProductCard = props => {
  const {eachDetail} = props
  const {
    brand,
    id,
    imageUrl,
    price,
    rating,

    title,
  } = eachDetail

  return (
    <Link to={`/products/${id}`} className="for-link">
      <li className="product-card-li-element">
        <img src={imageUrl} alt="product" className="product-image" />
        <h1 className="title">{title}</h1>
        <p className="brand">by {brand}</p>
        <div className="price-container">
          <p className="price">Rs {price}/-</p>
          <div className="rating-container-1">
            <p className="rating">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star-1"
            />
          </div>
        </div>
      </li>
    </Link>
  )
}

export default ProductCard
