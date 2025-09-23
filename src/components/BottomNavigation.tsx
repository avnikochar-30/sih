import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, MessageCircle, Activity, Cloud } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const BottomNavigation: React.FC = () => {
  const { t } = useLanguage();

  const navItems = [
    { path: '/', icon: Home, label: t('dashboard') },
    { path: '/activities', icon: Activity, label: t('activities') },
    { path: '/chat', icon: MessageCircle, label: t('chat') },
    { path: '/weather', icon: Cloud, label: t('weather') },
    { path: '/profile', icon: User, label: t('profile') },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
      <div className="flex justify-around py-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-green-600' 
                  : 'text-gray-500 hover:text-green-600'
              }`
            }
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;