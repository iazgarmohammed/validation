const fs = require('fs')
const path = require('path')
const pdfParse = require('pdf-parse')

async function extractTextFromFile(filePath, mimetype) {
  try {
    if (mimetype === 'application/pdf') {
      const buffer = fs.readFileSync(filePath)
      const data = await pdfParse(buffer)
      return data.text
    } else {
      // For non-PDF files just return a note
      return 'Pitch deck uploaded but text extraction not available for this file type.'
    }
  } catch (err) {
    console.error('Text extraction error:', err)
    return 'Could not extract text from pitch deck.'
  }
}

module.exports = { extractTextFromFile }