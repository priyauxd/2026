import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CaseStudyRaqam from './pages/CaseStudyRaqam'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-study/raqam" element={<CaseStudyRaqam />} />
      </Routes>
    </BrowserRouter>
  )
}
