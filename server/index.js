const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { router } = require('./routes')

const app = express()

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.options('*', cors())
app.use(express.json())

app.use('/api', router)

app.get('/', (req, res) => {
  res.json({ message: 'Sprezox API running' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})