import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { api } from '../lib/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    api
      .get('/orders', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]));
  }, []);

  return (
    <Layout>
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <article key={order._id} className="card">
          <h3>{order._id}</h3>
          <p>Status: {order.status}</p>
          <p>Total: ₹{(order.totalCents / 100).toFixed(2)}</p>
        </article>
      ))}
    </Layout>
  );
}
