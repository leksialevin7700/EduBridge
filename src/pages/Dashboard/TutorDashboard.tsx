import React, { useEffect, useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Book, Calendar, MessageSquare, Users, Upload, Clock, Check } from 'lucide-react';
import { useResourceStore } from '../../store/resourceStore';
import { useSessionStore } from '../../store/sessionStore';
import { useAuthStore } from '../../store/authStore';
import { MentorshipRequest, Session } from '../../types';

const TutorDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { resources, fetchResources, addResource } = useResourceStore();
  const { 
    sessions, 
    mentorshipRequests, 
    fetchSessions, 
    fetchMentorshipRequests,
    acceptMentorshipRequest,
    declineMentorshipRequest
  } = useSessionStore();
  
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MentorshipRequest | null>(null);
  const [sessionDetails, setSessionDetails] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: ''
  });
  
  const [resourceDetails, setResourceDetails] = useState({
    title: '',
    description: '',
    type: 'document',
    url: '',
    subject: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchResources();
    if (user) {
      fetchSessions(user.id);
      fetchMentorshipRequests(user.id);
    }
  }, [fetchResources, fetchSessions, fetchMentorshipRequests, user]);

  const handleResourceUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      await addResource({
        ...resourceDetails,
        uploadedBy: {
          id: user.id,
          name: user.name,
          role: user.role
        }
      });
      
      setSubmitSuccess(true);
      setTimeout(() => {
        setIsUploadDialogOpen(false);
        setResourceDetails({
          title: '',
          description: '',
          type: 'document',
          url: '',
          subject: ''
        });
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to upload resource:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAcceptRequest = async (request: MentorshipRequest) => {
    setSelectedRequest(request);
    setSessionDetails({
      title: `${request.subject} Tutoring Session`,
      description: request.message,
      date: new Date().toISOString().split('T')[0],
      startTime: '15:00',
      endTime: '16:00'
    });
    setIsScheduleDialogOpen(true);
  };

  const handleScheduleSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;
    
    setIsSubmitting(true);
    
    try {
      await acceptMentorshipRequest(selectedRequest.id, sessionDetails);
      
      setSubmitSuccess(true);
      setTimeout(() => {
        setIsScheduleDialogOpen(false);
        setSelectedRequest(null);
        setSessionDetails({
          title: '',
          description: '',
          date: '',
          startTime: '',
          endTime: ''
        });
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to schedule session:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeclineRequest = async (requestId: string) => {
    try {
      await declineMentorshipRequest(requestId);
    } catch (error) {
      console.error('Failed to decline request:', error);
    }
  };

  const pendingRequests = mentorshipRequests.filter(req => req.status === 'pending');
  const upcomingSessions = sessions.filter(
    (session) => session.status === 'pending' || session.status === 'accepted'
  );
  const myResources = resources.filter(res => res.uploadedBy.id === user?.id);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-2">Here's an overview of your tutoring activities.</p>
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
            <MessageSquare className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{pendingRequests.length}</h3>
            <p className="text-gray-600">Mentorship Requests</p>
          </div>
        </Card>
        
        <Card className="flex items-center p-6 bg-orange-50 border-orange-100">
          <div className="p-3 bg-orange-100 rounded-full mr-4">
            <Book className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{myResources.length}</h3>
            <p className="text-gray-600">Resources Shared</p>
          </div>
        </Card>
        
        <Card className="flex items-center p-6 bg-green-50 border-green-100">
          <div className="p-3 bg-green-100 rounded-full mr-4">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">12</h3>
            <p className="text-gray-600">Students Helped</p>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Mentorship Requests</h2>
            </div>
            
            {pendingRequests.length === 0 ? (
              <Card className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No pending requests</h3>
                <p className="text-gray-600">
                  You'll see mentorship requests from students here when they come in.
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <Card key={request.id} className="p-0 overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-2/3 p-6">
                        <div className="flex items-center mb-2">
                          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {request.subject}
                          </span>
                          <span className="ml-2 text-sm text-gray-500">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Help Request</h3>
                        <p className="text-gray-600 text-sm mb-3">{request.message}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-1" />
                          <span>Student: {request.studentName}</span>
                        </div>
                      </div>
                      <div className="sm:w-1/3 bg-gray-50 p-6 flex flex-col justify-center items-center border-t sm:border-t-0 sm:border-l border-gray-200">
                        <Button
                          size="sm"
                          fullWidth
                          className="mb-2"
                          onClick={() => handleAcceptRequest(request)}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          fullWidth
                          onClick={() => handleDeclineRequest(request.id)}
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Sessions</h2>
            </div>
            
            {upcomingSessions.length === 0 ? (
              <Card className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No upcoming sessions</h3>
                <p className="text-gray-600">
                  Schedule sessions with students by accepting their mentorship requests.
                </p>
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
                          <span>Student: {session.studentName}</span>
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">My Resources</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsUploadDialogOpen(true)}
              leftIcon={<Upload className="h-4 w-4" />}
            >
              Upload
            </Button>
          </div>
          
          {myResources.length === 0 ? (
            <Card className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources yet</h3>
              <p className="text-gray-600 mb-4">
                Share your knowledge by uploading educational resources.
              </p>
              <Button 
                onClick={() => setIsUploadDialogOpen(true)}
                leftIcon={<Upload className="h-5 w-5" />}
              >
                Upload Resource
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {myResources.map((resource) => (
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
                        <span>{new Date(resource.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              
              <Button variant="outline" fullWidth onClick={() => setIsUploadDialogOpen(true)}>
                Upload More
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Upload Resource Dialog */}
      {isUploadDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-slide-up">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Upload Resource</h2>
                <button
                  onClick={() => setIsUploadDialogOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Clock className="h-5 w-5" />
                </button>
              </div>
              
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-gray-900">Resource Uploaded</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Your resource has been successfully uploaded and is now available for students.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleResourceUpload}>
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={resourceDetails.title}
                      onChange={(e) => setResourceDetails({...resourceDetails, title: e.target.value})}
                      className="input w-full"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      value={resourceDetails.subject}
                      onChange={(e) => setResourceDetails({...resourceDetails, subject: e.target.value})}
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
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                      Resource Type
                    </label>
                    <select
                      id="type"
                      value={resourceDetails.type}
                      onChange={(e) => setResourceDetails({...resourceDetails, type: e.target.value as any})}
                      className="input w-full"
                      required
                    >
                      <option value="document">Document</option>
                      <option value="video">Video</option>
                      <option value="link">Link</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                      URL
                    </label>
                    <input
                      type="url"
                      id="url"
                      value={resourceDetails.url}
                      onChange={(e) => setResourceDetails({...resourceDetails, url: e.target.value})}
                      className="input w-full"
                      placeholder="https://example.com/resource"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={resourceDetails.description}
                      onChange={(e) => setResourceDetails({...resourceDetails, description: e.target.value})}
                      rows={3}
                      className="input w-full"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      className="mr-3"
                      onClick={() => setIsUploadDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" isLoading={isSubmitting}>
                      Upload
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Schedule Session Dialog */}
      {isScheduleDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-slide-up">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Schedule Session</h2>
                <button
                  onClick={() => setIsScheduleDialogOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Clock className="h-5 w-5" />
                </button>
              </div>
              
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-gray-900">Session Scheduled</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    The session has been scheduled successfully and the student has been notified.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleScheduleSession}>
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Session Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={sessionDetails.title}
                      onChange={(e) => setSessionDetails({...sessionDetails, title: e.target.value})}
                      className="input w-full"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={sessionDetails.date}
                      onChange={(e) => setSessionDetails({...sessionDetails, date: e.target.value})}
                      className="input w-full"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        id="startTime"
                        value={sessionDetails.startTime}
                        onChange={(e) => setSessionDetails({...sessionDetails, startTime: e.target.value})}
                        className="input w-full"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        id="endTime"
                        value={sessionDetails.endTime}
                        onChange={(e) => setSessionDetails({...sessionDetails, endTime: e.target.value})}
                        className="input w-full"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={sessionDetails.description}
                      onChange={(e) => setSessionDetails({...sessionDetails, description: e.target.value})}
                      rows={3}
                      className="input w-full"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      className="mr-3"
                      onClick={() => setIsScheduleDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" isLoading={isSubmitting}>
                      Schedule
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

const X = Clock;

export default TutorDashboard;