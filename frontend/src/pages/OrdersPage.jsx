import { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders').then((res) => setOrders(res.data)).catch(() => setOrders([]));
  }, []);

  return (
    <section>
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <article className="card" key={order.id}>
          <h3>{order.id}</h3>
          <p>Status: {order.status}</p>
          <p>Total: ${(order.totalCents / 100).toFixed(2)}</p>
          <p>{order.shippingAddress}</p>
        </article>
      ))}
    </section>
  );
}
