import React, { useState } from 'react';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  MessageSquare, 
  Users, 
  BarChart3,
  Send,
  ThumbsUp,
  Crown
} from 'lucide-react';
import { TownHall, TownHallRanking } from '../types';
import { RoleIndicator } from './RoleIndicator';

interface TownHallRoomProps {
  townHall: TownHall;
  onClose: () => void;
}

export const TownHallRoom: React.FC<TownHallRoomProps> = ({ townHall, onClose }) => {
  const [chatMessage, setChatMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'polls'>('chat');
  const [micEnabled, setMicEnabled] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);

  const chatMessages = [
    { id: 1, user: 'Derek Chen', role: 'client' as const, message: 'Great discussion on retirement planning!', time: '2:15 PM' },
    { id: 2, user: 'Dhruv Setty', role: 'mayor' as const, message: 'What are your thoughts on the new portfolio tools?', time: '2:16 PM' },
    { id: 3, user: 'Josh Wu', role: 'client' as const, message: 'The mobile app updates are very helpful', time: '2:17 PM' },
  ];

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Handle message sending
      setChatMessage('');
    }
  };

  const handleVote = (rankingId: string, option: string) => {
    // Handle voting logic
    console.log(`Voted for ${option} in ranking ${rankingId}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-6xl h-5/6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{townHall.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {townHall.participants} participants
              </div>
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-yellow-600" />
                Moderated by {townHall.moderator}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-semibold"
          >
            ×
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Main Video Area */}
          <div className="flex-1 bg-gray-900 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Town Hall Video Stream</p>
                <p className="text-sm opacity-75">Moderator: {townHall.moderator}</p>
              </div>
            </div>
            
            {/* Video Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
              <button
                onClick={() => setMicEnabled(!micEnabled)}
                className={`p-3 rounded-full ${micEnabled ? 'bg-green-600' : 'bg-red-600'} text-white hover:opacity-80 transition-opacity`}
              >
                {micEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setVideoEnabled(!videoEnabled)}
                className={`p-3 rounded-full ${videoEnabled ? 'bg-green-600' : 'bg-red-600'} text-white hover:opacity-80 transition-opacity`}
              >
                {videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l border-gray-200 flex flex-col">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium ${
                  activeTab === 'chat' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Chat
              </button>
              <button
                onClick={() => setActiveTab('polls')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium ${
                  activeTab === 'polls' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Polls
              </button>
            </div>

            {/* Chat Tab */}
            {activeTab === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map(msg => (
                    <div key={msg.id} className="flex gap-3">
                      <RoleIndicator role={msg.role} size="sm" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-gray-900">{msg.user}</span>
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                        <p className="text-sm text-gray-700">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Polls Tab */}
            {activeTab === 'polls' && (
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {townHall.rankings.map(ranking => (
                  <div key={ranking.id} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">{ranking.question}</h4>
                    <div className="space-y-2">
                      {ranking.options.map(option => {
                        const votes = ranking.votes[option] || 0;
                        const totalVotes = Object.values(ranking.votes).reduce((a, b) => a + b, 0);
                        const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
                        
                        return (
                          <button
                            key={option}
                            onClick={() => handleVote(ranking.id, option)}
                            className="w-full text-left p-3 bg-white rounded border border-gray-200 hover:border-blue-300 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{option}</span>
                              <span className="text-sm text-gray-600">{votes} votes</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};