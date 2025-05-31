import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github as GitHub, Mail, BookOpen } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">EduBridge</span>
            </div>
            <p className="mt-4 text-gray-600 max-w-md">
              Connecting volunteer tutors with students from underprivileged backgrounds,
              providing free educational content and mentorship.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <GitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/resources" className="text-gray-600 hover:text-blue-600">
                  Library
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-gray-600 hover:text-blue-600">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link to="/webinars" className="text-gray-600 hover:text-blue-600">
                  Webinars
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-blue-600">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-gray-600 hover:text-blue-600">
                  Become a tutor
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-600 hover:text-blue-600">
                  Donate
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} EduBridge. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="text-gray-500 hover:text-blue-600 text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-blue-600 text-sm">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-500 hover:text-blue-600 text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;