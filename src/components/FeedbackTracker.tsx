import React, { useState } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Lightbulb, 
  X,
  Send,
  MapPin
} from 'lucide-react';
import { FeedbackTracker as FeedbackTrackerType } from '../types';

interface FeedbackTrackerProps {
  isVisible: boolean;
  onClose: () => void;
  currentPage: string;
}

export const FeedbackTracker: React.FC<FeedbackTrackerProps> = ({ 
  isVisible, 
  onClose, 
  currentPage 
}) => {
  const [feedbackType, setFeedbackType] = useState<'positive' | 'negative' | 'suggestion' | null>(null);
  const [feedbackContent, setFeedbackContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedbackType || !feedbackContent.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const feedback: Omit<FeedbackTrackerType, 'id'> = {
      page: currentPage,
      element: 'general',
      feedbackType,
      content: feedbackContent,
      timestamp: new Date().toISOString(),
      userId: 'current-user',
      resolved: false
    };
    
    console.log('Feedback submitted:', feedback);
    
    setIsSubmitting(false);
    setFeedbackType(null);
    setFeedbackContent('');
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-80">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            Quick Feedback
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          {!feedbackType ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                How is your experience on this page?
              </p>
              
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setFeedbackType('positive')}
                  className="flex flex-col items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <ThumbsUp className="w-6 h-6" />
                  <span className="text-xs font-medium">Good</span>
                </button>
                
                <button
                  onClick={() => setFeedbackType('negative')}
                  className="flex flex-col items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <ThumbsDown className="w-6 h-6" />
                  <span className="text-xs font-medium">Issues</span>
                </button>
                
                <button
                  onClick={() => setFeedbackType('suggestion')}
                  className="flex flex-col items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Lightbulb className="w-6 h-6" />
                  <span className="text-xs font-medium">Idea</span>
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
                <MapPin className="w-3 h-3" />
                Page: {currentPage}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                {feedbackType === 'positive' && (
                  <>
                    <ThumbsUp className="w-4 h-4 text-green-600" />
                    <span className="text-green-700 font-medium">What's working well?</span>
                  </>
                )}
                {feedbackType === 'negative' && (
                  <>
                    <ThumbsDown className="w-4 h-4 text-red-600" />
                    <span className="text-red-700 font-medium">What's not working?</span>
                  </>
                )}
                {feedbackType === 'suggestion' && (
                  <>
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-700 font-medium">What's your idea?</span>
                  </>
                )}
              </div>
              
              <textarea
                value={feedbackContent}
                onChange={(e) => setFeedbackContent(e.target.value)}
                placeholder="Tell us more..."
                className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              
              <div className="flex gap-2">
                <button
                  onClick={() => setFeedbackType(null)}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!feedbackContent.trim() || isSubmitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};