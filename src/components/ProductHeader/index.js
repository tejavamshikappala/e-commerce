import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const ProductHeader = props => {
  const {onUpdatingOption, sortingOptions, activeOptionId} = props
  const onChanging = event => {
    onUpdatingOption(event.target.value)
  }
  return (
    <div className="product-header">
      <h1 className="allProductsHeading">All Products</h1>
      <div className="icon-div">
        <BsFilterRight className="icon" />
        <h1>sort by</h1>
        <select
          onChange={onChanging}
          value={activeOptionId}
          className="for-select"
        >
          {sortingOptions.map(each => (
            <option key={each.optionId} value={each.optionId}>
              {each.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
export default ProductHeader
