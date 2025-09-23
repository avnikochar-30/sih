import React, { useState } from 'react';
import { Camera, Upload, AlertTriangle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { diseases } from '../data/mockData';

const DiseaseDetection: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<typeof diseases[0] | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysisResult(diseases[0]);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low':
      case 'കുറഞ്ഞത്':
        return 'text-green-600 bg-green-50';
      case 'moderate':
      case 'മധ്യമം':
        return 'text-yellow-600 bg-yellow-50';
      case 'high':
      case 'ഉയർന്നത്':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-4 space-y-6 pb-20 lg:pb-4">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-green-600 mb-2 flex items-center gap-2">
          <Camera size={24} />
          {t('diseaseDetection')}
        </h1>
        <p className="text-gray-600 mb-6">
          Upload a photo of your plant to detect diseases and get treatment recommendations
        </p>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block w-full">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors cursor-pointer">
              {selectedImage ? (
                <div className="space-y-4">
                  <img
                    src={selectedImage}
                    alt="Uploaded plant"
                    className="max-h-64 mx-auto rounded-lg object-cover"
                  />
                  <p className="text-sm text-gray-600">Image uploaded successfully</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="mx-auto text-gray-400" size={48} />
                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      {t('uploadPlantPhoto')}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      JPG, PNG up to 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Analyze Button */}
        {selectedImage && !analysisResult && (
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors font-medium text-lg"
          >
            {isAnalyzing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing...
              </div>
            ) : (
              t('analyzeImage')
            )}
          </button>
        )}
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-red-500" size={24} />
            <h2 className="text-xl font-bold text-red-600">{t('diseaseFound')}</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
              <h3 className="font-semibold text-red-800 mb-2">
                {language === 'en' ? analysisResult.name : analysisResult.nameMl}
              </h3>
              <p className="text-sm text-red-700 mb-2">
                <strong>Symptoms:</strong> {language === 'en' ? analysisResult.symptoms : analysisResult.symptomsMl}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-red-800">Severity:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(analysisResult.severity)}`}>
                  {language === 'en' ? analysisResult.severity : analysisResult.severityMl}
                </span>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <CheckCircle size={18} />
                {t('remedies')}
              </h3>
              <ul className="space-y-2">
                {(language === 'en' ? analysisResult.remedies : analysisResult.remediesMl).map((remedy, index) => (
                  <li key={index} className="text-sm text-green-700 flex items-start gap-2">
                    <span className="text-green-500 font-bold">•</span>
                    <span>{remedy}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button className="py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Contact Expert
            </button>
            <button className="py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              Buy Treatment
            </button>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Photography Tips</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-medium text-blue-800 mb-1">📸 Clear Focus</p>
            <p className="text-blue-700">Ensure the affected area is in focus</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg">
            <p className="font-medium text-yellow-800 mb-1">☀️ Good Light</p>
            <p className="text-yellow-700">Take photos in natural daylight</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-medium text-green-800 mb-1">🔍 Close-up</p>
            <p className="text-green-700">Capture close-up shots of symptoms</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <p className="font-medium text-purple-800 mb-1">📐 Multiple Angles</p>
            <p className="text-purple-700">Take photos from different angles</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;