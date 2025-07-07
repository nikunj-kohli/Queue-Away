import Navbar from '../components/Navbar/Navbar';

export default function MainLayout({ children }) {
  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column' 
    }}>
      <Navbar />
      <main style={{
        flex: 1,
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        {children}
      </main>
    </div>
  );
}