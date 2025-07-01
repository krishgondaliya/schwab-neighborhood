import React from 'react';
import { Crown, Shield, User } from 'lucide-react';
import { UserRole } from '../types';

interface RoleIndicatorProps {
  role: UserRole;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const RoleIndicator: React.FC<RoleIndicatorProps> = ({ 
  role, 
  size = 'md', 
  showLabel = false 
}) => {
  const getRoleConfig = (role: UserRole) => {
    switch (role) {
      case 'mayor':
        return {
          icon: Crown,
          color: 'text-yellow-600',
          bg: 'bg-yellow-100',
          label: 'Community Mayor'
        };
      case 'moderator':
        return {
          icon: Shield,
          color: 'text-purple-600',
          bg: 'bg-purple-100',
          label: 'Schwab Moderator'
        };
      default:
        return {
          icon: User,
          color: 'text-blue-600',
          bg: 'bg-blue-100',
          label: 'Schwab Client'
        };
    }
  };

  const config = getRoleConfig(role);
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const paddingClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-2'
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`${config.bg} ${paddingClasses[size]} rounded-full`}>
        <Icon className={`${sizeClasses[size]} ${config.color}`} />
      </div>
      {showLabel && (
        <span className="text-sm font-medium text-gray-700">{config.label}</span>
      )}
    </div>
  );
};