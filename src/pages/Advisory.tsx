import React, { useState } from 'react';
import { Lightbulb, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { farmerProfile, weatherData } from '../data/mockData';

const Advisory: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const advisories = [
    {
      id: 1,
      category: 'weather',
      priority: 'high',
      title: 'Rain Alert - Postpone Pesticide Application',
      titleMl: 'മഴ മുന്നറിയിപ്പ് - കീടനാശിനി പ്രയോഗം നിർത്തിവെക്കുക',
      description: 'Heavy rain expected tomorrow (15mm). Avoid spraying pesticides as they will be washed away.',
      descriptionMl: 'നാളെ കനത്ത മഴ പ്രതീക്ഷിക്കുന്നു (15mm). കീടനാശിനികൾ കഴുകിപ്പോകുമെന്നതിനാൽ തളിക്കുന്നത് ഒഴിവാക്കുക.',
      date: '2024-01-15',
      isRead: false
    },
    {
      id: 2,
      category: 'fertilizer',
      priority: 'medium',
      title: 'Apply Potash Fertilizer to Coconut Trees',
      titleMl: 'തേങ്ങാ മരങ്ങൾക്ക് പൊട്ടാഷ് വളം പ്രയോഗിക്കുക',
      description: 'This is the ideal time for potash application to coconut trees before monsoon.',
      descriptionMl: 'മൺസൂണിനു മുമ്പ് തേങ്ങാ മരങ്ങൾക്ക് പൊട്ടാഷ് വളം പ്രയോഗിക്കാനുള്ള ഏറ്റവും അനുയോജ്യമായ സമയമാണിത്.',
      date: '2024-01-14',
      isRead: true
    },
    {
      id: 3,
      category: 'disease',
      priority: 'high',
      title: 'Monitor for Rice Blast Disease',
      titleMl: 'നെല്ലിന്റെ ബ്ലാസ്റ്റ് രോഗത്തിനായി നിരീക്ഷിക്കുക',
      description: 'Current humid weather conditions favor rice blast. Check for oval spots on leaves.',
      descriptionMl: 'നിലവിലെ ഈർപ്പമുള്ള കാലാവസ്ഥ നെല്ലിന്റെ ബ്ലാസ്റ്റിന് അനുകൂലമാണ്. ഇലകളിൽ ഓവൽ പാടുകൾ ഉണ്ടോ എന്ന് പരിശോധിക്കുക.',
      date: '2024-01-13',
      isRead: true
    },
    {
      id: 4,
      category: 'market',
      priority: 'low',
      title: 'Cardamom Prices Rising - Good Time to Sell',
      titleMl: 'ഏലക്കായുടെ വില ഉയരുന്നു - വിൽക്കാനുള്ള നല്ല സമയം',
      description: 'Cardamom prices have increased by 9.1% this week. Consider selling your stock.',
      descriptionMl: 'ഈ ആഴ്ച ഏലക്കായുടെ വില 9.1% വർദ്ധിച്ചു. നിങ്ങളുടെ സ്റ്റോക്ക് വിൽക്കുന്നത് പരിഗണിക്കുക.',
      date: '2024-01-12',
      isRead: false
    }
  ];

  const categories = [
    { key: 'all', label: 'All', labelMl: 'എല്ലാം' },
    { key: 'weather', label: 'Weather', labelMl: 'കാലാവസ്ഥ' },
    { key: 'fertilizer', label: 'Fertilizer', labelMl: 'വളം' },
    { key: 'disease', label: 'Disease', labelMl: 'രോഗം' },
    { key: 'market', label: 'Market', labelMl: 'മാർക്കറ്റ്' }
  ];

  const filteredAdvisories = selectedCategory === 'all' 
    ? advisories 
    : advisories.filter(advisory => advisory.category === selectedCategory);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="text-red-500" size={20} />;
      case 'medium':
        return <Clock className="text-yellow-500" size={20} />;
      case 'low':
        return <CheckCircle className="text-green-500" size={20} />;
      default:
        return <Lightbulb className="text-blue-500" size={20} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className="p-4 space-y-6 pb-20 lg:pb-4">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-green-600 mb-2 flex items-center gap-2">
          <Lightbulb size={24} />
          {t('advisory')}
        </h1>
        <p className="text-gray-600">
          Personalized farming advice for your location and crops
        </p>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-xl p-4 shadow-lg">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category.key
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {language === 'en' ? category.label : category.labelMl}
            </button>
          ))}
        </div>
      </div>

      {/* Advisories */}
      <div className="space-y-4">
        {filteredAdvisories.map(advisory => (
          <div 
            key={advisory.id} 
            className={`bg-white rounded-xl p-6 shadow-lg border-l-4 ${getPriorityColor(advisory.priority)} ${
              !advisory.isRead ? 'ring-2 ring-blue-200 ring-opacity-50' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {getPriorityIcon(advisory.priority)}
                <h3 className="font-semibold text-gray-800">
                  {language === 'en' ? advisory.title : advisory.titleMl}
                </h3>
              </div>
              {!advisory.isRead && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  New
                </span>
              )}
            </div>
            
            <p className="text-gray-600 text-sm mb-3">
              {language === 'en' ? advisory.description : advisory.descriptionMl}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar size={12} />
                <span>{advisory.date}</span>
              </div>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Today's Recommendations */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Today's Recommendations</h2>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <p className="text-blue-800 font-medium text-sm mb-1">💧 Irrigation</p>
            <p className="text-blue-700 text-xs">
              Water your rice fields early morning (6-8 AM) for better absorption
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
            <p className="text-green-800 font-medium text-sm mb-1">🌱 Field Inspection</p>
            <p className="text-green-700 text-xs">
              Check for pest activity in coconut trees, especially red palm weevil
            </p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <p className="text-yellow-800 font-medium text-sm mb-1">📈 Market Watch</p>
            <p className="text-yellow-700 text-xs">
              Monitor pepper prices - showing upward trend this week
            </p>
          </div>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">This Week's Summary</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">3</p>
            <p className="text-sm text-red-800">High Priority</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">5</p>
            <p className="text-sm text-yellow-800">Medium Priority</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">2</p>
            <p className="text-sm text-green-800">Low Priority</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advisory;