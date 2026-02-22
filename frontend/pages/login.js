import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { api } from '../lib/api';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/auth/login', { email, password });
    if (typeof window !== 'undefined') localStorage.setItem('token', data.token);
    router.push('/orders');
  };

  return (
    <Layout>
      <form className="form" onSubmit={submit}>
        <h2>Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
        <button type="submit">Sign in</button>
      </form>
    </Layout>
  );
}
