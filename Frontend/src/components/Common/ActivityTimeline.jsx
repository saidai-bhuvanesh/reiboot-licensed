import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiActivity } from 'react-icons/fi';
import { useNotifications } from '../../context/NotificationContext';
import TimelineCard from './TimelineCard';

const ActivityTimeline = () => {
  const { notifications, isLoading } = useNotifications();

  // We'll show the top 10 most recent notifications as the activity timeline
  const recentActivities = React.useMemo(() => notifications.slice(0, 10), [notifications]);

  return (
    <div className="bg-[#121212] rounded-lg p-4 border border-gray-700 h-[calc(100vh-250px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <FiActivity className="text-indigo-400 w-5 h-5" />
          </div>
          <div>
            <h2 className="text-white font-semibold">Activity Timeline</h2>
            <p className="text-gray-400 text-xs">Realtime mentorship updates</p>
          </div>
        </div>
        <div className="flex items-center space-x-1 px-2 py-1 rounded bg-green-500/10 text-green-400 text-[10px] font-medium border border-green-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span>LIVE</span>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="flex-1 overflow-y-auto custom-scroll pr-2 relative">
        {isLoading && recentActivities.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
          </div>
        ) : recentActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-60">
            <FiActivity className="w-12 h-12 text-gray-600" />
            <p className="text-sm text-gray-400">No recent activities</p>
            <p className="text-xs text-gray-500 max-w-[200px]">
              Your realtime updates like sessions and tasks will appear here.
            </p>
          </div>
        ) : (
          <div className="pl-2 pt-2 pb-4">
            <AnimatePresence mode="popLayout">
              {recentActivities.map((notification, index) => (
                <TimelineCard
                  key={notification._id || index}
                  notification={notification}
                  isLast={index === recentActivities.length - 1}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityTimeline;
