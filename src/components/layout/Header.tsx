import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Button from '../common/Button';
import { Menu, X, LogOut, User, BookOpen, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">EduBridge</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link to="/resources" className="text-gray-700 hover:text-blue-600 font-medium">
              Resources
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
              About
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <div className="flex items-center cursor-pointer">
                  <span className="text-gray-700 font-medium">{user?.name}</span>
                  <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
                </div>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Sign in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign up</Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link
              to="/"
              className="block py-2 text-base font-medium text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/resources"
              className="block py-2 text-base font-medium text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              to="/about"
              className="block py-2 text-base font-medium text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="space-y-1 px-4">
                <div className="flex items-center mb-3">
                  <div className="flex-shrink-0">
                    {user?.avatar ? (
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.avatar}
                        alt={user.name}
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user?.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user?.email}
                    </div>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  className="block py-2 text-base font-medium text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block py-2 text-base font-medium text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full py-2 text-base font-medium text-gray-700"
                >
                  <LogOut className="mr-2 h-5 w-5 text-gray-500" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="px-4 py-2 flex flex-col space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="outline" fullWidth>
                    Sign in
                  </Button>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button fullWidth>Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;