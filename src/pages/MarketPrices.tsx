import React, { useState } from 'react';
import { TrendingUp, TrendingDown, MapPin, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { marketPrices, farmerProfile } from '../data/mockData';

const MarketPrices: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');

  const filteredPrices = marketPrices.filter(item =>
    item.crop.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCrop === '' || item.crop === selectedCrop)
  );

  const calculateIncome = (price: number, landSize: number = farmerProfile.landSize) => {
    // Assuming average yield per acre for demonstration
    const avgYieldPerAcre = {
      'Rice': 25, // quintals per acre
      'Coconut': 50, // nuts per tree, assuming 50 trees per acre
      'Pepper': 5,
      'Cardamom': 2,
      'Banana': 200 // dozens per acre
    };
    
    const cropYield = avgYieldPerAcre[selectedCrop as keyof typeof avgYieldPerAcre] || 25;
    return (price * cropYield * landSize).toLocaleString('en-IN');
  };

  return (
    <div className="p-4 space-y-6 pb-20 lg:pb-4">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
          <TrendingUp size={24} />
          {t('marketPrices')}
        </h1>

        {/* Search and Filter */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={`${t('search')} crops...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All Crops</option>
            {marketPrices.map(item => (
              <option key={item.crop} value={item.crop}>{item.crop}</option>
            ))}
          </select>
        </div>

        {/* Market Prices List */}
        <div className="space-y-4">
          {filteredPrices.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{item.crop}</h3>
                <div className="flex items-center gap-2">
                  {item.change.startsWith('+') ? (
                    <TrendingUp className="text-green-500" size={16} />
                  ) : (
                    <TrendingDown className="text-red-500" size={16} />
                  )}
                  <span className={`font-medium ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {item.changePercent}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-sm text-gray-600">{t('currentPrice')}</p>
                  <p className="text-xl font-bold text-green-600">₹{item.currentPrice}</p>
                  <p className="text-xs text-gray-500">per quintal</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('priceChange')}</p>
                  <p className={`text-lg font-semibold ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {item.change} ({item.changePercent})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <MapPin size={14} />
                <span>{item.market}</span>
              </div>

              {selectedCrop === item.crop && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <p className="text-sm text-blue-800 mb-1">
                    <strong>Estimated Income for {farmerProfile.landSize} acres:</strong>
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    ₹{calculateIncome(item.currentPrice)}
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    *Based on average yield estimates
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 mt-3">
                <button className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  View Details
                </button>
                <button className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Find Buyers
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Trends */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Market Insights</h2>
        <div className="space-y-3">
          <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
            <p className="text-sm text-green-800">
              📈 <strong>Cardamom prices up 9.1%</strong> - High demand from export markets
            </p>
          </div>
          <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
            <p className="text-sm text-red-800">
              📉 <strong>Coconut prices down 7.4%</strong> - Seasonal oversupply expected
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm text-blue-800">
              💡 <strong>Best time to sell:</strong> Banana and Pepper showing strong upward trend
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;