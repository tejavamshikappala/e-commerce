import {Component} from 'react'

import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'

import ProductCard from '../ProductCard'

import './index.css'

const apiStatus = {
  apiStart: 'Initial',
  success: 'Success',
  failure: 'Failure',
  loading: 'progress',
}
class PrimeDealSection extends Component {
  state = {
    data: [],
    status: apiStatus.apiStart,
  }

  componentDidMount() {
    this.getPrimeDeals()
  }

  getPrimeDeals = async () => {
    this.setState({status: apiStatus.loading})

    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/prime-deals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    // console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      //  console.log(data.prime_deals)
      const formattedData = data.prime_deals.map(each => ({
        id: each.id,
        availability: each.availability,
        brand: each.brand,
        description: each.description,
        imageUrl: each.image_url,
        price: each.price,
        rating: each.rating,
        style: each.style,
        title: each.title,
        totalReviews: each.total_reviews,
      }))
      this.setState({data: formattedData, status: apiStatus.success})
    }
    if (response.status === 401) {
      this.setState({status: apiStatus.failure})
    }
  }

  forSuccess = () => {
    const {data} = this.state

    return (
      <div className="for-primDeals-Section">
        <h1 className="primeHeading">Exclusive Prime Deals</h1>
        <ul className="ul-element">
          {data.map(each => (
            <ProductCard eachDetail={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  forFailure = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
      alt="Register Prime"
      className="register-prime-image"
    />
  )

  forLoading = () => (
    <div className="for-loader">
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

  render() {
    const {status} = this.state
    switch (status) {
      case apiStatus.success:
        return this.forSuccess()

      case apiStatus.failure:
        return this.forFailure()
      case apiStatus.loading:
        return this.forLoading()
      default:
        return null
    }
  }
}
export default PrimeDealSection
