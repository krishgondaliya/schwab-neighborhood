import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Trophy, 
  TrendingUp, 
  Star, 
  Calendar, 
  Award, 
  ChevronRight, 
  Home, 
  Settings, 
  Bell,
  BarChart3,
  MessageCircle,
  Shield,
  Mail,
  Phone,
  Video,
  Crown,
  User
} from 'lucide-react';
import { User as UserType, TownHall, Product, Badge, UserRole, FeedbackFrequency } from './types';
import { RoleIndicator } from './components/RoleIndicator';
import { TownHallRoom } from './components/TownHallRoom';
import { CommunityPortal } from './components/CommunityPortal';
import { FeedbackTracker } from './components/FeedbackTracker';
import { HeatmapVisualization } from './components/HeatmapVisualization';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showTownHallRoom, setShowTownHallRoom] = useState(false);
  const [selectedTownHall, setSelectedTownHall] = useState<TownHall | null>(null);
  const [showFeedbackTracker, setShowFeedbackTracker] = useState(false);

  // Current user state
  const [currentUser] = useState<UserType>({
    id: '1',
    name: 'Krish Gondaliya',
    email: 'krish.gondaliya@schwab.com',
    role: 'moderator',
    points: 1250,
    level: 'Community Advocate',
    joinDate: '2023-08-15',
    feedbackPreference: 'email',
    clientType: 'individual',
    badges: []
  });

  const townHalls: TownHall[] = [
    {
      id: 1,
      title: "Retirement Planning Tools Discussion",
      date: "March 15, 2024",
      time: "2:00 PM EST",
      participants: 127,
      status: 'upcoming',
      topic: "Investment Tools",
      moderator: "Oscar Munoz",
      chatEnabled: true,
      discussionPrompts: [
        "What retirement planning features do you use most?",
        "How can we improve the retirement calculator?",
        "What additional tools would be helpful?"
      ],
      rankings: [
        {
          id: 'retirement-tools',
          question: "Which retirement planning tool is most valuable to you?",
          options: ["Retirement Calculator", "Portfolio Analyzer", "Social Security Optimizer", "Tax Planning Tool"],
          votes: { "Retirement Calculator": 45, "Portfolio Analyzer": 32, "Social Security Optimizer": 28, "Tax Planning Tool": 22 }
        }
      ]
    },
    {
      id: 2,
      title: "Mobile App Experience Feedback",
      date: "March 12, 2024",
      time: "10:00 AM EST",
      participants: 89,
      status: 'live',
      topic: "Digital Experience",
      moderator: "Sarah Haines",
      zoomLink: "https://zoom.us/j/123456789",
      chatEnabled: true,
      discussionPrompts: [
        "What mobile features do you use daily?",
        "Any navigation issues you've encountered?",
        "What would make the mobile experience better?"
      ],
      rankings: [
        {
          id: 'mobile-features',
          question: "Rate the importance of these mobile features:",
          options: ["Account Balance", "Trade Execution", "Research Tools", "Notifications"],
          votes: { "Account Balance": 67, "Trade Execution": 54, "Research Tools": 41, "Notifications": 38 }
        }
      ]
    },
    {
      id: 3,
      title: "Customer Service Excellence",
      date: "March 8, 2024",
      time: "3:00 PM EST",
      participants: 156,
      status: 'completed',
      topic: "Service Quality",
      moderator: "Elizabeth Mischel",
      chatEnabled: true,
      discussionPrompts: [],
      rankings: []
    }
  ];

  const products: Product[] = [
    {
      id: 1,
      name: "Schwab Intelligent Portfolios",
      category: "Robo-Advisor",
      rating: 4.7,
      reviews: 2341,
      trending: true,
      clientTypeRatings: {
        individual: 4.7,
        advisor: 4.5,
        institutional: 4.8
      }
    },
    {
      id: 2,
      name: "Schwab Mobile App",
      category: "Digital Platform",
      rating: 4.5,
      reviews: 5672,
      trending: true,
      clientTypeRatings: {
        individual: 4.5,
        advisor: 4.3,
        institutional: 4.6
      }
    },
    {
      id: 3,
      name: "Schwab One Account",
      category: "Banking",
      rating: 4.8,
      reviews: 3456,
      trending: false,
      clientTypeRatings: {
        individual: 4.8,
        advisor: 4.7,
        institutional: 4.9
      }
    },
    {
      id: 4,
      name: "Retirement Planning Tools",
      category: "Planning",
      rating: 4.6,
      reviews: 1987,
      trending: false,
      clientTypeRatings: {
        individual: 4.6,
        advisor: 4.4,
        institutional: 4.5
      }
    }
  ];

  const badges: Badge[] = [
    {
      id: '1',
      title: "First Feedback",
      description: "Submitted your first product review",
      points: 50,
      earned: true,
      icon: "⭐",
      type: 'contributor',
      earnedDate: '2024-02-15'
    },
    {
      id: '2',
      title: "Town Hall Regular",
      description: "Attended 5 town hall sessions",
      points: 200,
      earned: true,
      icon: "🏛️",
      type: 'community',
      earnedDate: '2024-03-01'
    },
    {
      id: '3',
      title: "Explorer",
      description: "Tried 10 different Schwab features",
      points: 150,
      earned: true,
      icon: "🗺️",
      type: 'explorer',
      earnedDate: '2024-02-28'
    },
    {
      id: '4',
      title: "Bug Hunter",
      description: "Reported 3 bugs that were fixed",
      points: 300,
      earned: true,
      icon: "🐛",
      type: 'bug_finder',
      earnedDate: '2024-03-05'
    },
    {
      id: '5',
      title: "Community Leader",
      description: "Helped 10 community members",
      points: 300,
      earned: false,
      icon: "👑",
      type: 'community'
    },
    {
      id: '6',
      title: "Feedback Champion",
      description: "Submitted 25 detailed reviews",
      points: 500,
      earned: false,
      icon: "🏆",
      type: 'contributor'
    },
    {
      id: '7',
      title: "Top Contributor",
      description: "Ranked in top 10% of contributors",
      points: 750,
      earned: false,
      icon: "🌟",
      type: 'special'
    }
  ];

  // Mock heatmap data
  const heatmapData = [
    {
      page: 'dashboard',
      clicks: [
        { x: 100, y: 200, count: 45 },
        { x: 300, y: 150, count: 32 },
        { x: 500, y: 300, count: 28 }
      ],
      scrollDepth: 0.75,
      timeOnPage: 45000
    },
    {
      page: 'townhalls',
      clicks: [
        { x: 200, y: 100, count: 38 },
        { x: 400, y: 250, count: 25 }
      ],
      scrollDepth: 0.65,
      timeOnPage: 32000
    },
    {
      page: 'rankings',
      clicks: [
        { x: 150, y: 180, count: 42 },
        { x: 350, y: 220, count: 35 }
      ],
      scrollDepth: 0.80,
      timeOnPage: 38000
    },
    {
      page: 'community',
      clicks: [
        { x: 250, y: 160, count: 29 },
        { x: 450, y: 200, count: 22 }
      ],
      scrollDepth: 0.70,
      timeOnPage: 41000
    }
  ];

  const handleJoinTownHall = (townHall: TownHall) => {
    setSelectedTownHall(townHall);
    setShowTownHallRoom(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-100 text-red-800 border-red-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFeedbackPreferenceIcon = (preference: FeedbackFrequency) => {
    switch (preference) {
      case 'email': return Mail;
      case 'call': return Phone;
      case 'chat': return MessageCircle;
      default: return Mail;
    }
  };

  const Dashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">Welcome back, {currentUser.name}!</h1>
              <RoleIndicator role={currentUser.role} size="lg" />
            </div>
            <p className="text-blue-100 text-lg">Ready to share your insights with the community?</p>
            <div className="flex items-center gap-4 mt-3 text-blue-200">
              <div className="flex items-center gap-2">
                {React.createElement(getFeedbackPreferenceIcon(currentUser.feedbackPreference), { className: "w-4 h-4" })}
                <span className="capitalize">Prefers {currentUser.feedbackPreference} feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="capitalize">{currentUser.clientType} client</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{currentUser.points.toLocaleString()}</div>
            <div className="text-blue-200">Community Points</div>
            <div className="text-sm text-blue-300 mt-1">{currentUser.level}</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Town Halls Attended</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Reviews Submitted</p>
              <p className="text-2xl font-bold text-gray-900">18</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Community Rank</p>
              <p className="text-2xl font-bold text-gray-900">#47</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Badges Earned</p>
              <p className="text-2xl font-bold text-gray-900">{badges.filter(b => b.earned).length}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Town Halls */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Upcoming Town Halls</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
        </div>
        <div className="space-y-4">
          {townHalls.filter(th => th.status === 'upcoming' || th.status === 'live').map(townHall => (
            <div key={townHall.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-medium text-gray-900">{townHall.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(townHall.status)}`}>
                    {townHall.status.charAt(0).toUpperCase() + townHall.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{townHall.date} at {townHall.time}</p>
                <div className="flex items-center gap-4 text-sm text-blue-600 mt-1">
                  <span>{townHall.participants} participants</span>
                  <div className="flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    <span>Moderated by {townHall.moderator}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleJoinTownHall(townHall)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {townHall.status === 'live' ? 'Join Now' : 'Register'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {badges.filter(a => a.earned).slice(-2).map(badge => (
            <div key={badge.id} className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl mr-4">{badge.icon}</div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{badge.title}</h3>
                <p className="text-sm text-gray-600">{badge.description}</p>
                {badge.earnedDate && (
                  <p className="text-xs text-green-600 mt-1">Earned on {new Date(badge.earnedDate).toLocaleDateString()}</p>
                )}
              </div>
              <div className="text-green-600 font-semibold">+{badge.points}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const TownHalls = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Community Town Halls</h1>
        {(currentUser.role === 'mayor' || currentUser.role === 'moderator') && (
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Schedule New Session
          </button>
        )}
      </div>

      <div className="grid gap-6">
        {townHalls.map(townHall => (
          <div key={townHall.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{townHall.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(townHall.status)}`}>
                    {townHall.status.charAt(0).toUpperCase() + townHall.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {townHall.date} at {townHall.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {townHall.participants} participants
                  </div>
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-yellow-600" />
                    {townHall.moderator}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {townHall.topic}
                  </div>
                  {townHall.chatEnabled && (
                    <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      Chat Enabled
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleJoinTownHall(townHall)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {townHall.status === 'live' ? 'Join Now' : townHall.status === 'upcoming' ? 'Register' : 'View Summary'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProductRankings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Product Rankings</h1>
        <div className="flex items-center gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All Client Types</option>
            <option value="individual">Individual</option>
            <option value="advisor">Advisor</option>
            <option value="institutional">Institutional</option>
          </select>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Submit Review
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  {product.trending && (
                    <div className="flex items-center gap-1 bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-3">{product.category}</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">{renderStars(product.rating)}</div>
                    <span className="font-semibold text-gray-900">{product.rating}</span>
                  </div>
                  <span className="text-gray-600">({product.reviews.toLocaleString()} reviews)</span>
                </div>
                
                {/* Client Type Ratings */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="font-medium text-blue-900">Individual</div>
                    <div className="text-blue-700">{product.clientTypeRatings.individual} ⭐</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="font-medium text-green-900">Advisor</div>
                    <div className="text-green-700">{product.clientTypeRatings.advisor} ⭐</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="font-medium text-purple-900">Institutional</div>
                    <div className="text-purple-700">{product.clientTypeRatings.institutional} ⭐</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  View Details
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Rate Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Achievements = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Your Achievements</h1>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-blue-600 mb-2">{currentUser.points.toLocaleString()}</div>
          <div className="text-gray-600">Total Community Points</div>
          <div className="text-lg font-semibold text-gray-900 mt-2">{currentUser.level}</div>
        </div>
        
        <div className="bg-gray-200 rounded-full h-3 mb-4">
          <div className="bg-blue-600 h-3 rounded-full" style={{ width: '75%' }}></div>
        </div>
        <div className="text-center text-sm text-gray-600">
          250 points to next level: Community Champion
        </div>
      </div>

      {/* Badge Categories */}
      <div className="space-y-6">
        {['contributor', 'explorer', 'bug_finder', 'community', 'special'].map(category => {
          const categoryBadges = badges.filter(badge => badge.type === category);
          const categoryNames = {
            contributor: 'Top Contributor Badges',
            explorer: 'Explorer Badges',
            bug_finder: 'Bug Finder Badges',
            community: 'Community Badges',
            special: 'Special Recognition'
          };
          
          return (
            <div key={category} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{categoryNames[category as keyof typeof categoryNames]}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryBadges.map(badge => (
                  <div key={badge.id} className={`p-4 rounded-xl border-2 transition-all ${
                    badge.earned 
                      ? 'bg-green-50 border-green-200 shadow-sm' 
                      : 'bg-gray-50 border-gray-200 opacity-75'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-2xl">{badge.icon}</div>
                          <h4 className={`font-semibold ${badge.earned ? 'text-gray-900' : 'text-gray-600'}`}>
                            {badge.title}
                          </h4>
                        </div>
                        <p className={`text-sm ${badge.earned ? 'text-gray-700' : 'text-gray-500'}`}>
                          {badge.description}
                        </p>
                        {badge.earned && badge.earnedDate && (
                          <p className="text-xs text-green-600 mt-2">
                            Earned on {new Date(badge.earnedDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className={`font-bold ${badge.earned ? 'text-green-600' : 'text-gray-400'}`}>
                        {badge.earned ? '+' : ''}{badge.points}
                      </div>
                    </div>
                    {badge.earned && (
                      <div className="mt-3 flex items-center gap-2 text-green-600 text-sm">
                        <Award className="w-4 h-4" />
                        Earned
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const Analytics = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        {currentUser.role === 'moderator' && (
          <div className="flex items-center gap-2 text-sm text-purple-600">
            <Shield className="w-4 h-4" />
            Moderator View
          </div>
        )}
      </div>

      <HeatmapVisualization data={heatmapData} />

      {/* Additional Analytics for Moderators */}
      {currentUser.role === 'moderator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-green-800">Positive Feedback</span>
                <span className="font-bold text-green-600">67%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-yellow-800">Suggestions</span>
                <span className="font-bold text-yellow-600">23%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="text-red-800">Issues Reported</span>
                <span className="font-bold text-red-600">10%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Active Users (30d)</span>
                <span className="font-bold text-blue-600">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Town Hall Attendance</span>
                <span className="font-bold text-green-600">89%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Feedback Response Rate</span>
                <span className="font-bold text-purple-600">76%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'townhalls': return <TownHalls />;
      case 'rankings': return <ProductRankings />;
      case 'achievements': return <Achievements />;
      case 'community': return <CommunityPortal />;
      case 'analytics': return <Analytics />;
      default: return <Dashboard />;
    }
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'townhalls', label: 'Town Halls', icon: Users },
    { id: 'rankings', label: 'Product Rankings', icon: Star },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'community', label: 'Community Portal', icon: MessageSquare },
    ...(currentUser.role === 'moderator' ? [{ id: 'analytics', label: 'Analytics', icon: BarChart3 }] : [])
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <img 
                src="/SCHW.png"
                alt="Schwab Neighborhood" 
                className="w-10 h-10"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Schwab Neighborhood</h1>
                <p className="text-sm text-gray-600">Community Feedback Hub</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowFeedbackTracker(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Quick Feedback"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <RoleIndicator role={currentUser.role} size="md" showLabel />
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {currentUser.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <nav className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="space-y-2">
                {navigationItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Town Hall Room Modal */}
      {showTownHallRoom && selectedTownHall && (
        <TownHallRoom
          townHall={selectedTownHall}
          onClose={() => {
            setShowTownHallRoom(false);
            setSelectedTownHall(null);
          }}
        />
      )}

      {/* Feedback Tracker */}
      <FeedbackTracker
        isVisible={showFeedbackTracker}
        onClose={() => setShowFeedbackTracker(false)}
        currentPage={activeTab}
      />
    </div>
  );
}

export default App;