import React, { useEffect, useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Book, Calendar, Clock, Users, MessageSquare } from 'lucide-react';
import { useResourceStore } from '../../store/resourceStore';
import { useSessionStore } from '../../store/sessionStore';
import { useAuthStore } from '../../store/authStore';
import { Session } from '../../types';

const StudentDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { resources, fetchResources } = useResourceStore();
  const { sessions, fetchSessions, createMentorshipRequest } = useSessionStore();
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [requestSubject, setRequestSubject] = useState('');
  const [requestMessage, setRequestMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchResources();
    if (user) {
      fetchSessions(user.id);
    }
  }, [fetchResources, fetchSessions, user]);

  const handleMentorshipRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      await createMentorshipRequest({
        studentId: user.id,
        studentName: user.name,
        subject: requestSubject,
        message: requestMessage,
      });
      
      setSubmitSuccess(true);
      setTimeout(() => {
        setIsRequestDialogOpen(false);
        setRequestSubject('');
        setRequestMessage('');
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to create request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const upcomingSessions = sessions.filter(
    (session) => session.status === 'pending' || session.status === 'accepted'
  );

  const recentResources = resources.slice(0, 3);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-2">Here's an overview of your learning journey.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="flex items-center p-6 bg-blue-50 border-blue-100">
          <div className="p-3 bg-blue-100 rounded-full mr-4">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{upcomingSessions.length}</h3>
            <p className="text-gray-600">Upcoming Sessions</p>
          </div>
        </Card>
        
        <Card className="flex items-center p-6 bg-purple-50 border-purple-100">
          <div className="p-3 bg-purple-100 rounded-full mr-4">
            <Book className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{resources.length}</h3>
            <p className="text-gray-600">Available Resources</p>
          </div>
        </Card>
        
        <Card className="flex items-center p-6 bg-orange-50 border-orange-100">
          <div className="p-3 bg-orange-100 rounded-full mr-4">
            <Clock className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">5</h3>
            <p className="text-gray-600">Hours of Learning</p>
          </div>
        </Card>
        
        <Card className="flex items-center p-6 bg-green-50 border-green-100">
          <div className="p-3 bg-green-100 rounded-full mr-4">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">3</h3>
            <p className="text-gray-600">Completed Courses</p>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Sessions</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRequestDialogOpen(true)}
                leftIcon={<MessageSquare className="h-4 w-4" />}
              >
                Request Mentorship
              </Button>
            </div>
            
            {upcomingSessions.length === 0 ? (
              <Card className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No upcoming sessions</h3>
                <p className="text-gray-600 mb-4">
                  Request mentorship to schedule your first session with a tutor.
                </p>
                <Button 
                  onClick={() => setIsRequestDialogOpen(true)}
                  leftIcon={<MessageSquare className="h-5 w-5" />}
                >
                  Request Mentorship
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {upcomingSessions.map((session: Session) => (
                  <Card key={session.id} className="p-0 overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-2/3 p-6">
                        <div className="flex items-center mb-2">
                          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {session.subject}
                          </span>
                          <span className="ml-2 text-sm text-gray-500">
                            {session.date}, {session.startTime} - {session.endTime}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{session.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{session.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-1" />
                          <span>Tutor: {session.tutorName}</span>
                        </div>
                      </div>
                      <div className="sm:w-1/3 bg-gray-50 p-6 flex flex-col justify-center items-center border-t sm:border-t-0 sm:border-l border-gray-200">
                        <Button
                          size="sm"
                          fullWidth
                          className="mb-2"
                        >
                          Join Session
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          fullWidth
                        >
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Resources</h2>
          <div className="space-y-4">
            {recentResources.map((resource) => (
              <Card key={resource.id} className="hover:border-blue-300">
                <div className="flex items-start">
                  <div className={`p-2 rounded-md mr-3 flex-shrink-0 ${
                    resource.type === 'document' ? 'bg-blue-100' :
                    resource.type === 'video' ? 'bg-red-100' :
                    'bg-green-100'
                  }`}>
                    <Book className={`h-5 w-5 ${
                      resource.type === 'document' ? 'text-blue-600' :
                      resource.type === 'video' ? 'text-red-600' :
                      'text-green-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">{resource.subject}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="capitalize">{resource.type}</span>
                      <span className="mx-1">•</span>
                      <span>By {resource.uploadedBy.name}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            <Button variant="outline" fullWidth>
              View All Resources
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mentorship Request Dialog */}
      {isRequestDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-slide-up">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Request Mentorship</h2>
                <button
                  onClick={() => setIsRequestDialogOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-gray-900">Request Submitted</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Your mentorship request has been sent successfully. A tutor will respond to your request soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleMentorshipRequest}>
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      value={requestSubject}
                      onChange={(e) => setRequestSubject(e.target.value)}
                      className="input w-full"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="Math">Math</option>
                      <option value="Science">Science</option>
                      <option value="English">English</option>
                      <option value="History">History</option>
                      <option value="Computer Science">Computer Science</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={requestMessage}
                      onChange={(e) => setRequestMessage(e.target.value)}
                      rows={4}
                      className="input w-full"
                      placeholder="Describe what you need help with..."
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      className="mr-3"
                      onClick={() => setIsRequestDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" isLoading={isSubmitting}>
                      Submit Request
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const X = Clock; // Reusing Clock icon as X for this example
const Check = Calendar; // Reusing Calendar icon as Check for this example

export default StudentDashboard;