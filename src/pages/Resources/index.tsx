import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Book, Search, Filter, Video, Link as LinkIcon, FileText } from 'lucide-react';
import { useResourceStore } from '../../store/resourceStore';
import { Resource } from '../../types';

const ResourcesPage: React.FC = () => {
  const { resources, fetchResources, isLoading } = useResourceStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  // Extract unique subjects from resources
  const subjects = [...new Set(resources.map(resource => resource.subject))];

  // Filter resources based on search term, subject, and type
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject ? resource.subject === selectedSubject : true;
    const matchesType = selectedType ? resource.type === selectedType : true;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-600" />;
      case 'link':
        return <LinkIcon className="h-5 w-5 text-green-600" />;
      default:
        return <Book className="h-5 w-5 text-purple-600" />;
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Learning Resources</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Browse our collection of educational materials created by our volunteer tutors.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input w-full pl-10"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search className="h-5 w-5" />
                </div>
              </div>
              
              <div className="flex gap-4">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="input"
                >
                  <option value="">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="input"
                >
                  <option value="">All Types</option>
                  <option value="document">Documents</option>
                  <option value="video">Videos</option>
                  <option value="link">Links</option>
                  <option value="other">Other</option>
                </select>
                
                <Button
                  variant="outline"
                  leftIcon={<Filter className="h-5 w-5" />}
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSubject('');
                    setSelectedType('');
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading resources...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm max-w-2xl mx-auto">
              <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600">
                Try adjusting your filters or search term to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource: Resource) => (
                <Card
                  key={resource.id}
                  className="hover:border-blue-300 hover:shadow-md transition-all duration-200"
                  onClick={() => window.open(resource.url, '_blank')}
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-2 rounded-md mr-3 ${
                      resource.type === 'document' ? 'bg-blue-100' :
                      resource.type === 'video' ? 'bg-red-100' :
                      resource.type === 'link' ? 'bg-green-100' :
                      'bg-purple-100'
                    }`}>
                      {getResourceIcon(resource.type)}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {resource.subject}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{resource.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                    <span>By {resource.uploadedBy.name}</span>
                    <span>{new Date(resource.createdAt).toLocaleDateString()}</span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesPage;