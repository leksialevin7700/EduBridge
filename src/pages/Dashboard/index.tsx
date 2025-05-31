import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import StudentDashboard from './StudentDashboard';
import TutorDashboard from './TutorDashboard';
import AdminDashboard from './AdminDashboard';
import { useAuthStore } from '../../store/authStore';

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case 'student':
        return <StudentDashboard />;
      case 'tutor':
        return <TutorDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Navigate to="/" />;
    }
  };

  return (
    <Layout>
      {renderDashboard()}
    </Layout>
  );
};

export default DashboardPage;