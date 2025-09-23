import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'ml';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    profile: 'Profile',
    chat: 'Chat',
    activities: 'Activities',
    advisory: 'Advisory',
    disease: 'Disease Detection',
    schemes: 'Gov Schemes',
    market: 'Market Prices',
    weather: 'Weather',
    comparison: 'Crop Compare',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    upload: 'Upload',
    search: 'Search',
    filter: 'Filter',
    today: 'Today',
    yesterday: 'Yesterday',
    thisWeek: 'This Week',
    
    // Dashboard
    welcomeFarmer: 'Welcome, Farmer!',
    todaysWeather: "Today's Weather",
    quickActions: 'Quick Actions',
    recentActivities: 'Recent Activities',
    marketAlerts: 'Market Alerts',
    
    // Profile
    farmerProfile: 'Farmer Profile',
    name: 'Name',
    location: 'Location',
    landSize: 'Land Size (acres)',
    primaryCrop: 'Primary Crop',
    soilType: 'Soil Type',
    irrigationType: 'Irrigation Type',
    
    // Weather
    weatherForecast: 'Weather Forecast',
    temperature: 'Temperature',
    humidity: 'Humidity',
    rainfall: 'Rainfall',
    
    // Disease Detection
    diseaseDetection: 'Disease Detection',
    uploadPlantPhoto: 'Upload Plant Photo',
    analyzeImage: 'Analyze Image',
    diseaseFound: 'Disease Detected',
    remedies: 'Recommended Remedies',
    
    // Market
    marketPrices: 'Market Prices',
    currentPrice: 'Current Price',
    priceChange: 'Price Change',
    nearestMarket: 'Nearest Market',
    
    // Schemes
    govSchemes: 'Government Schemes',
    eligibility: 'Eligibility',
    benefits: 'Benefits',
    applyNow: 'Apply Now',
    readMore: 'Read More',
  },
  ml: {
    // Navigation (Malayalam)
    dashboard: 'ഡാഷ്ബോർഡ്',
    profile: 'പ്രൊഫൈൽ',
    chat: 'ചാറ്റ്',
    activities: 'പ്രവർത്തനങ്ങൾ',
    advisory: 'ഉപദേശം',
    disease: 'രോഗനിർണയം',
    schemes: 'സർക്കാർ പദ്ധതികൾ',
    market: 'മാർക്കറ്റ് വില',
    weather: 'കാലാവസ്ഥ',
    comparison: 'വിള താരതമ്യം',
    
    // Common (Malayalam)
    save: 'സേവ് ചെയ്യുക',
    cancel: 'റദ്ദാക്കുക',
    submit: 'സമർപ്പിക്കുക',
    upload: 'അപ്‌ലോഡ് ചെയ്യുക',
    search: 'തിരയുക',
    filter: 'ഫിൽട്ടർ',
    today: 'ഇന്ന്',
    yesterday: 'ഇന്നലെ',
    thisWeek: 'ഈ ആഴ്ച',
    
    // Dashboard (Malayalam)
    welcomeFarmer: 'സ്വാഗതം, കർഷകരേ!',
    todaysWeather: 'ഇന്നത്തെ കാലാവസ്ഥ',
    quickActions: 'പെട്ടെന്നുള്ള പ്രവർത്തനങ്ങൾ',
    recentActivities: 'സമീപകാല പ്രവർത്തനങ്ങൾ',
    marketAlerts: 'മാർക്കറ്റ് അലേർട്ടുകൾ',
    
    // Profile (Malayalam)
    farmerProfile: 'കർഷക പ്രൊഫൈൽ',
    name: 'പേര്',
    location: 'സ്ഥലം',
    landSize: 'സ്ഥലത്തിന്റെ വലുപ്പം (ഏക്കർ)',
    primaryCrop: 'പ്രധാന വിള',
    soilType: 'മണ്ണിന്റെ തരം',
    irrigationType: 'ജലസേചന രീതി',
    
    // Weather (Malayalam)
    weatherForecast: 'കാലാവസ്ഥ പ്രവചനം',
    temperature: 'താപനില',
    humidity: 'ഈർപ്പം',
    rainfall: 'മഴ',
    
    // Disease Detection (Malayalam)
    diseaseDetection: 'രോഗനിർണയം',
    uploadPlantPhoto: 'ചെടിയുടെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക',
    analyzeImage: 'ചിത്രം വിശകലനം ചെയ്യുക',
    diseaseFound: 'രോഗം കണ്ടെത്തി',
    remedies: 'ശുപാർശ ചെയ്യുന്ന പ്രതിവിധികൾ',
    
    // Market (Malayalam)
    marketPrices: 'മാർക്കറ്റ് വിലകൾ',
    currentPrice: 'നിലവിലെ വില',
    priceChange: 'വില മാറ്റം',
    nearestMarket: 'അടുത്തുള്ള മാർക്കറ്റ്',
    
    // Schemes (Malayalam)
    govSchemes: 'സർക്കാർ പദ്ധതികൾ',
    eligibility: 'യോഗ്യത',
    benefits: 'ആനുകൂല്യങ്ങൾ',
    applyNow: 'ഇപ്പോൾ അപേക്ഷിക്കുക',
    readMore: 'കൂടുതൽ വായിക്കുക',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ml'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ml' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};