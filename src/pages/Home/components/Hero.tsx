import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/common/Button';
import { BookOpen, Users, Video, Award } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Education Without Barriers
            </h1>
            <p className="mt-4 md:mt-6 text-xl text-gray-700 max-w-lg">
              EduBridge connects volunteer tutors with students from underprivileged backgrounds, providing free educational resources and personalized mentorship.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register">
                <Button size="lg">
                  Get Started
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <img 
              src="https://images.pexels.com/photos/3769981/pexels-photo-3769981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Students learning together" 
              className="w-full h-auto rounded-lg shadow-lg animate-fade-in"
            />
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Free Resources</h3>
            <p className="mt-2 text-gray-600">Access educational materials created by qualified tutors.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">1-on-1 Mentorship</h3>
            <p className="mt-2 text-gray-600">Connect with volunteer tutors for personalized learning support.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <Video className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Video Tutorials</h3>
            <p className="mt-2 text-gray-600">Watch educational videos on a variety of subjects.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="p-3 bg-green-100 rounded-full">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Track Progress</h3>
            <p className="mt-2 text-gray-600">Monitor learning achievements and milestones.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;