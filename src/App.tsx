import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import BottomNavigation from './components/BottomNavigation';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Activities from './pages/Activities';
import Advisory from './pages/Advisory';
import DiseaseDetection from './pages/DiseaseDetection';
import GovernmentSchemes from './pages/GovernmentSchemes';
import MarketPrices from './pages/MarketPrices';
import Weather from './pages/Weather';
import CropComparison from './pages/CropComparison';

function App() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header onMenuClick={() => setIsNavigationOpen(true)} />
          
          <div className="flex">
            <Navigation 
              isOpen={isNavigationOpen} 
              onClose={() => setIsNavigationOpen(false)} 
            />
            
            <main className="flex-1 lg:ml-64">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/advisory" element={<Advisory />} />
                <Route path="/disease" element={<DiseaseDetection />} />
                <Route path="/schemes" element={<GovernmentSchemes />} />
                <Route path="/market" element={<MarketPrices />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/comparison" element={<CropComparison />} />
              </Routes>
            </main>
          </div>
          
          <BottomNavigation />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;