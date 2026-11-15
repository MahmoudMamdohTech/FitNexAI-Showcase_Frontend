// FitNex AI — Standalone Showcase Dashboard Service (100% Client-Side)
import { generateNutritionPlan } from '../utils/planUtils';

export const dashboardService = {
  async getDashboardStats() {
    let plan = null;
    const raw = localStorage.getItem('fitnex_user');
    let user = raw ? JSON.parse(raw) : null;

    if (user && user.nutritionPlan) {
      plan = user.nutritionPlan;
    } else {
      // Auto-generate fallback nutrition plan if user hasn't set one yet
      plan = generateNutritionPlan({
        gender: user?.gender === 'female' ? 'Female' : 'Male',
        weight: user?.weight || 75,
        height: user?.height || 178,
        age: user?.age || 25,
        activity_level: 2,
        goal: 1,
      });

      if (user) {
        user.nutritionPlan = plan;
        localStorage.setItem('fitnex_user', JSON.stringify(user));
      }
    }

    return {
      dailyCalories: plan.dailyCalories ?? 2450,
      dailyProtein: plan.dailyProtein ?? 184,
      dailyCarbs: plan.dailyCarbs ?? 245,
      dailyFat: plan.dailyFat ?? 82,
      breakfast: plan.breakfast,
      lunch: plan.lunch,
      dinner: plan.dinner,
      snack: plan.snack,
    };
  },

  async swapMeal(mealType) {
    const raw = localStorage.getItem('fitnex_user');
    if (!raw) return { success: true };
    const user = JSON.parse(raw);
    const plan = user.nutritionPlan;

    if (plan && plan[mealType] && plan[mealType].options?.length > 1) {
      const current = plan[mealType].currentIndex || 0;
      plan[mealType].currentIndex = (current + 1) % plan[mealType].options.length;
      localStorage.setItem('fitnex_user', JSON.stringify(user));
    }
    return { success: true };
  },

  async savePlan() {
    return { success: true };
  },
};

export default dashboardService;
