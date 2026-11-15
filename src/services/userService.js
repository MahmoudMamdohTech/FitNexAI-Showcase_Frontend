// FitNex AI — Standalone Showcase User Service (100% Client-Side)
import { generateNutritionPlan, calculateBMR, calculateTDEE, adjustCaloriesForGoal } from '../utils/planUtils';

export const userService = {
  async getProfile() {
    const raw = localStorage.getItem('fitnex_user');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.warn(e);
      }
    }
    return {
      id: 1,
      full_name: 'Alex Morgan',
      email: 'alex@fitnex.ai',
      goal: 'bulk',
      weight: 78,
      height: 182,
      age: 26,
      gender: 'male',
      activity_level: 'active',
      is_setup_completed: true,
      vegetarian: false,
      vegan: false,
    };
  },

  async savePreferences(preferences) {
    const activityMap = ['sedentary', 'light', 'moderate', 'active', 'very_active'];
    const goalMap     = { 1: 'bulk', 2: 'cut', 3: 'maintain' };

    const gender        = (preferences.gender || 'male').toLowerCase();
    const goal          = goalMap[preferences.goal] ?? 'maintain';
    const activityLevel = activityMap[preferences.activity_level] ?? 'moderate';
    const isVegetarian  = preferences.diet === 1;
    const isVegan       = preferences.diet === 2;

    // Generate nutrition plan locally using client-side algorithms
    const plan = generateNutritionPlan({
      gender: gender === 'female' ? 'Female' : 'Male',
      weight: Number(preferences.weight) || 75,
      height: Number(preferences.height) || 178,
      age: Number(preferences.age) || 25,
      activity_level: Number(preferences.activity_level) || 2,
      goal: Number(preferences.goal) || 1,
    });

    const raw = localStorage.getItem('fitnex_user');
    const existing = raw ? JSON.parse(raw) : {};

    const updatedUser = {
      ...existing,
      age: preferences.age,
      gender,
      weight: preferences.weight,
      height: preferences.height,
      activity_level: activityLevel,
      goal,
      vegetarian: isVegetarian,
      vegan: isVegan,
      preferences,
      hasPreferences: true,
      is_setup_completed: true,
      nutritionPlan: plan,
    };

    localStorage.setItem('fitnex_user', JSON.stringify(updatedUser));
    return { success: true, plan };
  },
};

export default userService;
