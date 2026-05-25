import React from 'react';

const badgeStyles = {
  task: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  session: 'bg-green-500/10 text-green-400 border-green-500/20',
  message: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  achievement: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  default: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
};

const ActivityBadge = ({ type, label }) => {
  const style = badgeStyles[type] || badgeStyles.default;
  return (
    <span className={`px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full border ${style}`}>
      {label || type}
    </span>
  );
};

export default React.memo(ActivityBadge);
