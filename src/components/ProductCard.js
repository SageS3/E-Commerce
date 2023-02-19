import React, { useContext } from 'react'
import { PropContext } from '../App'
import './ProductCard.css'

function ProductCard() {
  const productCardProps = useContext(PropContext)
  const { products, handleAddToCart } = productCardProps

  const Cards = () => (
    <>
      {products.map((product) => (
        <div className="card" key={product.id}>
          <img
            loading="lazy"
            className="main-product-img"
            src={product.image.url}
          ></img>
          <p>{product.name}</p>
          <p className="price-tag">{product.price.formatted_with_symbol}</p>
          <button
            className="add-to-checkout-button"
            onClick={() => handleAddToCart(product.id, 1)}
          >
            Add To Cart
          </button>
        </div>
      ))}
    </>
  )
  console.log(products)

  const SkeletonCards = () =>
    Array(12).fill(
      <div className="skeleton-card">
        <div className="skeleton-img" />
        <div className="skeleton-product-data"></div>
        <div className="skeleton-product-data"></div>
        <div className="skeleton-button"></div>
      </div>
    )

  return <>{products.length === 0 ? <SkeletonCards /> : <Cards />}</>
}

export default ProductCard
