import React from 'react';
import Layout from '../../components/layout/Layout';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import Stats from './components/Stats';
import Button from '../../components/common/Button';
import { CalendarClock } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Stats />
      <Testimonials />
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Start Learning?</h2>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
            Join EduBridge today and connect with tutors who can help you achieve your educational goals.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              variant="accent"
              size="lg"
              rightIcon={<CalendarClock className="h-5 w-5" />}
            >
              Join Now
            </Button>
          </div>
        </div>
      </section>
      
      {/* Upcoming Webinars Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Live Sessions</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Join our free live webinars hosted by expert tutors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="text-blue-600 font-semibold mb-2">Math</div>
              <h3 className="text-xl font-bold text-gray-900">Mastering Algebra: Key Concepts</h3>
              <p className="mt-2 text-gray-600">Learn essential algebra concepts and problem-solving techniques.</p>
              <div className="mt-4 flex items-center text-gray-500">
                <CalendarClock className="h-5 w-5 mr-2" />
                <span>Tomorrow, 4:00 PM</span>
              </div>
              <Button className="mt-4" variant="outline" fullWidth>
                Register
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="text-purple-600 font-semibold mb-2">Science</div>
              <h3 className="text-xl font-bold text-gray-900">Chemistry Fundamentals</h3>
              <p className="mt-2 text-gray-600">Explore the basics of chemistry with interactive demonstrations.</p>
              <div className="mt-4 flex items-center text-gray-500">
                <CalendarClock className="h-5 w-5 mr-2" />
                <span>Friday, 5:30 PM</span>
              </div>
              <Button className="mt-4" variant="outline" fullWidth>
                Register
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="text-orange-600 font-semibold mb-2">English</div>
              <h3 className="text-xl font-bold text-gray-900">Essay Writing Workshop</h3>
              <p className="mt-2 text-gray-600">Improve your essay writing skills with professional guidance.</p>
              <div className="mt-4 flex items-center text-gray-500">
                <CalendarClock className="h-5 w-5 mr-2" />
                <span>Saturday, 2:00 PM</span>
              </div>
              <Button className="mt-4" variant="outline" fullWidth>
                Register
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;