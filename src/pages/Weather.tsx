import React from 'react';
import { Cloud, Sun, CloudRain, Thermometer, Droplets, Wind } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { weatherData, farmerProfile } from '../data/mockData';

const Weather: React.FC = () => {
  const { t } = useLanguage();

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'hot':
        return <Sun className="text-yellow-500" size={24} />;
      case 'rainy':
        return <CloudRain className="text-blue-500" size={24} />;
      case 'cloudy':
      case 'partly cloudy':
      default:
        return <Cloud className="text-gray-500" size={24} />;
    }
  };

  const getBackgroundColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'hot':
        return 'from-yellow-400 to-orange-500';
      case 'rainy':
        return 'from-blue-400 to-blue-600';
      case 'cloudy':
      case 'partly cloudy':
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="p-4 space-y-6 pb-20 lg:pb-4">
      {/* Current Weather */}
      <div className={`bg-gradient-to-r ${getBackgroundColor(weatherData.current.condition)} text-white rounded-xl p-6 shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">{t('weatherForecast')}</h1>
            <p className="text-white/80">{farmerProfile.location}</p>
          </div>
          {getWeatherIcon(weatherData.current.condition)}
        </div>
        
        <div className="text-center mb-4">
          <p className="text-5xl font-bold">{weatherData.current.temperature}°C</p>
          <p className="text-white/90">{weatherData.current.condition}</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <Droplets className="mx-auto mb-1 text-white/80" size={20} />
            <p className="text-sm text-white/80">{t('humidity')}</p>
            <p className="font-bold">{weatherData.current.humidity}%</p>
          </div>
          <div className="text-center">
            <Wind className="mx-auto mb-1 text-white/80" size={20} />
            <p className="text-sm text-white/80">Wind</p>
            <p className="font-bold">{weatherData.current.windSpeed} km/h</p>
          </div>
          <div className="text-center">
            <CloudRain className="mx-auto mb-1 text-white/80" size={20} />
            <p className="text-sm text-white/80">{t('rainfall')}</p>
            <p className="font-bold">{weatherData.current.rainfall} mm</p>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">7-Day Forecast</h2>
        <div className="space-y-3">
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {getWeatherIcon(day.condition)}
                <div>
                  <p className="font-medium">{day.day}</p>
                  <p className="text-sm text-gray-600">{day.condition}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{day.temp}°C</p>
                {day.rainfall > 0 && (
                  <p className="text-sm text-blue-600">{day.rainfall}mm rain</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Alerts & Recommendations */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Alerts & Recommendations</h2>
        <div className="space-y-3">
          <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <p className="text-yellow-800 font-medium mb-1">⚠️ Heavy Rain Alert</p>
            <p className="text-yellow-700 text-sm">
              Expected 15mm rainfall on Wednesday. Avoid field work and pesticide application.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
            <p className="text-green-800 font-medium mb-1">🌱 Perfect for Planting</p>
            <p className="text-green-700 text-sm">
              Current weather conditions are ideal for rice transplantation in your area.
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <p className="text-blue-800 font-medium mb-1">💧 Irrigation Reminder</p>
            <p className="text-blue-700 text-sm">
              With sunny weather ahead, increase watering frequency for your crops.
            </p>
          </div>
        </div>
      </div>

      {/* Weather-based Farming Tips */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Weather-based Tips</h2>
        <div className="grid grid-cols-1 gap-3">
          <div className="p-3 bg-indigo-50 rounded-lg">
            <p className="text-indigo-800 font-medium text-sm mb-1">🌾 Rice Farming</p>
            <p className="text-indigo-700 text-xs">
              Maintain 2-3 inches water level during current humid conditions
            </p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="text-orange-800 font-medium text-sm mb-1">🥥 Coconut Care</p>
            <p className="text-orange-700 text-xs">
              Apply potash fertilizer before the rainy season begins
            </p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="text-purple-800 font-medium text-sm mb-1">🌶️ Spice Crops</p>
            <p className="text-purple-700 text-xs">
              Cover pepper vines to protect from heavy rain damage
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;