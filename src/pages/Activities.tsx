import React, { useState } from 'react';
import { Plus, Calendar, Crop } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { activities as initialActivities } from '../data/mockData';

const Activities: React.FC = () => {
  const { t, language } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [activities, setActivities] = useState(initialActivities); // 👈 keep activities in state
  const [newActivity, setNewActivity] = useState({
    activity: '',
    crop: 'Rice',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleAddActivity = () => {
    if (!newActivity.activity) return;

    const newEntry = {
      id: Date.now(),
      activity: newActivity.activity,
      activityMl: newActivity.activity, // later you can add Malayalam version
      crop: newActivity.crop,
      notes: newActivity.notes,
      notesMl: newActivity.notes, // later you can add Malayalam version
      date: newActivity.date
    };

    // Update local activities state
    setActivities(prev => [newEntry, ...prev]);

    // Reset form
    setShowAddForm(false);
    setNewActivity({
      activity: '',
      crop: 'Rice',
      notes: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const activityTypes = [
    'Watering', 'Fertilizer Application', 'Pest Control', 'Weeding', 'Harvesting', 'Planting'
  ];

  return (
    <div className="p-4 space-y-6 pb-20 lg:pb-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-600">{t('activities')}</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Add Activity Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl p-6 shadow-lg border">
          <h2 className="text-lg font-semibold mb-4">Add New Activity</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Activity Type
              </label>
              <select
                value={newActivity.activity}
                onChange={(e) => setNewActivity(prev => ({ ...prev, activity: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select Activity</option>
                {activityTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Crop
              </label>
              <select
                value={newActivity.crop}
                onChange={(e) => setNewActivity(prev => ({ ...prev, crop: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="Rice">Rice</option>
                <option value="Coconut">Coconut</option>
                <option value="Pepper">Pepper</option>
                <option value="Banana">Banana</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={newActivity.date}
                onChange={(e) => setNewActivity(prev => ({ ...prev, date: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={newActivity.notes}
                onChange={(e) => setNewActivity(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Add any additional notes..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-24 resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddActivity}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                {t('save')}
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activities Timeline */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="border-l-4 border-green-500 pl-4 py-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Crop className="text-green-500" size={16} />
                    <span className="font-medium">
                      {language === 'en' ? activity.activity : activity.activityMl}
                    </span>
                    <span className="text-sm text-gray-500">• {activity.crop}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {language === 'en' ? activity.notes : activity.notesMl}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={12} />
                    <span>{activity.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {activities.length}
          </div>
          <div className="text-sm text-gray-600">Total Activities</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {new Set(activities.map(a => a.date.split('-')[1])).size}
          </div>
          <div className="text-sm text-gray-600">Active Months</div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
