import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Register';
import DashboardPage from './pages/Dashboard';
import ResourcesPage from './pages/Resources';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
    </Routes>
  );
}

export default App;