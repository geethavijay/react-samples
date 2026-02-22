import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { api } from '../api/client';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    api
      .get('/products', { params: { category: category || undefined } })
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]));
  }, [category]);

  return (
    <section>
      <h2>Groceries + Nuts & Spices</h2>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All</option>
        <option value="GROCERIES">Groceries</option>
        <option value="NUTS_SPICES">Nuts & Spices</option>
      </select>
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
