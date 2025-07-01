import React, { useState } from 'react';
import { MessageSquare, TrendingUp, Search, Filter, Plus, Heart, Reply, Clock, Siren as Fire } from 'lucide-react';
import { Discussion } from '../types';
import { RoleIndicator } from './RoleIndicator';

export const CommunityPortal: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const discussions: Discussion[] = [
    {
      id: '1',
      title: 'New Mobile App Features - What would you like to see?',
      author: 'Matt Korn',
      authorRole: 'mayor',
      content: 'The mobile app team is looking for feedback on upcoming features. What functionality would make your experience better?',
      replies: 23,
      likes: 45,
      category: 'Product Feedback',
      createdAt: '2024-03-15T10:30:00Z',
      trending: true,
      tags: ['mobile', 'features', 'feedback']
    },
    {
      id: '2',
      title: 'Retirement Planning Workshop Feedback',
      author: 'Jack Russell',
      authorRole: 'client',
      content: 'Just attended the retirement planning workshop. Here are my thoughts and suggestions for improvement...',
      replies: 12,
      likes: 28,
      category: 'Education',
      createdAt: '2024-03-14T15:45:00Z',
      trending: false,
      tags: ['retirement', 'workshop', 'education']
    },
    {
      id: '3',
      title: 'Bug Report: Portfolio Performance Chart Issues',
      author: 'Keisha Moranza',
      authorRole: 'client',
      content: 'Experiencing issues with the portfolio performance charts not loading correctly on desktop...',
      replies: 8,
      likes: 15,
      category: 'Bug Reports',
      createdAt: '2024-03-14T09:20:00Z',
      trending: false,
      tags: ['bug', 'portfolio', 'charts']
    }
  ];

  const trendingSuggestions = [
    'Dark mode for mobile app',
    'Better notification settings',
    'Enhanced portfolio analytics',
    'Simplified account setup',
    'More educational content'
  ];

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'trending' && discussion.trending) ||
      (activeFilter === 'feedback' && discussion.category === 'Product Feedback') ||
      (activeFilter === 'bugs' && discussion.category === 'Bug Reports');
    
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Community Portal</h1>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Discussion
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                {[
                  { id: 'all', label: 'All', icon: MessageSquare },
                  { id: 'trending', label: 'Trending', icon: TrendingUp },
                  { id: 'feedback', label: 'Feedback', icon: Heart },
                  { id: 'bugs', label: 'Bugs', icon: Filter }
                ].map(filter => {
                  const Icon = filter.icon;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFilter === filter.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Discussions */}
          <div className="space-y-4">
            {filteredDiscussions.map(discussion => (
              <div key={discussion.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <RoleIndicator role={discussion.authorRole} size="md" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                          {discussion.title}
                          {discussion.trending && (
                            <Fire className="inline w-4 h-4 text-orange-500 ml-2" />
                          )}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                          <span className="font-medium">{discussion.author}</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(discussion.createdAt)}
                          </div>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {discussion.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4 line-clamp-2">{discussion.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                          <Heart className="w-4 h-4" />
                          {discussion.likes}
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <Reply className="w-4 h-4" />
                          {discussion.replies} replies
                        </button>
                      </div>
                      
                      <div className="flex gap-2">
                        {discussion.tags.map(tag => (
                          <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Suggestions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              Trending Suggestions
            </h3>
            <div className="space-y-3">
              {trendingSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <span className="text-sm text-gray-700">{suggestion}</span>
                  <div className="flex items-center gap-1 text-orange-500">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs font-medium">{Math.floor(Math.random() * 50) + 10}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                Submit Product Feedback
              </button>
              <button className="w-full text-left p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                Report a Bug
              </button>
              <button className="w-full text-left p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                Suggest New Feature
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};