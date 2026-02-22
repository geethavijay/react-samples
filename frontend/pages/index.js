import Layout from '../components/Layout';

export default function Home({ products }) {
  return (
    <Layout>
      <h2>Groceries + Nuts & Spices</h2>
      <div className="grid">
        {products.map((p) => (
          <article key={p._id} className="card">
            <img src={p.imageUrl} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>₹{(p.priceCents / 100).toFixed(2)}</p>
          </article>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/products`);
    const products = await res.json();
    return { props: { products } };
  } catch {
    return { props: { products: [] } };
  }
}
