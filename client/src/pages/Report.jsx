import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'

function Report() {
  const { submissionId } = useParams()
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(`https://sprezox-production.up.railway.app/api/report/${submissionId}`)
        setReport(res.data.report)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching report:', err)
      }
    }
    fetchReport()
  }, [submissionId])

  if (loading) return <div style={styles.loading}>Loading your report...</div>
  if (!report) return <div style={styles.loading}>Report not found.</div>

  const radarData = [
    { dimension: 'Problem', score: report.scores.problemClarity },
    { dimension: 'Solution', score: report.scores.solutionUniqueness },
    { dimension: 'Market', score: report.scores.marketSize },
    { dimension: 'Business Model', score: report.scores.businessModel },
    { dimension: 'Competition', score: report.scores.competitiveLandscape },
    { dimension: 'Team', score: report.scores.teamFit },
    { dimension: 'Execution', score: report.scores.executionFeasibility },
    { dimension: 'Traction', score: report.scores.tractionValidation },
  ]

  const scoreColor = report.overallScore >= 8 ? 'var(--success)' : report.overallScore >= 6 ? 'var(--primary)' : report.overallScore >= 5 ? 'var(--warning)' : 'var(--danger)'

  return (
    <div style={styles.container}>
      <div style={styles.content}>

        {/* Score Hero */}
        <div style={styles.scoreHero}>
          <h1 style={styles.heroTitle}>Your Startup Validation Report</h1>
          <div style={{ ...styles.scoreBadge, backgroundColor: scoreColor }}>
            {report.overallScore.toFixed(1)}
          </div>
          <h2 style={styles.verdict}>{report.verdict}</h2>
          <p style={styles.summary}>{report.executiveSummary}</p>
          <button
            style={styles.downloadBtn}
            onClick={() => window.open(`https://sprezox-production.up.railway.app/api/report/${submissionId}/pdf`, '_blank')}
          >
            ↓ Download PDF Report
          </button>
        </div>

        {/* Radar Chart */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Startup Evaluation Radar</h2>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1e2d42" />
              <PolarAngleAxis dataKey="dimension" tick={{ fill: '#7a90a8', fontSize: 12 }} />
              <Radar name="Score" dataKey="score" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>

          <div style={styles.scoresGrid}>
            {Object.entries(report.scores).map(([key, value]) => (
              <div key={key} style={styles.scoreItem}>
                <span style={styles.scoreLabel}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span style={{ ...styles.scoreValue, color: value >= 7 ? 'var(--success)' : value >= 5 ? 'var(--warning)' : 'var(--danger)' }}>
                  {value}/10
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Market Research */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Market Research</h2>
          <div style={styles.card}>
            <p style={styles.cardRow}><span style={styles.cardLabel}>Market Size:</span> {report.marketResearch.marketSize}</p>
            <p style={styles.cardRow}><span style={styles.cardLabel}>Growth Rate:</span> {report.marketResearch.growthRate}</p>
            <p style={styles.cardRow}><span style={styles.cardLabel}>Opportunities:</span> {report.marketResearch.opportunities}</p>
            <div style={styles.cardRow}>
              <span style={styles.cardLabel}>Key Trends:</span>
              <ul style={styles.list}>
                {report.marketResearch.keyTrends.map((trend, i) => (
                  <li key={i} style={styles.listItem}>{trend}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Competitors */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Competitor Analysis</h2>
          <div style={styles.grid}>
            {report.competitors.map((comp, i) => (
              <div key={i} style={styles.competitorCard}>
                <div style={styles.compHeader}>
                  <h3 style={styles.compName}>{comp.name}</h3>
                  <span style={{
                    ...styles.threatBadge,
                    backgroundColor: comp.threatLevel === 'High' ? 'var(--danger)' : comp.threatLevel === 'Medium' ? 'var(--warning)' : 'var(--success)'
                  }}>
                    {comp.threatLevel} Threat
                  </span>
                </div>
                <p style={styles.compDesc}>{comp.description}</p>
                <p style={styles.compStrength}>Strengths: {comp.strengths}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Risks */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Risk Analysis</h2>
          <div style={styles.grid}>
            {report.risks.map((risk, i) => (
              <div key={i} style={styles.riskCard}>
                <h3 style={styles.riskType}>{risk.type}</h3>
                <p style={styles.riskDesc}>{risk.description}</p>
                <p style={styles.riskMitigation}>💡 {risk.mitigation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Strategic Recommendations</h2>
          <div style={styles.card}>
            {report.recommendations.map((rec, i) => (
              <div key={i} style={styles.recItem}>
                <span style={styles.recNumber}>{i + 1}</span>
                <p style={styles.recText}>{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Next Steps</h2>
          <div style={styles.card}>
            {report.nextSteps.map((step, i) => (
              <div key={i} style={styles.recItem}>
                <span style={styles.recNumber}>{i + 1}</span>
                <p style={styles.recText}>{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mentorship Banner */}
        {report.mentorshipEligible ? (
          <div style={styles.mentorshipBanner}>
            <h2 style={styles.mentorshipTitle}>🎉 You qualify for free mentorship!</h2>
            <p style={styles.mentorshipText}>Your startup scored {report.overallScore.toFixed(1)}/10. You are eligible for a free one-on-one session with a startup mentor.</p>
            <button style={styles.mentorshipBtn}>Claim Your Mentorship</button>
          </div>
        ) : (
          <div style={styles.notEligible}>
            <h2 style={styles.notEligibleTitle}>Keep Refining Your Idea</h2>
            <p style={styles.mentorshipText}>Score 5.0 or above to unlock free mentorship. Use the recommendations above to strengthen your startup.</p>
          </div>
        )}

      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: 'var(--background)',
    fontFamily: 'var(--font)',
    color: 'var(--text)',
    padding: '60px 20px',
  },
  content: {
    maxWidth: '780px',
    margin: '0 auto',
  },
  loading: {
    minHeight: '100vh',
    backgroundColor: 'var(--background)',
    color: 'var(--text-muted)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    fontFamily: 'var(--font)',
  },
  scoreHero: {
    textAlign: 'center',
    padding: '60px 0 50px',
    borderBottom: '1px solid var(--border)',
    marginBottom: '50px',
  },
  heroTitle: {
    fontSize: '34px',
    fontWeight: '800',
    marginBottom: '36px',
    color: '#ffffff',
    letterSpacing: '-1px',
  },
  scoreBadge: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '44px',
    fontWeight: '800',
    margin: '0 auto 24px',
    color: '#000000',
  },
  verdict: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '18px',
  },
  summary: {
    fontSize: '16px',
    color: 'var(--text-muted)',
    lineHeight: '1.8',
    maxWidth: '580px',
    margin: '0 auto',
    fontWeight: '400',
  },
  downloadBtn: {
    marginTop: '28px',
    backgroundColor: 'var(--primary)',
    color: '#000000',
    border: 'none',
    padding: '14px 36px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'var(--font)',
  },
  section: {
    marginBottom: '52px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '20px',
    borderLeft: '3px solid var(--primary)',
    paddingLeft: '14px',
    letterSpacing: '-0.3px',
  },
  card: {
    backgroundColor: 'var(--surface)',
    borderRadius: '14px',
    padding: '28px',
    border: '1px solid var(--border)',
  },
  cardRow: {
    marginBottom: '14px',
    color: 'var(--text-muted)',
    lineHeight: '1.7',
    fontSize: '15px',
  },
  cardLabel: {
    color: 'var(--primary)',
    fontWeight: '600',
    marginRight: '8px',
  },
  list: {
    marginTop: '8px',
    paddingLeft: '20px',
  },
  listItem: {
    color: 'var(--text-muted)',
    marginBottom: '6px',
    fontSize: '15px',
  },
  scoresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    marginTop: '20px',
  },
  scoreItem: {
    backgroundColor: 'var(--surface)',
    padding: '14px 18px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid var(--border)',
  },
  scoreLabel: {
    color: 'var(--text-muted)',
    fontSize: '13px',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  scoreValue: {
    fontWeight: '700',
    fontSize: '14px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  competitorCard: {
    backgroundColor: 'var(--surface)',
    borderRadius: '14px',
    padding: '22px',
    border: '1px solid var(--border)',
  },
  compHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  compName: {
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '600',
  },
  threatBadge: {
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
    color: '#000000',
  },
  compDesc: {
    color: 'var(--text-muted)',
    fontSize: '13px',
    marginBottom: '8px',
    lineHeight: '1.6',
  },
  compStrength: {
    color: 'var(--text)',
    fontSize: '13px',
    lineHeight: '1.5',
  },
  riskCard: {
    backgroundColor: 'var(--surface)',
    borderRadius: '14px',
    padding: '22px',
    border: '1px solid var(--border)',
  },
  riskType: {
    color: 'var(--danger)',
    fontSize: '15px',
    fontWeight: '600',
    marginBottom: '8px',
  },
  riskDesc: {
    color: 'var(--text-muted)',
    fontSize: '13px',
    marginBottom: '10px',
    lineHeight: '1.6',
  },
  riskMitigation: {
    color: 'var(--success)',
    fontSize: '13px',
    lineHeight: '1.5',
  },
  recItem: {
    display: 'flex',
    gap: '14px',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  recNumber: {
    backgroundColor: 'var(--primary)',
    color: '#000000',
    width: '26px',
    height: '26px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: '700',
    flexShrink: 0,
  },
  recText: {
    color: 'var(--text-muted)',
    fontSize: '15px',
    lineHeight: '1.7',
    paddingTop: '2px',
  },
  mentorshipBanner: {
    backgroundColor: '#0a1f12',
    border: '1px solid var(--success)',
    borderRadius: '14px',
    padding: '44px',
    textAlign: 'center',
    marginBottom: '40px',
  },
  mentorshipTitle: {
    color: 'var(--success)',
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '14px',
    letterSpacing: '-0.5px',
  },
  mentorshipText: {
    color: 'var(--text-muted)',
    fontSize: '15px',
    marginBottom: '28px',
    lineHeight: '1.7',
  },
  mentorshipBtn: {
    backgroundColor: 'var(--success)',
    color: '#000000',
    border: 'none',
    padding: '14px 40px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'var(--font)',
  },
  notEligible: {
    backgroundColor: '#0c1220',
    border: '1px solid var(--primary)',
    borderRadius: '14px',
    padding: '44px',
    textAlign: 'center',
    marginBottom: '40px',
  },
  notEligibleTitle: {
    color: 'var(--primary)',
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '14px',
    letterSpacing: '-0.5px',
  },
}

export default Report