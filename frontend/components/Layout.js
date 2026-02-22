import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      <header className="header">
        <h1>GroMart SSR</h1>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/orders">Orders</Link>
        </nav>
      </header>
      <main className="container">{children}</main>
    </div>
  );
}
