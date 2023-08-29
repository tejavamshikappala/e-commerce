import {Component} from 'react'
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'

import ProductHeader from '../ProductHeader'

import ProductCard from '../ProductCard'

import FiltersGroup from '../FiltersGroup'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const sortingOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllProductSection extends Component {
  state = {
    status: apiStatusConstants.initial,
    productsData: [],
    activeOptionId: sortingOptions[0].optionId,
    activeCategoryId: '',
    searchInput: '',
    activeRatingId: '',
  }

  componentDidMount() {
    this.forGettingData()
  }

  forGettingData = async () => {
    const {
      activeOptionId,
      activeCategoryId,
      searchInput,
      activeRatingId,
    } = this.state
    this.setState({status: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    //  console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      //   console.log(data)
      const formattedData = data.products.map(each => ({
        brand: each.brand,
        title: each.title,
        id: each.id,
        rating: each.rating,
        price: each.price,
        imageUrl: each.image_url,
      }))
      // console.log(formattedData)
      this.setState({
        productsData: formattedData,
        status: apiStatusConstants.success,
      })
    } else {
      this.setState({status: apiStatusConstants.failure})
    }
  }

  onUpdatingOption = activeOptionId => {
    this.setState({activeOptionId}, this.forGettingData)
  }

  forFailure = () => (
    <div className="no-products-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="no-products-img"
      />
      <h1 className="no-products-heading">Oops! Something Went Wrong</h1>
      <p className="no-products-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  forSuccess = () => {
    const {activeOptionId, productsData} = this.state
    const shouldShowProduct = productsData.length > 0
    return shouldShowProduct ? (
      <div className="for-allProducts-Section">
        <ProductHeader
          activeOptionId={activeOptionId}
          sortingOptions={sortingOptions}
          onUpdatingOption={this.onUpdatingOption}
        />
        <ul className="allProducts-ul-element">
          {productsData.map(each => (
            <ProductCard eachDetail={each} key={each.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-products-img"
          alt="no products"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products. Try other filters.
        </p>
      </div>
    )
  }

  loading = () => (
    <div className="for-loader-all">
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

  renderFunction = () => {
    const {status} = this.state
    switch (status) {
      case apiStatusConstants.success:
        return this.forSuccess()
      case apiStatusConstants.failure:
        return this.forFailure()
      case apiStatusConstants.inProgress:
        return this.loading()

      default:
        return null
    }
  }

  clearFilters = () => {
    this.setState(
      {
        searchInput: '',
        activeCategoryId: '',
        activeRatingId: '',
      },
      this.forGettingData,
    )
  }

  changeRating = activeRatingId => {
    this.setState({activeRatingId}, this.forGettingData)
  }

  changeCategory = activeCategoryId => {
    this.setState({activeCategoryId}, this.forGettingData)
  }

  enterSearchInput = () => {
    this.forGettingData()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  render() {
    const {activeCategoryId, searchInput, activeRatingId} = this.state
    return (
      <div className="all-products-section">
        <FiltersGroup
          searchInput={searchInput}
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
          activeCategoryId={activeCategoryId}
          activeRatingId={activeRatingId}
          changeCategory={this.changeCategory}
          changeRating={this.changeRating}
          clearFilters={this.clearFilters}
        />
        {this.renderFunction()}
      </div>
    )
  }
}

export default AllProductSection
