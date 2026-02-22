import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { api } from '../api/client';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [shippingAddress, setShippingAddress] = useState('');
  const [result, setResult] = useState(null);

  const placeOrder = async () => {
    const payload = {
      shippingAddress,
      items: items.map((item) => ({ productId: item.productId, quantity: item.quantity }))
    };
    const { data } = await api.post('/orders', payload);
    setResult(data);
    clearCart();
  };

  return (
    <section>
      <h2>Checkout</h2>
      {items.map((item) => (
        <p key={item.productId}>
          {item.product.name} x {item.quantity}
        </p>
      ))}
      <p>Total: ${(total / 100).toFixed(2)}</p>
      <textarea
        rows={3}
        placeholder="Shipping address"
        value={shippingAddress}
        onChange={(e) => setShippingAddress(e.target.value)}
      />
      <button disabled={!items.length || !shippingAddress} onClick={placeOrder}>
        Pay & Place order
      </button>
      {result && (
        <p>
          Order placed. Payment provider: {result.payment.provider}, client secret: {result.payment.clientSecret}
        </p>
      )}
    </section>
  );
}
