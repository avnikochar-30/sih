import React, { useState } from 'react';
import { User, MapPin, Crop, Droplets } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { farmerProfile } from '../data/mockData';

const Profile: React.FC = () => {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(farmerProfile);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to API
    console.log('Saving profile:', profile);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-4 space-y-6 pb-20 lg:pb-4">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <User className="text-green-600" size={24} />
            {t('farmerProfile')}
          </h1>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            {isEditing ? t('save') : 'Edit'}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('name')}
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                <User size={16} className="text-gray-500" />
                <span>{profile.name}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('location')}
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profile.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                <MapPin size={16} className="text-gray-500" />
                <span>{profile.location}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('landSize')}
            </label>
            {isEditing ? (
              <input
                type="number"
                value={profile.landSize}
                onChange={(e) => handleInputChange('landSize', parseFloat(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg">
                <span>{profile.landSize} acres</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('primaryCrop')}
            </label>
            {isEditing ? (
              <select
                value={profile.primaryCrop}
                onChange={(e) => handleInputChange('primaryCrop', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="Rice">Rice</option>
                <option value="Coconut">Coconut</option>
                <option value="Pepper">Pepper</option>
                <option value="Cardamom">Cardamom</option>
                <option value="Banana">Banana</option>
              </select>
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                <Crop size={16} className="text-gray-500" />
                <span>{profile.primaryCrop}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('soilType')}
            </label>
            {isEditing ? (
              <select
                value={profile.soilType}
                onChange={(e) => handleInputChange('soilType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="Clay Loam">Clay Loam</option>
                <option value="Sandy Loam">Sandy Loam</option>
                <option value="Laterite">Laterite</option>
                <option value="Alluvial">Alluvial</option>
              </select>
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg">
                <span>{profile.soilType}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('irrigationType')}
            </label>
            {isEditing ? (
              <select
                value={profile.irrigationType}
                onChange={(e) => handleInputChange('irrigationType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="Canal Irrigation">Canal Irrigation</option>
                <option value="Well Irrigation">Well Irrigation</option>
                <option value="Drip Irrigation">Drip Irrigation</option>
                <option value="Rain-fed">Rain-fed</option>
              </select>
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                <Droplets size={16} className="text-gray-500" />
                <span>{profile.irrigationType}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Statistics Card */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Farm Statistics</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{profile.experience}</p>
            <p className="text-sm text-green-800">Years Experience</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{profile.landSize}</p>
            <p className="text-sm text-blue-800">Acres Farmed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;