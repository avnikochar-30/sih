import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Thermometer, 
  Droplets, 
  TrendingUp, 
  AlertTriangle,
  Activity,
  Camera,
  MessageCircle,
  FileText
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { weatherData, marketPrices, activities, farmerProfile } from '../data/mockData';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="p-4 space-y-6 pb-20 lg:pb-4">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-2">{t('welcomeFarmer')}</h1>
        <p className="text-green-100">
          {farmerProfile.name} • {farmerProfile.location}
        </p>
      </div>

      {/* Today's Weather */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Thermometer className="text-blue-500" size={20} />
          {t('todaysWeather')}
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {weatherData.current.temperature}°C
            </p>
            <p className="text-sm text-gray-600">{t('temperature')}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {weatherData.current.humidity}%
            </p>
            <p className="text-sm text-gray-600">{t('humidity')}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {weatherData.current.rainfall}mm
            </p>
            <p className="text-sm text-gray-600">{t('rainfall')}</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
          <p className="text-yellow-800 text-sm">
            ⚠️ Rain expected tomorrow - avoid spraying pesticides today
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">{t('quickActions')}</h2>
        <div className="grid grid-cols-2 gap-4">
          <Link 
            to="/chat" 
            className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <MessageCircle className="text-blue-600 mb-2" size={24} />
            <span className="text-sm font-medium text-blue-800">{t('chat')}</span>
          </Link>
          <Link 
            to="/disease" 
            className="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Camera className="text-red-600 mb-2" size={24} />
            <span className="text-sm font-medium text-red-800">{t('disease')}</span>
          </Link>
          <Link 
            to="/activities" 
            className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Activity className="text-green-600 mb-2" size={24} />
            <span className="text-sm font-medium text-green-800">{t('activities')}</span>
          </Link>
          <Link 
            to="/schemes" 
            className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <FileText className="text-purple-600 mb-2" size={24} />
            <span className="text-sm font-medium text-purple-800">{t('schemes')}</span>
          </Link>
        </div>
      </div>

      {/* Market Alerts */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="text-green-500" size={20} />
          {t('marketAlerts')}
        </h2>
        <div className="space-y-3">
          {marketPrices.slice(0, 3).map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{item.crop}</p>
                <p className="text-sm text-gray-600">₹{item.currentPrice}/quintal</p>
              </div>
              <div className={`text-sm font-medium ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {item.changePercent}
              </div>
            </div>
          ))}
        </div>
        <Link 
          to="/market" 
          className="block mt-4 text-center text-green-600 font-medium hover:text-green-700"
        >
          View All Prices →
        </Link>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">{t('recentActivities')}</h2>
        <div className="space-y-3">
          {activities.slice(0, 2).map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Activity className="text-green-500 mt-1" size={16} />
              <div className="flex-1">
                <p className="font-medium text-sm">{activity.activity}</p>
                <p className="text-xs text-gray-600">{activity.notes}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
        <Link 
          to="/activities" 
          className="block mt-4 text-center text-green-600 font-medium hover:text-green-700"
        >
          View All Activities →
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;