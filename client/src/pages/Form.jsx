import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Form() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [pitchDeck, setPitchDeck] = useState(null)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    currentRole: '',
    location: '',
    whatBuilding: '',
    inspiration: '',
    problem: '',
    whoFaces: '',
    howSerious: '',
    ifNotSolved: '',
    whyNotSolved: '',
    howSolves: '',
    coreFeature: '',
    howWorks: '',
    whyPrefer: '',
    primaryCustomers: '',
    earlyAdopters: '',
    marketSize: '',
    geographicFocus: '',
    industrySize: '',
    marketGrowth: '',
    trends: '',
    whyNow: '',
    currentAlternatives: '',
    majorCompetitors: '',
    competitorStrengths: '',
    competitorGaps: '',
    roomForNew: '',
    strongestAdvantage: '',
    hardToCopy: '',
    howBuild: '',
    mvp: '',
    buildTime: '',
    technicalChallenges: '',
    firstUsers: '',
    channels: '',
    whyTrust: '',
    revenueModel: '',
    customerPrice: '',
    willingToPay: '',
    howScales: '',
    spokenWithCustomers: '',
    customerFeedback: '',
    traction: '',
    founders: '',
    skills: '',
    whyYou: '',
    industryBackground: '',
    teamCapability: '',
    biggestRisks: '',
    causeFailure: '',
    overcomeChallengess: '',
    fiveYears: '',
    howBig: '',
    newProducts: '',
    expandMarkets: '',
    resourcesRequired: '',
    raiseFunding: '',
    investorType: '',
    fundingAmount: '',
    whyExist: '',
    whyNowReflection: '',
    whyYouReflection: '',
    whatDifferent: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const sections = [
    {
      title: 'Founder Information',
      fields: [
        { name: 'fullName', label: 'Full Name *', placeholder: 'Your full name' },
        { name: 'email', label: 'Email Address *', placeholder: 'your@email.com' },
        { name: 'phone', label: 'Phone Number', placeholder: '+91 9999999999' },
        { name: 'linkedin', label: 'LinkedIn Profile', placeholder: 'https://linkedin.com/in/...' },
        { name: 'currentRole', label: 'Current Role', placeholder: 'Student, Engineer, etc.' },
        { name: 'location', label: 'City and Country', placeholder: 'Chennai, India' },
      ]
    },
    {
      title: 'The Idea',
      fields: [
        { name: 'whatBuilding', label: 'What exactly are you building? *', placeholder: 'Explain in simple terms...' },
        { name: 'inspiration', label: 'What inspired this idea?', placeholder: 'Personal experience, market observation...' },
      ]
    },
    {
      title: 'The Problem',
      fields: [
        { name: 'problem', label: 'What problem are you solving? *', placeholder: 'Describe the pain point clearly...' },
        { name: 'whoFaces', label: 'Who experiences this problem?', placeholder: 'Be specific about the customer group...' },
        { name: 'howSerious', label: 'How serious is this problem?', placeholder: 'Daily, occasionally, rarely?' },
        { name: 'ifNotSolved', label: 'What happens if not solved?', placeholder: 'Consequences of inaction...' },
        { name: 'whyNotSolved', label: 'Why has it not been solved yet?', placeholder: 'Existing gaps in solutions...' },
      ]
    },
    {
      title: 'The Solution',
      fields: [
        { name: 'howSolves', label: 'How does your solution solve it? *', placeholder: 'Better than existing solutions...' },
        { name: 'coreFeature', label: 'What is the core feature?', placeholder: 'The most valuable capability...' },
        { name: 'howWorks', label: 'How does the product work?', placeholder: 'From a user perspective...' },
        { name: 'whyPrefer', label: 'Why would customers prefer you?', placeholder: 'Over current alternatives...' },
      ]
    },
    {
      title: 'Target Customers',
      fields: [
        { name: 'primaryCustomers', label: 'Who are your primary customers? *', placeholder: 'Students, SMBs, restaurants...' },
        { name: 'earlyAdopters', label: 'Who will adopt first?', placeholder: 'Early users and why...' },
        { name: 'marketSize', label: 'How many potential customers?', placeholder: 'Estimated number...' },
        { name: 'geographicFocus', label: 'Geographic focus', placeholder: 'India, Southeast Asia, Global...' },
      ]
    },
    {
      title: 'Market Opportunity',
      fields: [
        { name: 'industrySize', label: 'How big is the market? *', placeholder: 'Describe the industry size...' },
        { name: 'marketGrowth', label: 'Is the market growing?', placeholder: 'Growing, stable, or declining?' },
        { name: 'trends', label: 'What trends support this?', placeholder: 'Technology, behavior, regulation shifts...' },
        { name: 'whyNow', label: 'Why is now the right time?', placeholder: 'Timing justification...' },
      ]
    },
    {
      title: 'Competitors',
      fields: [
        { name: 'currentAlternatives', label: 'How are customers solving it now?', placeholder: 'Current workarounds...' },
        { name: 'majorCompetitors', label: 'Who are the major competitors? *', placeholder: 'Companies in this space...' },
        { name: 'competitorStrengths', label: 'What do competitors do well?', placeholder: 'Their strengths...' },
        { name: 'competitorGaps', label: 'Where do they fail?', placeholder: 'Gaps you can fill...' },
        { name: 'roomForNew', label: 'Why is there room for you?', placeholder: 'Your entry opportunity...' },
      ]
    },
    {
      title: 'Unique Advantage',
      fields: [
        { name: 'strongestAdvantage', label: 'What is your strongest advantage? *', placeholder: 'Tech, network, distribution...' },
        { name: 'hardToCopy', label: 'Why is it hard to copy?', placeholder: 'Your defensibility...' },
      ]
    },
    {
      title: 'Product Development',
      fields: [
        { name: 'howBuild', label: 'How will you build it?', placeholder: 'Internal, outsourced, existing tools...' },
        { name: 'mvp', label: 'What is your MVP? *', placeholder: 'Simplest version that solves the problem...' },
        { name: 'buildTime', label: 'How long to build MVP?', placeholder: 'Estimated timeline...' },
        { name: 'technicalChallenges', label: 'Biggest technical challenges?', placeholder: 'Expected obstacles...' },
      ]
    },
    {
      title: 'Customer Acquisition',
      fields: [
        { name: 'firstUsers', label: 'How will you find first users? *', placeholder: 'Strategy for first 100 customers...' },
        { name: 'channels', label: 'What channels will you use?', placeholder: 'Social, content, partnerships...' },
        { name: 'whyTrust', label: 'Why will customers trust you?', placeholder: 'Trust building strategy...' },
      ]
    },
    {
      title: 'Business Model',
      fields: [
        { name: 'revenueModel', label: 'How will you make money? *', placeholder: 'Subscription, commission, ads...' },
        { name: 'customerPrice', label: 'How much will customers pay?', placeholder: 'Pricing...' },
        { name: 'willingToPay', label: 'Why would they pay this?', placeholder: 'Value justification...' },
        { name: 'howScales', label: 'How does this scale?', placeholder: 'Scaling the business model...' },
      ]
    },
    {
      title: 'Early Validation',
      fields: [
        { name: 'spokenWithCustomers', label: 'Have you spoken with customers?', placeholder: 'Yes/No and details...' },
        { name: 'customerFeedback', label: 'What feedback did they give?', placeholder: 'Customer responses...' },
        { name: 'traction', label: 'Any traction so far? *', placeholder: 'Waitlist, users, revenue...' },
      ]
    },
    {
      title: 'Team',
      fields: [
        { name: 'founders', label: 'Who are the founders? *', placeholder: 'Names and roles...' },
        { name: 'skills', label: 'What skills do they bring?', placeholder: 'Relevant expertise...' },
        { name: 'whyYou', label: 'Why are you solving this?', placeholder: 'Personal motivation...' },
        { name: 'industryBackground', label: 'Industry background?', placeholder: 'Relevant experience...' },
        { name: 'teamCapability', label: 'Why can your team execute?', placeholder: 'Execution capability...' },
      ]
    },
    {
      title: 'Risks',
      fields: [
        { name: 'biggestRisks', label: 'Biggest risks? *', placeholder: 'Tech, competition, adoption...' },
        { name: 'causeFailure', label: 'What would cause failure?', placeholder: 'Honest assessment...' },
        { name: 'overcomeChallengess', label: 'How will you overcome them?', placeholder: 'Mitigation strategies...' },
      ]
    },
    {
      title: 'Growth Vision',
      fields: [
        { name: 'fiveYears', label: 'What does the company look like in 5-10 years? *', placeholder: 'Long term vision...' },
        { name: 'howBig', label: 'How big could this become?', placeholder: 'Scale potential...' },
        { name: 'newProducts', label: 'Future products or services?', placeholder: 'Product evolution...' },
        { name: 'expandMarkets', label: 'Can this expand to new markets?', placeholder: 'Expansion potential...' },
      ]
    },
    {
      title: 'Funding',
      fields: [
        { name: 'resourcesRequired', label: 'What resources are needed? *', placeholder: 'Tech, team, marketing...' },
        { name: 'raiseFunding', label: 'Planning to raise funding?', placeholder: 'Yes/No and details...' },
        { name: 'investorType', label: 'What type of investors?', placeholder: 'Angel, seed, VC...' },
        { name: 'fundingAmount', label: 'How much funding needed?', placeholder: 'Amount and milestone...' },
      ]
    },
    {
      title: 'Founder Reflection & Pitch Deck',
      fields: [
        { name: 'whyExist', label: 'Why must this startup exist? *', placeholder: 'The deeper purpose...' },
        { name: 'whyNowReflection', label: 'Why now?', placeholder: 'Timing reflection...' },
        { name: 'whyYouReflection', label: 'Why you?', placeholder: 'Your unique position...' },
        { name: 'whatDifferent', label: 'What makes this different?', placeholder: 'Your edge over hundreds of others...' },
      ]
    },
  ]

  const mandatoryFields = {
    0: ['fullName', 'email'],
    1: ['whatBuilding'],
    2: ['problem'],
    3: ['howSolves'],
    4: ['primaryCustomers'],
    5: ['industrySize'],
    6: ['majorCompetitors'],
    7: ['strongestAdvantage'],
    8: ['mvp'],
    9: ['firstUsers'],
    10: ['revenueModel'],
    11: ['traction'],
    12: ['founders'],
    13: ['biggestRisks'],
    14: ['fiveYears'],
    15: ['resourcesRequired'],
    16: ['whyExist'],
  }

  const validateSection = () => {
    const required = mandatoryFields[currentSection] || []
    for (const field of required) {
      if (!formData[field] || formData[field].trim() === '') {
        const fieldDef = section.fields.find(f => f.name === field)
        alert(`Please fill in: ${fieldDef ? fieldDef.label.replace(' *', '') : field}`)
        return false
      }
    }
    if (currentSection === sections.length - 1) {
      if (!pitchDeck) {
        alert('Please upload your Pitch Deck to continue.')
        return false
      }
      if (pitchDeck.type !== 'application/pdf') {
        alert('Pitch Deck must be a PDF file.')
        return false
      }
    }
    return true
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('formData', JSON.stringify(formData))
      if (pitchDeck) {
        formDataToSend.append('pitchDeck', pitchDeck)
      }
      const res = await axios.post('https://sprezox-production.up.railway.app/api/submit', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      navigate(`/processing/${res.data.submissionId}`)
    } catch (err) {
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const section = sections[currentSection]

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <div style={styles.progress}>
          Step {currentSection + 1} of {sections.length}
        </div>
        <h2 style={styles.sectionTitle}>{section.title}</h2>

        {section.fields.map((field) => (
          <div key={field.name} style={styles.fieldGroup}>
            <label style={styles.label}>{field.label}</label>
            <textarea
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              style={styles.textarea}
              rows={3}
            />
          </div>
        ))}

        {currentSection === sections.length - 1 && (
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Upload Pitch Deck * (PDF only)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPitchDeck(e.target.files[0])}
              style={styles.fileInput}
            />
            {pitchDeck && (
              <p style={{ color: 'var(--success)', fontSize: '13px', marginTop: '8px' }}>
                ✓ {pitchDeck.name} selected
              </p>
            )}
          </div>
        )}

        <div style={styles.buttons}>
          {currentSection > 0 && (
            <button style={styles.backBtn} onClick={() => setCurrentSection(currentSection - 1)}>
              Back
            </button>
          )}
          {currentSection < sections.length - 1 ? (
            <button style={styles.nextBtn} onClick={() => {
              if (validateSection()) setCurrentSection(currentSection + 1)
            }}>
              Next
            </button>
          ) : (
            <button style={styles.submitBtn} onClick={() => {
              if (validateSection()) handleSubmit()
            }} disabled={loading}>
              {loading ? 'Submitting...' : 'Validate My Idea'}
            </button>
          )}
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
    alignItems: 'flex-start',
    padding: '60px 20px',
    fontFamily: 'var(--font)',
  },
  formBox: {
    backgroundColor: 'var(--surface)',
    borderRadius: '16px',
    padding: '48px',
    width: '100%',
    maxWidth: '680px',
    border: '1px solid var(--border)',
  },
  progress: {
    color: 'var(--primary)',
    fontSize: '13px',
    marginBottom: '8px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: '26px',
    fontWeight: '700',
    marginBottom: '32px',
    letterSpacing: '-0.5px',
  },
  fieldGroup: {
    marginBottom: '22px',
  },
  label: {
    display: 'block',
    color: 'var(--text-muted)',
    fontSize: '13px',
    fontWeight: '500',
    marginBottom: '8px',
    letterSpacing: '0.2px',
  },
  textarea: {
    width: '100%',
    backgroundColor: 'var(--background)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    color: 'var(--text)',
    padding: '12px 16px',
    fontSize: '15px',
    resize: 'vertical',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'var(--font)',
    lineHeight: '1.6',
    transition: 'border-color 0.2s ease',
  },
  fileInput: {
    width: '100%',
    backgroundColor: 'var(--background)',
    border: '1px dashed var(--border)',
    borderRadius: '10px',
    color: 'var(--text-muted)',
    padding: '16px',
    fontSize: '14px',
    cursor: 'pointer',
    fontFamily: 'var(--font)',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '36px',
  },
  backBtn: {
    backgroundColor: 'var(--surface-2)',
    color: 'var(--text-muted)',
    border: '1px solid var(--border)',
    padding: '12px 28px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '500',
    fontFamily: 'var(--font)',
  },
  nextBtn: {
    backgroundColor: 'var(--primary)',
    color: '#000000',
    border: 'none',
    padding: '12px 32px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '700',
    marginLeft: 'auto',
    fontFamily: 'var(--font)',
  },
  submitBtn: {
    backgroundColor: 'var(--success)',
    color: '#000000',
    border: 'none',
    padding: '12px 32px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '700',
    marginLeft: 'auto',
    fontFamily: 'var(--font)',
  },
}

export default Form