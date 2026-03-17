import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const steps = [
  'Analyzing your startup idea...',
  'Researching market size and industry growth...',
  'Identifying competitors and alternatives...',
  'Evaluating your business model...',
  'Assessing risks and challenges...',
  'Generating your validation report...',
]

function Processing() {
  const { submissionId } = useParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1
        return prev
      })
    }, 10000)

    const pollInterval = setInterval(async () => {
      try {
        const res = await axios.get(`https://sprezox-production.up.railway.app/api/status/${submissionId}`)
        if (res.data.status === 'done') {
          clearInterval(pollInterval)
          clearInterval(stepInterval)
          navigate(`/report/${submissionId}`)
        }
      } catch (err) {
        console.log('Polling...')
      }
    }, 5000)

    return () => {
      clearInterval(stepInterval)
      clearInterval(pollInterval)
    }
  }, [submissionId])

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.spinner} />
        <h2 style={styles.title}>Analyzing Your Startup</h2>
        <p style={styles.subtitle}>This takes up to 90 seconds. Please don't close this tab.</p>

        <div style={styles.steps}>
          {steps.map((step, index) => (
            <div key={index} style={{
              ...styles.step,
              color: index === currentStep ? '#6c47ff' : index < currentStep ? '#4CAF50' : '#444444',
              fontWeight: index === currentStep ? 'bold' : 'normal',
            }}>
              {index < currentStep ? '✓' : index === currentStep ? '→' : '○'} {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: 'var(--background)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'var(--font)',
  },
  box: {
    backgroundColor: 'var(--surface)',
    borderRadius: '16px',
    padding: '60px 48px',
    width: '100%',
    maxWidth: '560px',
    border: '1px solid var(--border)',
    textAlign: 'center',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '3px solid var(--border)',
    borderTop: '3px solid var(--primary)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 32px',
  },
  title: {
    color: '#ffffff',
    fontSize: '26px',
    fontWeight: '700',
    marginBottom: '10px',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    color: 'var(--text-muted)',
    fontSize: '14px',
    marginBottom: '40px',
    fontWeight: '400',
  },
  steps: {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  step: {
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
}

export default Processing