import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  User, 
  MessageCircle, 
  Activity, 
  Lightbulb,
  Camera,
  FileText,
  DollarSign,
  Cloud,
  BarChart3
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  const navItems = [
    { path: '/', icon: Home, label: t('dashboard') },
    { path: '/profile', icon: User, label: t('profile') },
    { path: '/chat', icon: MessageCircle, label: t('chat') },
    { path: '/activities', icon: Activity, label: t('activities') },
    { path: '/advisory', icon: Lightbulb, label: t('advisory') },
    { path: '/disease', icon: Camera, label: t('disease') },
    { path: '/schemes', icon: FileText, label: t('schemes') },
    { path: '/market', icon: DollarSign, label: t('market') },
    { path: '/weather', icon: Cloud, label: t('weather') },
    { path: '/comparison', icon: BarChart3, label: t('comparison') },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <nav className={`
        fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:shadow-none lg:w-64
      `}>
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-green-600">
            Menu
          </h2>
        </div>
        
        <div className="p-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 p-4 mb-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-green-100 text-green-700 font-semibold' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;