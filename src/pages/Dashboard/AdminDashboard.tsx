import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Users, BookOpen, Calendar, Flag, BarChart, Settings, Search } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Platform management and analytics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="flex items-center p-6 bg-blue-50 border-blue-100">
          <div className="p-3 bg-blue-100 rounded-full mr-4">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">1,200</h3>
            <p className="text-gray-600">Total Users</p>
          </div>
        </Card>
        
        <Card className="flex items-center p-6 bg-purple-50 border-purple-100">
          <div className="p-3 bg-purple-100 rounded-full mr-4">
            <BookOpen className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">500</h3>
            <p className="text-gray-600">Resources</p>
          </div>
        </Card>
        
        <Card className="flex items-center p-6 bg-orange-50 border-orange-100">
          <div className="p-3 bg-orange-100 rounded-full mr-4">
            <Calendar className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">350</h3>
            <p className="text-gray-600">Sessions This Month</p>
          </div>
        </Card>
        
        <Card className="flex items-center p-6 bg-red-50 border-red-100">
          <div className="p-3 bg-red-100 rounded-full mr-4">
            <Flag className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">5</h3>
            <p className="text-gray-600">Flagged Content</p>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">User Growth</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">This Week</Button>
                <Button variant="outline" size="sm">This Month</Button>
                <Button variant="outline" size="sm">This Year</Button>
              </div>
            </div>
            
            <div className="h-64 w-full bg-gray-100 rounded-lg flex items-center justify-center">
              <BarChart className="h-10 w-10 text-gray-400" />
              <span className="ml-2 text-gray-500">Analytics Chart Placeholder</span>
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button fullWidth leftIcon={<Users className="h-5 w-5" />}>
                Manage Users
              </Button>
              <Button fullWidth variant="secondary" leftIcon={<BookOpen className="h-5 w-5" />}>
                Review Content
              </Button>
              <Button fullWidth variant="accent" leftIcon={<Flag className="h-5 w-5" />}>
                View Flagged Items
              </Button>
              <Button fullWidth variant="outline" leftIcon={<Settings className="h-5 w-5" />}>
                Platform Settings
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="mb-8">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Users</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className="input pr-10"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">JS</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">John Student</div>
                        <div className="text-sm text-gray-500">student@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Student
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    June 8, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600 font-semibold">JT</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Jane Tutor</div>
                        <div className="text-sm text-gray-500">tutor@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      Tutor
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    May 26, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-600 font-semibold">RL</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Robert Lewis</div>
                        <div className="text-sm text-gray-500">robert@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Student
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    July 12, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Inactive
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">
              Showing 3 of 120 users
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </Card>
      </div>
      
      <div>
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Flagged Content</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border border-red-100 rounded-lg bg-red-50">
              <div className="flex justify-between">
                <div className="flex items-start">
                  <Flag className="h-5 w-5 text-red-600 mt-0.5 mr-2" />
                  <div>
                    <h3 className="font-medium text-gray-900">Inappropriate Comment</h3>
                    <p className="text-sm text-gray-600">
                      Reported by: <span className="font-medium">Sarah Wilson</span> on <span className="font-medium">July 15, 2023</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      "This comment contains offensive language and should be removed..."
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Dismiss</Button>
                  <Button variant="accent" size="sm">Remove</Button>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-red-100 rounded-lg bg-red-50">
              <div className="flex justify-between">
                <div className="flex items-start">
                  <Flag className="h-5 w-5 text-red-600 mt-0.5 mr-2" />
                  <div>
                    <h3 className="font-medium text-gray-900">Suspicious User Activity</h3>
                    <p className="text-sm text-gray-600">
                      Reported by: <span className="font-medium">System</span> on <span className="font-medium">July 16, 2023</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      "Multiple failed login attempts detected from unusual location..."
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Dismiss</Button>
                  <Button variant="accent" size="sm">Investigate</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;