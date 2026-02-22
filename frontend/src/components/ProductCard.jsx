import { useCart } from '../context/CartContext.jsx';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article className="card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="card-footer">
        <strong>${(product.priceCents / 100).toFixed(2)}</strong>
        <button onClick={() => addItem(product)}>Add to cart</button>
      </div>
    </article>
  );
}
