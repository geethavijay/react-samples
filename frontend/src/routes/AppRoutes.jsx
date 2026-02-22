import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import CheckoutPage from '../pages/CheckoutPage.jsx';
import OrdersPage from '../pages/OrdersPage.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function Protected({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/checkout"
        element={
          <Protected>
            <CheckoutPage />
          </Protected>
        }
      />
      <Route
        path="/orders"
        element={
          <Protected>
            <OrdersPage />
          </Protected>
        }
      />
    </Routes>
  );
}
