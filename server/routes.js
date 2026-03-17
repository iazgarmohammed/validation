const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const { generateReport } = require('./ai')
const { supabase } = require('./db')
const { upload } = require('./upload')
const { extractTextFromFile } = require('./extractText')
const { generatePDF } = require('./pdf')

const submissions = {}

router.post('/submit', upload.single('pitchDeck'), async (req, res) => {
  const formData = JSON.parse(req.body.formData)
  const submissionId = uuidv4()

  let pitchDeckText = ''
  if (req.file) {
    pitchDeckText = await extractTextFromFile(req.file.path, req.file.mimetype)
  }

  submissions[submissionId] = {
    status: 'pending',
    formData,
    pitchDeckText,
    report: null,
  }

  await supabase.from('submissions').insert({
    submission_id: submissionId,
    full_name: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    status: 'pending',
    form_data: formData,
  })

  res.json({ submissionId })
  processReport(submissionId, formData, pitchDeckText)
})

router.get('/status/:submissionId', (req, res) => {
  const { submissionId } = req.params
  const submission = submissions[submissionId]

  if (!submission) {
    return res.status(404).json({ error: 'Submission not found' })
  }

  res.json({ status: submission.status })
})

router.get('/report/:submissionId', (req, res) => {
  const { submissionId } = req.params
  const submission = submissions[submissionId]

  if (!submission) {
    return res.status(404).json({ error: 'Submission not found' })
  }

  res.json({ report: submission.report })
})

router.get('/report/:submissionId/pdf', async (req, res) => {
  const { submissionId } = req.params
  const submission = submissions[submissionId]

  if (!submission || !submission.report) {
    return res.status(404).json({ error: 'Report not found' })
  }

  try {
    const pdf = await generatePDF(submission.report, submission.formData)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="sprezox-report-${submissionId}.pdf"`)
    res.send(pdf)
  } catch (err) {
    console.error('PDF error:', err)
    res.status(500).json({ error: 'PDF generation failed' })
  }
})

async function processReport(submissionId, formData, pitchDeckText = '') {
  try {
    const report = await generateReport(formData, pitchDeckText)
    submissions[submissionId].status = 'done'
    submissions[submissionId].report = report

    await supabase.from('submissions').update({
      status: 'done',
      report: report,
      overall_score: report.overallScore,
      mentorship_eligible: report.mentorshipEligible,
    }).eq('submission_id', submissionId)

  } catch (err) {
    submissions[submissionId].status = 'error'
    await supabase.from('submissions').update({
      status: 'error'
    }).eq('submission_id', submissionId)
    console.error('Processing error:', err)
  }
}

module.exports = { router, submissions }