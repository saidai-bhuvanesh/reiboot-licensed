import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { FiCheckSquare, FiVideo, FiMessageCircle, FiAward, FiBell } from 'react-icons/fi';
import ActivityBadge from './ActivityBadge';

const getIcon = (type) => {
  switch (type) {
    case 'task_assigned':
    case 'task_completed':
      return <FiCheckSquare className="text-indigo-400" size={16} />;
    case 'booking_confirmed':
    case 'session_reminder':
      return <FiVideo className="text-green-400" size={16} />;
    case 'message_received':
      return <FiMessageCircle className="text-blue-400" size={16} />;
    case 'achievement_unlocked':
      return <FiAward className="text-yellow-400" size={16} />;
    default:
      return <FiBell className="text-gray-400" size={16} />;
  }
};

const getBadgeType = (type) => {
  if (type.includes('task')) return 'task';
  if (type.includes('booking') || type.includes('session')) return 'session';
  if (type.includes('message')) return 'message';
  if (type.includes('achievement')) return 'achievement';
  return 'default';
};

const getBadgeLabel = (type) => {
  if (type.includes('task')) return 'Task';
  if (type.includes('booking') || type.includes('session')) return 'Session';
  if (type.includes('message')) return 'Message';
  if (type.includes('achievement')) return 'Achievement';
  return 'Alert';
};

const TimelineCard = ({ notification, isLast }) => {
  const badgeType = getBadgeType(notification.type || '');
  const badgeLabel = getBadgeLabel(notification.type || '');

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="relative flex gap-4"
    >
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-4 top-8 bottom-[-16px] w-[2px] bg-gray-700/50 rounded-full" />
      )}
      
      {/* Icon Circle */}
      <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1A1D21] border border-gray-700 shadow-sm ring-4 ring-[#121212]">
        {getIcon(notification.type)}
      </div>

      {/* Content Card */}
      <div className="flex flex-col flex-1 pb-4">
        <div className="flex items-center justify-between mb-1">
          <ActivityBadge type={badgeType} label={badgeLabel} />
          <span className="text-[11px] text-gray-500 font-medium">
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
          </span>
        </div>
        <div className="bg-[#1A1D21] p-3 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-colors">
          <p className="text-sm text-gray-200 font-medium leading-tight mb-1">
            {notification.title}
          </p>
          <p className="text-xs text-gray-400 line-clamp-2">
            {notification.message}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(TimelineCard);
