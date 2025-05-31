import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuthStore } from '../../store/authStore';
import { UserPlus } from 'lucide-react';
import { UserRole } from '../../types';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState('');
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      await register(name, email, password, role);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8 animate-fade-in">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
              <p className="text-gray-600 mt-2">Join EduBridge and start learning today</p>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <Input
                label="Full Name"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
              
              <Input
                label="Email"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
              
              <Input
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              
              <Input
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  I am a:
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={role === 'student'}
                      onChange={() => setRole('student')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Student</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="tutor"
                      checked={role === 'tutor'}
                      onChange={() => setRole('tutor')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">Tutor</span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                leftIcon={<UserPlus className="h-5 w-5" />}
              >
                Sign up
              </Button>
              
              <div className="text-center mt-4">
                <span className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                    Sign in
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;