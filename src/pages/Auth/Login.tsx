import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuthStore } from '../../store/authStore';
import { LogIn } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8 animate-fade-in">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
              <p className="text-gray-600 mt-2">Sign in to your EduBridge account</p>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
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
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link to="/forgot-password" className="text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                leftIcon={<LogIn className="h-5 w-5" />}
              >
                Sign in
              </Button>
              
              <div className="text-center mt-4">
                <span className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-blue-600 hover:text-blue-500 font-medium">
                    Sign up
                  </Link>
                </span>
              </div>
            </form>
            
            {/* Demo accounts for easy testing */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Demo Accounts:</h3>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmail('student@example.com');
                    setPassword('password');
                  }}
                >
                  Student Demo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmail('tutor@example.com');
                    setPassword('password');
                  }}
                >
                  Tutor Demo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmail('admin@example.com');
                    setPassword('password');
                  }}
                >
                  Admin Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;