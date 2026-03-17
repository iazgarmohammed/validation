import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Form from './pages/Form'
import Processing from './pages/Processing'
import Report from './pages/Report'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/processing/:submissionId" element={<Processing />} />
        <Route path="/report/:submissionId" element={<Report />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App