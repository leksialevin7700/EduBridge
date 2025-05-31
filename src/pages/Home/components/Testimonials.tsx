import React from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from '../../../types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    text: "EduBridge has transformed my educational journey. The tutors are incredible and I've been able to improve my grades significantly.",
    author: {
      name: 'Maria J.',
      role: 'student',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    rating: 5,
  },
  {
    id: '2',
    text: "Being a tutor on EduBridge has been incredibly rewarding. I'm able to help students who really need it and see their progress firsthand.",
    author: {
      name: 'David L.',
      role: 'tutor',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    rating: 5,
  },
  {
    id: '3',
    text: "The resources available on EduBridge helped me understand complex concepts that I was struggling with in school.",
    author: {
      name: 'James K.',
      role: 'student',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    rating: 4,
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from students and tutors who have experienced the power of EduBridge.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>
              <p className="text-gray-700 flex-grow">"{testimonial.text}"</p>
              <div className="mt-6 flex items-center">
                {testimonial.author.avatar ? (
                  <img
                    src={testimonial.author.avatar}
                    alt={testimonial.author.name}
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {testimonial.author.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{testimonial.author.name}</p>
                  <p className="text-sm text-gray-500 capitalize">{testimonial.author.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;