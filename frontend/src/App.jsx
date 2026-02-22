import { Link } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes.jsx';
import { useCart } from './context/CartContext.jsx';

export default function App() {
  const { itemCount } = useCart();

  return (
    <div>
      <header className="header">
        <h1>GroMart MVP</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/checkout">Cart ({itemCount})</Link>
        </nav>
      </header>
      <main className="container">
        <AppRoutes />
      </main>
    </div>
  );
}
