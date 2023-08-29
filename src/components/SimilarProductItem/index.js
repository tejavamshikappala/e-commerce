import './index.css'

const SimilarProductItem = props => {
  const {productDetails} = props
  const {
    brand,

    imageUrl,
    price,
    rating,

    title,
  } = productDetails

  return (
    <li className="list-class">
      <img src={imageUrl} alt="img" className="imageinlist" />
      <div className="for-inside">
        <h1>{title}</h1>
        <p>by {brand}</p>
        <div className="for-row">
          <p>Rs {price}/-</p>
          <div className="rating-pro">
            <p>{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              className="star-img"
              alt="star"
            />
          </div>
        </div>
      </div>
    </li>
  )
}
export default SimilarProductItem
