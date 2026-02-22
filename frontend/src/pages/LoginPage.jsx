import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [registerMode, setRegisterMode] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (registerMode) {
      await register(form);
    } else {
      await login(form.email, form.password);
    }
    navigate('/');
  };

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <h2>{registerMode ? 'Create account' : 'Login'}</h2>
      {registerMode && (
        <input
          required
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      )}
      <input
        required
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        required
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Continue</button>
      <button type="button" onClick={() => setRegisterMode((s) => !s)}>
        {registerMode ? 'Have an account? Login' : 'Need an account? Register'}
      </button>
    </form>
  );
}
