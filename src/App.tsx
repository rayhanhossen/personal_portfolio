import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contacts from './pages/Contacts';
import Layout from './components/Layout';
import ExperiencePage from './pages/Experience';
import About from './pages/About';
// import EducationPage from './pages/Education';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="experience" element={<ExperiencePage />} />
          {/* <Route path="education" element={<EducationPage />} /> */}
          <Route path="about" element={<About />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;