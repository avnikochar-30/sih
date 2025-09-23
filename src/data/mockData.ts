export const farmerProfile = {
  name: 'Ravi Kumar',
  location: 'Thrissur, Kerala',
  landSize: 2.5,
  primaryCrop: 'Rice',
  soilType: 'Clay Loam',
  irrigationType: 'Canal Irrigation',
  phone: '+91 9876543210',
  experience: 15
};

export const weatherData = {
  current: {
    temperature: 28,
    humidity: 75,
    rainfall: 0,
    condition: 'Partly Cloudy',
    windSpeed: 12
  },
  forecast: [
    { day: 'Today', temp: 28, condition: 'Partly Cloudy', rainfall: 0 },
    { day: 'Tomorrow', temp: 30, condition: 'Sunny', rainfall: 0 },
    { day: 'Wed', temp: 26, condition: 'Rainy', rainfall: 15 },
    { day: 'Thu', temp: 27, condition: 'Cloudy', rainfall: 5 },
    { day: 'Fri', temp: 29, condition: 'Sunny', rainfall: 0 },
    { day: 'Sat', temp: 31, condition: 'Hot', rainfall: 0 },
    { day: 'Sun', temp: 28, condition: 'Partly Cloudy', rainfall: 2 }
  ]
};

export const marketPrices = [
  { crop: 'Rice', currentPrice: 2150, change: '+50', changePercent: '+2.4%', market: 'Thrissur Mandi' },
  { crop: 'Coconut', currentPrice: 25, change: '-2', changePercent: '-7.4%', market: 'Kochi Market' },
  { crop: 'Pepper', currentPrice: 580, change: '+30', changePercent: '+5.5%', market: 'Munnar Spice Market' },
  { crop: 'Cardamom', currentPrice: 1200, change: '+100', changePercent: '+9.1%', market: 'Idukki Spice Market' },
  { crop: 'Banana', currentPrice: 35, change: '+5', changePercent: '+16.7%', market: 'Palakkad Market' }
];

export const govSchemes = [
  {
    id: 1,
    title: 'PM-KISAN Scheme',
    titleMl: 'പ്രധാനമന്ത്രി കിസാൻ സമ്മാൻ നിധി',
    description: 'Direct income support of ₹6000 per year to farmer families',
    descriptionMl: 'കർഷക കുടുംബങ്ങൾക്ക് വർഷത്തിൽ ₹6000 നേരിട്ടുള്ള വരുമാന സഹായം',
    eligibility: 'All landholding farmer families',
    eligibilityMl: 'എല്ലാ ഭൂമിയുള്ള കർഷക കുടുംബങ്ങൾ',
    benefits: '₹2000 every 4 months',
    benefitsMl: 'ഓരോ 4 മാസത്തിലും ₹2000',
    link: 'https://pmkisan.gov.in'
  },
  {
    id: 2,
    title: 'Soil Health Card Scheme',
    titleMl: 'മണ്ണിന്റെ ആരോഗ്യ കാർഡ് പദ്ധതി',
    description: 'Free soil testing and nutrient management advice',
    descriptionMl: 'സൗജന്യ മണ്ണ് പരിശോധനയും പോഷക പദാർത്ഥ പരിപാലന ഉപദേശവും',
    eligibility: 'All farmers with agricultural land',
    eligibilityMl: 'കൃഷിസ്ഥലമുള്ള എല്ലാ കർഷകർ',
    benefits: 'Free soil analysis and crop recommendations',
    benefitsMl: 'സൗജന്യ മണ്ണ് വിശകലനവും വിള ശുപാർശകളും',
    link: 'https://soilhealth.dac.gov.in'
  }
];

export const activities = [
  {
    id: 1,
    date: '2024-01-15',
    activity: 'Watering',
    activityMl: 'നനയ്ക്കൽ',
    crop: 'Rice',
    notes: 'Irrigated the main field for 2 hours',
    notesMl: 'പ്രധാന വയലിൽ 2 മണിക്കൂർ നനച്ചു'
  },
  {
    id: 2,
    date: '2024-01-14',
    activity: 'Fertilizer Application',
    activityMl: 'വളപ്രയോഗം',
    crop: 'Rice',
    notes: 'Applied NPK fertilizer - 50kg',
    notesMl: 'NPK വളം പ്രയോഗിച്ചു - 50 കിലോ'
  },
  {
    id: 3,
    date: '2024-01-13',
    activity: 'Pest Control',
    activityMl: 'കീട നിയന്ത്രണം',
    crop: 'Rice',
    notes: 'Sprayed organic pesticide',
    notesMl: 'ജൈവ കീടനാശിനി തളിച്ചു'
  }
];

export const diseases = [
  {
    id: 1,
    name: 'Rice Blast',
    nameMl: 'നെല്ലിന്റെ ബ്ലാസ്റ്റ് രോഗം',
    severity: 'Moderate',
    severityMl: 'മധ്യമം',
    symptoms: 'Oval to spindle-shaped lesions on leaves',
    symptomsMl: 'ഇലകളിൽ ഓവൽ മുതൽ സ്പിൻഡിൽ ആകൃതിയിലുള്ള മുറിവുകൾ',
    remedies: [
      'Apply Tricyclazole fungicide',
      'Maintain proper field drainage',
      'Use resistant varieties'
    ],
    remediesMl: [
      'ട്രൈസൈക്ലാസോൾ ഫംഗിസൈഡ് പ്രയോഗിക്കുക',
      'ശരിയായ വയൽ ഡ്രൈനേജ് നിലനിർത്തുക',
      'പ്രതിരോധശേഷിയുള്ള ഇനങ്ങൾ ഉപയോഗിക്കുക'
    ]
  }
];

export const chatHistory = [
  {
    id: 1,
    message: 'When should I plant rice?',
    messageMl: 'എപ്പോഴാണ് നെല്ല് നടേണ്ടത്?',
    response: 'For Kerala, the best time to plant rice is during monsoon season (June-July) for Kharif crop.',
    responseMl: 'കേരളത്തിൽ, ഖരീഫ് വിളയ്ക്ക് മൺസൂൺ കാലത്ത് (ജൂൺ-ജൂലൈ) നെല്ല് നടുന്നതാണ് നല്ലത്.',
    timestamp: '2024-01-15 10:30'
  },
  {
    id: 2,
    message: 'What fertilizer should I use for coconut?',
    messageMl: 'തേങ്ങയ്ക്ക് എന്ത് വളം ഉപയോഗിക്കണം?',
    response: 'For coconut trees, use NPK (16:16:16) - 1.3kg per tree annually, applied in 2-3 splits.',
    responseMl: 'തേങ്ങാ മരങ്ങൾക്ക്, NPK (16:16:16) - ഓരോ മരത്തിനും വർഷത്തിൽ 1.3 കിലോ, 2-3 തവണയായി പ്രയോഗിക്കുക.',
    timestamp: '2024-01-14 15:45'
  }
];

export const cropComparisons = [
  {
    crop1: 'Rice',
    crop2: 'Coconut',
    profitability: 'Coconut has higher long-term profitability',
    profitabilityMl: 'തേങ്ങയ്ക്ക് ദീർഘകാല ലാഭക്ഷമത കൂടുതലാണ്',
    demand: 'Both have stable market demand',
    demandMl: 'രണ്ടിനും സ്ഥിരമായ മാർക്കറ്റ് ഡിമാൻഡ് ഉണ്ട്',
    pestResistance: 'Rice requires more pest management',
    pestResistanceMl: 'നെല്ലിന് കൂടുതൽ കീട പരിപാലനം ആവശ്യമാണ്',
    recommendation: 'Coconut for long-term income, Rice for regular income',
    recommendationMl: 'ദീർഘകാല വരുമാനത്തിന് തേങ്ങ, സാധാരണ വരുമാനത്തിന് നെല്ല്'
  }
];