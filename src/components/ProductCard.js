import './ProductCard.css';

function ProductCard({ products, addToCart }) {
  return (
    <>
      {products.map((product) => (
        <div className="card" key={product.id}>
          <img
            className="main-product-img skeleton"
            src={product.image.url}
          ></img>

          <p>{product.name}</p>
          <p className="price-tag">{product.price.formatted_with_symbol}</p>
          <button
            className="add-to-checkout-button"
            onClick={() => addToCart(product.id, 1)}
          >
            Add To Cart
          </button>
        </div>
      ))}
    </>
  );
}

export default ProductCard;
