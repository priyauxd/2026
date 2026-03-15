import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CaseStudyRaqam from './pages/CaseStudyRaqam'
import CaseStudyPetProtect from './pages/CaseStudyPetProtect'
import CaseStudyDesignSystem from './pages/CaseStudyDesignSystem'
import CaseStudyAICallCenter from './pages/CaseStudyAICallCenter'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-study/raqam" element={<CaseStudyRaqam />} />
        <Route path="/case-study/pet-protect" element={<CaseStudyPetProtect />} />
        <Route path="/case-study/design-system" element={<CaseStudyDesignSystem />} />
        <Route path="/case-study/ai-call-center" element={<CaseStudyAICallCenter />} />
      </Routes>
    </BrowserRouter>
  )
}
