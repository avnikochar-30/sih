import React from 'react';
import { Globe, Menu } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="bg-green-600 text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-green-700 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <h1 className="text-xl font-bold text-center flex-1">
          {language === 'en' ? 'FarmAssist' : 'ഫാം അസിസ്റ്റ്'}
        </h1>
        
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-2 bg-green-700 hover:bg-green-800 rounded-lg transition-colors"
        >
          <Globe size={18} />
          <span className="font-medium">
            {language === 'en' ? 'മല' : 'EN'}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;