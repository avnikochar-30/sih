import React, { useState } from 'react';
import { BarChart3, TrendingUp, Shield, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { cropComparisons } from '../data/mockData';

const CropComparison: React.FC = () => {
  const { t, language } = useLanguage();
  const [crop1, setCrop1] = useState('Rice');
  const [crop2, setCrop2] = useState('Coconut');
  const [showComparison, setShowComparison] = useState(false);

  const crops = ['Rice', 'Coconut', 'Pepper', 'Cardamom', 'Banana', 'Rubber', 'Tea', 'Coffee'];

  const handleCompare = () => {
    if (crop1 && crop2 && crop1 !== crop2) {
      setShowComparison(true);
    }
  };

  const comparisonData = cropComparisons[0]; // Using mock data

  return (
    <div className="p-4 space-y-6 pb-20 lg:pb-4">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
          <BarChart3 size={24} />
          {t('comparison')}
        </h1>
        <p className="text-gray-600 mb-6">
          Compare different crops to make informed decisions for your farm
        </p>

        {/* Crop Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select First Crop
            </label>
            <select
              value={crop1}
              onChange={(e) => setCrop1(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {crops.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Second Crop
            </label>
            <select
              value={crop2}
              onChange={(e) => setCrop2(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {crops.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleCompare}
          disabled={crop1 === crop2}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Compare Crops
        </button>
      </div>

      {/* Comparison Results */}
      {showComparison && (
        <div className="space-y-6">
          {/* Comparison Overview */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {crop1} vs {crop2} Comparison
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                <h3 className="text-lg font-bold text-green-700">{crop1}</h3>
                <div className="mt-2 text-sm text-green-600">
                  Short-term crop
                </div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <h3 className="text-lg font-bold text-blue-700">{crop2}</h3>
                <div className="mt-2 text-sm text-blue-600">
                  Long-term crop
                </div>
              </div>
            </div>

            {/* Comparison Metrics */}
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="text-green-500" size={20} />
                  <h4 className="font-semibold">Profitability</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  {language === 'en' ? comparisonData.profitability : comparisonData.profitabilityMl}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="text-blue-500" size={20} />
                  <h4 className="font-semibold">Market Demand</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  {language === 'en' ? comparisonData.demand : comparisonData.demandMl}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="text-purple-500" size={20} />
                  <h4 className="font-semibold">Pest Resistance</h4>
                </div>
                <p className="text-gray-700 text-sm">
                  {language === 'en' ? comparisonData.pestResistance : comparisonData.pestResistanceMl}
                </p>
              </div>
            </div>

            {/* Recommendation */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <h4 className="font-semibold text-green-800 mb-2">🎯 Recommendation</h4>
              <p className="text-green-700 text-sm">
                {language === 'en' ? comparisonData.recommendation : comparisonData.recommendationMl}
              </p>
            </div>
          </div>

          {/* Detailed Comparison Table */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Detailed Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left font-medium text-gray-700">Factor</th>
                    <th className="p-3 text-center font-medium text-gray-700">{crop1}</th>
                    <th className="p-3 text-center font-medium text-gray-700">{crop2}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-3 font-medium">Initial Investment</td>
                    <td className="p-3 text-center">₹15,000/acre</td>
                    <td className="p-3 text-center">₹25,000/acre</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Harvest Period</td>
                    <td className="p-3 text-center">3-4 months</td>
                    <td className="p-3 text-center">6-7 years to mature</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Annual Income</td>
                    <td className="p-3 text-center">₹40,000/acre</td>
                    <td className="p-3 text-center">₹80,000/acre</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Water Requirement</td>
                    <td className="p-3 text-center">High</td>
                    <td className="p-3 text-center">Medium</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Labor Requirement</td>
                    <td className="p-3 text-center">High</td>
                    <td className="p-3 text-center">Low</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Market Risk</td>
                    <td className="p-3 text-center">Medium</td>
                    <td className="p-3 text-center">Low</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Growth Timeline */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Growth Timeline</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">{crop1} (Rice)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Planting to Flowering:</span>
                    <span className="font-medium">60-70 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flowering to Harvest:</span>
                    <span className="font-medium">30-40 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Crop Duration:</span>
                    <span className="font-medium">90-110 days</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">{crop2} (Coconut)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Planting to First Harvest:</span>
                    <span className="font-medium">6-7 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Peak Production Period:</span>
                    <span className="font-medium">15-80 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Harvest Frequency:</span>
                    <span className="font-medium">Every 45 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropComparison;