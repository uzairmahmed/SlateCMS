import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from './components/Sidebar';
import CoursesGrid from './pages/CoursesGrid';
import CourseShell from './pages/CourseShell';
import DiscussionThreadPage from './pages/DiscussionThreadPage';
import LoginPage from './pages/LoginPage';


import SignupPage from './pages/SignUpPage';
import AIChatBotPage from './pages/AIChatBotPage';
import KnowledgeBasePage from './pages/KnowledgeBasePage';

export function App() {
    return (
        <Router>
            <div className="flex flex-col md:flex-row h-screen w-screen bg-gray-50 overflow-y-hidden">
                <div className="hidden lg:flex w-80 border border-solid border-slate-200"></div>
                <ToastContainer
                    hideProgressBar
                />
                <Sidebar />
                <Routes>
                    <Route path="*" element={<CoursesGrid />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/courses" element={<CoursesGrid />} />
                    <Route path="/:courseCode" element={<CourseShell />} />
                    <Route path="/discussion/:discussionID" element={<DiscussionThreadPage />} />
                    <Route path="/ai" element={<AIChatBotPage />} />
                    <Route path="/kb" element={<KnowledgeBasePage />} />
                </Routes>
                <div className="hidden md:flex md:w-40 lg:w-80 border border-solid border-slate-200"></div>
            </div>
        </Router>

    );
}

export default App;
