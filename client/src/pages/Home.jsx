import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Validate Your Startup Idea</h1>
        <p style={styles.subtitle}>
          Get a deep AI-powered analysis of your startup idea. 
          Scored across 8 dimensions with market research, 
          competitor analysis, and strategic recommendations.
        </p>
        <button style={styles.button} onClick={() => navigate('/form')}>
          Validate My Startup Idea
        </button>
      </div>

      <div style={styles.features}>
  <div style={styles.card}>
    <h3 style={{ color: 'var(--primary)', fontSize: '16px', fontWeight: '600', marginBottom: '10px' }}>Market Research</h3>
    <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>Live web research on your market size and trends</p>
  </div>
  <div style={styles.card}>
    <h3 style={{ color: 'var(--primary)', fontSize: '16px', fontWeight: '600', marginBottom: '10px' }}>Competitor Analysis</h3>
    <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>Identify who you're up against and where the gaps are</p>
  </div>
  <div style={styles.card}>
    <h3 style={{ color: 'var(--primary)', fontSize: '16px', fontWeight: '600', marginBottom: '10px' }}>Startup Score</h3>
    <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>Scored 0-10 across 8 investor-grade dimensions</p>
  </div>
  <div style={styles.card}>
    <h3 style={{ color: 'var(--primary)', fontSize: '16px', fontWeight: '600', marginBottom: '10px' }}>Free Mentorship</h3>
    <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6' }}>Score 5.0 or above and unlock free startup mentorship</p>
  </div>
</div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: 'var(--background)',
    color: 'var(--text)',
    fontFamily: 'var(--font)',
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '120px 20px 80px',
    textAlign: 'center',
    background: 'radial-gradient(ellipse at top, #0c1f35 0%, var(--background) 70%)',
  },
  title: {
    fontSize: '52px',
    fontWeight: '800',
    marginBottom: '24px',
    color: '#ffffff',
    letterSpacing: '-1px',
    lineHeight: '1.1',
  },
  subtitle: {
    fontSize: '18px',
    color: 'var(--text-muted)',
    maxWidth: '560px',
    lineHeight: '1.7',
    marginBottom: '48px',
    fontWeight: '400',
  },
  button: {
    backgroundColor: 'var(--primary)',
    color: '#000000',
    border: 'none',
    padding: '16px 44px',
    fontSize: '16px',
    fontWeight: '700',
    borderRadius: '10px',
    cursor: 'pointer',
    letterSpacing: '0.2px',
    transition: 'all 0.2s ease',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    padding: '0 60px 100px',
  },
  card: {
    backgroundColor: 'var(--surface)',
    padding: '28px',
    borderRadius: '14px',
    border: '1px solid var(--border)',
  },
}

export default Home
