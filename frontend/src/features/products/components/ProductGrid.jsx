import ProductCard from "./ProductCard";

function ProductGrid({ products, onAddToCart, addingProductId }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} isAdding={addingProductId === product.id} onAddToCart={onAddToCart} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
