const Groq = require('groq-sdk')

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

async function generateReport(formData, pitchDeckText = '') {
  console.log('AI call started...')

  const prompt = `
You are a startup validation expert. Analyze the following startup idea and generate a detailed validation report.

STARTUP INFORMATION:
Founder: ${formData.fullName}
Location: ${formData.location}
Current Role: ${formData.currentRole}

THE IDEA: ${formData.whatBuilding}
Inspiration: ${formData.inspiration}

THE PROBLEM: ${formData.problem}
Who faces it: ${formData.whoFaces}
How serious: ${formData.howSerious}
If not solved: ${formData.ifNotSolved}
Why not solved: ${formData.whyNotSolved}

THE SOLUTION: ${formData.howSolves}
Core feature: ${formData.coreFeature}
How it works: ${formData.howWorks}
Why prefer: ${formData.whyPrefer}

TARGET CUSTOMERS: ${formData.primaryCustomers}
Early adopters: ${formData.earlyAdopters}
Market size: ${formData.marketSize}
Geography: ${formData.geographicFocus}

MARKET OPPORTUNITY: ${formData.industrySize}
Growth: ${formData.marketGrowth}
Trends: ${formData.trends}
Why now: ${formData.whyNow}

COMPETITORS: ${formData.majorCompetitors}
Their strengths: ${formData.competitorStrengths}
Their gaps: ${formData.competitorGaps}
Room for new: ${formData.roomForNew}

UNIQUE ADVANTAGE: ${formData.strongestAdvantage}
Hard to copy: ${formData.hardToCopy}

BUSINESS MODEL: ${formData.revenueModel}
Pricing: ${formData.customerPrice}
Why pay: ${formData.willingToPay}

TRACTION: ${formData.traction}
Customer feedback: ${formData.customerFeedback}

TEAM: ${formData.founders}
Skills: ${formData.skills}
Why you: ${formData.whyYou}

RISKS: ${formData.biggestRisks}
Cause of failure: ${formData.causeFailure}

GROWTH VISION: ${formData.fiveYears}
How big: ${formData.howBig}

FUNDING: ${formData.resourcesRequired}
Amount needed: ${formData.fundingAmount}

FOUNDER REFLECTION:
Why exist: ${formData.whyExist}
Why now: ${formData.whyNowReflection}
Why you: ${formData.whyYouReflection}
What different: ${formData.whatDifferent}

${pitchDeckText ? `
PITCH DECK CONTENT:
${pitchDeckText.substring(0, 3000)}
` : ''}

Generate a startup validation report in the following JSON format only. No extra text, just pure JSON:

{
  "overallScore": <number 0-10>,
  "verdict": "<Strong opportunity / Promising but needs work / Shows potential / Needs major refinement>",
  "executiveSummary": "<3-4 sentence summary of the startup>",
  "scores": {
    "problemClarity": <0-10>,
    "solutionUniqueness": <0-10>,
    "marketSize": <0-10>,
    "businessModel": <0-10>,
    "competitiveLandscape": <0-10>,
    "teamFit": <0-10>,
    "executionFeasibility": <0-10>,
    "tractionValidation": <0-10>
  },
  "marketResearch": {
    "marketSize": "<estimated market size>",
    "growthRate": "<growth rate>",
    "keyTrends": ["<trend1>", "<trend2>", "<trend3>"],
    "opportunities": "<key opportunities in the market>"
  },
  "competitors": [
    {
      "name": "<competitor name>",
      "description": "<what they do>",
      "strengths": "<their strengths>",
      "threatLevel": "<High/Medium/Low>"
    }
  ],
  "risks": [
    {
      "type": "<risk type>",
      "description": "<risk description>",
      "mitigation": "<how to mitigate>"
    }
  ],
  "recommendations": ["<recommendation1>", "<recommendation2>", "<recommendation3>", "<recommendation4>"],
  "nextSteps": ["<step1>", "<step2>", "<step3>"],
  "mentorshipEligible": <true if overallScore >= 5.0, false otherwise>
}
`

  const message = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: prompt,
      }
    ],
  })

  console.log('AI call finished!')
  const text = message.choices[0].message.content
  const clean = text.replace(/```json|```/g, '').trim()
  const report = JSON.parse(clean)
  return report
}

module.exports = { generateReport }