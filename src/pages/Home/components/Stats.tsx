import React from 'react';
import { Users, BookOpen, Clock, Award } from 'lucide-react';

const stats = [
  {
    id: 1,
    name: 'Students Helped',
    value: '1,000+',
    icon: Users,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 2,
    name: 'Learning Resources',
    value: '500+',
    icon: BookOpen,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 3,
    name: 'Tutoring Hours',
    value: '5,000+',
    icon: Clock,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    id: 4,
    name: 'Volunteer Tutors',
    value: '200+',
    icon: Award,
    color: 'bg-green-100 text-green-600',
  },
];

const Stats: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Impact</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Making a difference in education access and student outcomes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center"
            >
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-4xl font-bold text-gray-900">{stat.value}</h3>
              <p className="mt-2 text-gray-600">{stat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;