import Navbar from '../components/Navbar/Navbar';

export default function MainLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '2rem' }}>
        {children}
      </main>
      <footer style={{ padding: '1rem', textAlign: 'center', background: '#f8f9fa' }}>
        © QueueAway {new Date().getFullYear()}
      </footer>
    </div>
  );
}