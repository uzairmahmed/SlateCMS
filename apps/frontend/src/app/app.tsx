import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CoursesGrid from './pages/CoursesGrid';
import CourseShell from './pages/CourseShell';

export function App() {
  return (
    <Router>
      <div className="flex h-screen w-screen bg-gray-50 overflow-y-hidden">
        <div className="w-80 border border-solid border-slate-200"></div>
        <Sidebar />
        <Routes>
          <Route path="/" element={<CoursesGrid />} />
          <Route path="/:courseCode" element={<CourseShell />} />
        </Routes>
        <div className="w-80 border border-solid border-slate-200"></div>
      </div>
    </Router>

  );
}

export default App;
