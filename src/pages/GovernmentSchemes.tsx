import React, { useState } from 'react';
import { FileText, ExternalLink, Filter, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { govSchemes } from '../data/mockData';

const GovernmentSchemes: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedScheme, setExpandedScheme] = useState<number | null>(null);

  const filteredSchemes = govSchemes.filter(scheme =>
    (language === 'en' ? scheme.title : scheme.titleMl)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const toggleExpanded = (schemeId: number) => {
    setExpandedScheme(expandedScheme === schemeId ? null : schemeId);
  };

  return (
    <div className="p-4 space-y-6 pb-20 lg:pb-4">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
          <FileText size={24} />
          {t('govSchemes')}
        </h1>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={`${t('search')} schemes...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Schemes List */}
        <div className="space-y-4">
          {filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-green-700">
                    {language === 'en' ? scheme.title : scheme.titleMl}
                  </h3>
                  <button
                    onClick={() => toggleExpanded(scheme.id)}
                    className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                  >
                    {expandedScheme === scheme.id ? 'Less' : 'More'}
                  </button>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">
                  {language === 'en' ? scheme.description : scheme.descriptionMl}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-blue-800 font-medium text-sm mb-1">{t('eligibility')}</p>
                    <p className="text-blue-700 text-xs">
                      {language === 'en' ? scheme.eligibility : scheme.eligibilityMl}
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-green-800 font-medium text-sm mb-1">{t('benefits')}</p>
                    <p className="text-green-700 text-xs">
                      {language === 'en' ? scheme.benefits : scheme.benefitsMl}
                    </p>
                  </div>
                </div>

                {expandedScheme === scheme.id && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">How to Apply:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 mb-4">
                      <li>Visit your nearest agriculture office</li>
                      <li>Carry required documents (land records, ID proof)</li>
                      <li>Fill the application form</li>
                      <li>Submit with supporting documents</li>
                      <li>Track application status online</li>
                    </ol>
                    
                    <div className="flex flex-col gap-2">
                      <div className="text-xs text-gray-600">
                        <strong>Required Documents:</strong> Aadhaar Card, Land Records, Bank Account Details, Passport Size Photos
                      </div>
                      <div className="text-xs text-gray-600">
                        <strong>Processing Time:</strong> 15-30 working days
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                    {t('applyNow')}
                  </button>
                  <a
                    href={scheme.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium text-center flex items-center justify-center gap-1"
                  >
                    {t('readMore')}
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 gap-3">
          <a
            href="https://pmkisan.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center"
          >
            <p className="text-green-800 font-medium text-sm">PM-KISAN Portal</p>
          </a>
          <a
            href="https://soilhealth.dac.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center"
          >
            <p className="text-blue-800 font-medium text-sm">Soil Health Card</p>
          </a>
          <a
            href="https://www.india.gov.in/topics/agriculture"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-center"
          >
            <p className="text-purple-800 font-medium text-sm">Agriculture Portal</p>
          </a>
          <a
            href="https://mkisan.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-center"
          >
            <p className="text-orange-800 font-medium text-sm">mKisan Portal</p>
          </a>
        </div>
      </div>

      {/* Application Status Tracker */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Track Your Applications</h2>
        <div className="space-y-3">
          <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <p className="text-yellow-800 font-medium text-sm">PM-KISAN Application</p>
            <p className="text-yellow-700 text-xs">Status: Under Review</p>
            <p className="text-yellow-600 text-xs">Applied: Jan 10, 2024</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
            <p className="text-green-800 font-medium text-sm">Soil Health Card</p>
            <p className="text-green-700 text-xs">Status: Approved</p>
            <p className="text-green-600 text-xs">Card Ready for Collection</p>
          </div>
        </div>
        <button className="w-full mt-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
          Track New Application
        </button>
      </div>
    </div>
  );
};

export default GovernmentSchemes;