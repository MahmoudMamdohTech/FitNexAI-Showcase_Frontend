// FitNex AI — Standalone Showcase Nutrition Service (100% Client-Side)
import { generateNutritionPlan, calculateBMR, calculateTDEE, adjustCaloriesForGoal } from '../utils/planUtils';

// 24 traditional Egyptian & athlete-friendly food options for preferences chips
const FOOD_OPTIONS = [
  "Ful Medames", "Baladi Bread", "Taameya (Egyptian Falafel)", "Boiled Eggs", "Koshari",
  "Molokhia with Rice", "Grilled Chicken Breast", "Shish Tawook", "Baked Sweet Potato",
  "Grilled Tilapia Fish", "Egyptian Mahshi (Stuffed Veggies)", "Lentil Soup (Shorbet Ads)",
  "Greek Yogurt with Honey", "Arayes (Spiced Minced Meat in Bread)", "Hawawshi", "Oatmeal with Dates",
  "Tuna Salad with Olive Oil", "Quinoa Salad", "Beef Kofta", "Mixed Raw Nuts", "Cottage Cheese (Gibna Quraish)",
  "Fresh Fruit Salad", "Rice Pudding (Roz Bel Laban)", "Roasted Chickpeas"
];

export const nutritionService = {
  async generateMealPlan(profile = {}) {
    return generateNutritionPlan({
      gender: (profile.gender || 'male').toLowerCase() === 'female' ? 'Female' : 'Male',
      weight: Number(profile.weight_kg) || 75,
      height: Number(profile.height_cm) || 178,
      age: Number(profile.age) || 25,
      activity_level: 2,
      goal: profile.goal === 'bulk' ? 1 : profile.goal === 'cut' ? 2 : 3,
    });
  },

  async calculateMacros(profile = {}) {
    const gender = (profile.gender || 'male').toLowerCase() === 'female' ? 'Female' : 'Male';
    const weight = Number(profile.weight_kg) || 75;
    const height = Number(profile.height_cm) || 178;
    const age = Number(profile.age) || 25;

    const bmr = calculateBMR(gender, weight, height, age);
    const tdee = calculateTDEE(bmr, 2);
    const calories = adjustCaloriesForGoal(tdee, profile.goal === 'bulk' ? 1 : profile.goal === 'cut' ? 2 : 3);

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      daily_calories: calories,
      protein_g: Math.round((calories * 0.3) / 4),
      carbs_g: Math.round((calories * 0.4) / 4),
      fat_g: Math.round((calories * 0.3) / 9),
    };
  },

  async getFoodOptions() {
    return FOOD_OPTIONS;
  },
};

export default nutritionService;
