// FitNex AI — Standalone Showcase Auth Service (100% Client-Side)
import { generateNutritionPlan } from '../utils/planUtils';

const DEMO_USER = {
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
  is_verified: true,
  vegetarian: false,
  vegan: false,
};

// Seed initial sample workouts if none exist
export const seedSampleData = () => {
  if (!localStorage.getItem('fitnex_workouts')) {
    const samples = [
      { id: 101, exercise: 'Squat', reps: 15, score: 96.5, duration_seconds: 48, calories_burned: 52, created_at: new Date(Date.now() - 86400000 * 2).toISOString() },
      { id: 102, exercise: 'Bicep Curl', reps: 20, score: 98.0, duration_seconds: 40, calories_burned: 70, created_at: new Date(Date.now() - 86400000).toISOString() },
      { id: 103, exercise: 'Push-Up', reps: 25, score: 94.0, duration_seconds: 55, calories_burned: 87, created_at: new Date().toISOString() },
    ];
    localStorage.setItem('fitnex_workouts', JSON.stringify(samples));
  }
};

export const authService = {
  async login(email, password) {
    seedSampleData();
    // Check if user was registered locally
    const users = JSON.parse(localStorage.getItem('fitnex_registered_users') || '[]');
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      // Default to demo user if not found
      user = {
        ...DEMO_USER,
        email,
        full_name: email.split('@')[0].replace(/[._-]/g, ' ') || 'Demo User',
      };
    }

    if (!user.nutritionPlan) {
      user.nutritionPlan = generateNutritionPlan({
        gender: user.gender === 'female' ? 'Female' : 'Male',
        weight: user.weight || 75,
        height: user.height || 178,
        age: user.age || 25,
        activity_level: 2,
        goal: 1,
      });
    }

    const token = 'showcase-jwt-token-' + Date.now();
    localStorage.setItem('fitnex_token', token);
    localStorage.setItem('fitnex_user', JSON.stringify(user));
    return user;
  },

  async quickDemoLogin() {
    seedSampleData();
    const user = {
      ...DEMO_USER,
      nutritionPlan: generateNutritionPlan({
        gender: 'Male',
        weight: 78,
        height: 182,
        age: 26,
        activity_level: 3,
        goal: 1,
      }),
    };
    const token = 'showcase-jwt-token-' + Date.now();
    localStorage.setItem('fitnex_token', token);
    localStorage.setItem('fitnex_user', JSON.stringify(user));
    return user;
  },

  async signup(name, email, password) {
    const newUser = {
      id: Date.now(),
      full_name: name || 'New Athlete',
      email,
      is_setup_completed: false,
      is_verified: false,
      created_at: new Date().toISOString(),
    };

    const users = JSON.parse(localStorage.getItem('fitnex_registered_users') || '[]');
    users.push(newUser);
    localStorage.setItem('fitnex_registered_users', JSON.stringify(users));

    sessionStorage.setItem('pending_verify_email', email);
    sessionStorage.setItem('demo_otp_hint', '123456');

    return { status: 'success', user_id: newUser.id, email };
  },

  async verifyOTP(email, code) {
    seedSampleData();
    // Accept demo OTP '123456' or any valid 6-digit code for smooth showcase testing
    const users = JSON.parse(localStorage.getItem('fitnex_registered_users') || '[]');
    let user = users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());

    if (!user) {
      user = {
        ...DEMO_USER,
        email: email || 'athlete@fitnex.ai',
        is_setup_completed: false,
      };
    }

    user.is_verified = true;
    const token = 'showcase-jwt-token-' + Date.now();
    localStorage.setItem('fitnex_token', token);
    localStorage.setItem('fitnex_user', JSON.stringify(user));
    sessionStorage.removeItem('pending_verify_email');
    return user;
  },

  async resendOTP(email) {
    sessionStorage.setItem('demo_otp_hint', '123456');
    return { status: 'success', message: 'Demo verification code is 123456' };
  },

  async verifyToken() {
    const token = localStorage.getItem('fitnex_token');
    const raw = localStorage.getItem('fitnex_user');
    if (!token || !raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      localStorage.removeItem('fitnex_token');
      localStorage.removeItem('fitnex_user');
      return null;
    }
  },

  async logout() {
    localStorage.removeItem('fitnex_user');
    localStorage.removeItem('fitnex_token');
  },

  async forgotPassword(email) {
    return { status: 'success', message: 'Reset token simulated' };
  },

  async resetPassword(email, token, new_password) {
    return { status: 'success', message: 'Password reset successful' };
  },

  getCurrentUser() {
    const raw = localStorage.getItem('fitnex_user');
    return raw ? JSON.parse(raw) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('fitnex_token');
  },
};

export default authService;
