import PrimeDealSection from '../PrimeDealSection'

import AllProductSection from '../AllProductSection'

import Header from '../Header'
import './index.css'

const Product = () => (
  <>
    <Header />
    <div className="products-container">
      <PrimeDealSection />
      <AllProductSection />
    </div>
  </>
)

export default Product
