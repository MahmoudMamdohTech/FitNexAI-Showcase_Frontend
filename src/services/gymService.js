// FitNex AI — Standalone Showcase Gym Service (100% Client-Side)

const EXERCISES = [
  { name: 'Squat', muscles: 'Quadriceps, Hamstrings, Glutes' },
  { name: 'Bicep Curl', muscles: 'Biceps Brachii, Brachialis' },
  { name: 'Push-Up', muscles: 'Pectoralis Major, Triceps, Anterior Deltoid' },
  { name: 'Shoulder Press', muscles: 'Deltoids, Triceps, Upper Trapezius' },
];

export const gymService = {
  async listExercises() {
    return EXERCISES;
  },

  async analyzeFrame(sessionId, exercise, frameB64) {
    // Fallback if client-side vision calls this directly
    return {
      session_id: sessionId,
      exercise,
      reps: 0,
      stage: 'up',
      posture_correct: true,
      feedback: 'Good form',
      confidence: 0.95,
      landmarks_detected: true,
      processing_ms: 12,
      landmarks: [],
    };
  },

  async resetSession(sessionId) {
    return { status: 'ok', session_id: sessionId };
  },

  async saveWorkout(exercise, reps, score = 95.0, durationSeconds = 45) {
    const raw = localStorage.getItem('fitnex_workouts');
    const workouts = raw ? JSON.parse(raw) : [];

    const newRecord = {
      id: Date.now(),
      exercise,
      reps: Number(reps) || 0,
      score: Number(score) || 95.0,
      duration_seconds: Number(durationSeconds) || 45,
      calories_burned: Math.round((Number(reps) || 10) * 3.8),
      created_at: new Date().toISOString(),
    };

    workouts.unshift(newRecord);
    localStorage.setItem('fitnex_workouts', JSON.stringify(workouts));
    return newRecord;
  },

  async getWorkoutHistory(limit = 50) {
    const raw = localStorage.getItem('fitnex_workouts');
    let workouts = raw ? JSON.parse(raw) : [];

    if (workouts.length === 0) {
      workouts = [
        { id: 101, exercise: 'Squat', reps: 15, score: 96.5, duration_seconds: 48, calories_burned: 57, created_at: new Date(Date.now() - 86400000 * 2).toISOString() },
        { id: 102, exercise: 'Bicep Curl', reps: 20, score: 98.0, duration_seconds: 40, calories_burned: 76, created_at: new Date(Date.now() - 86400000).toISOString() },
        { id: 103, exercise: 'Push-Up', reps: 25, score: 94.0, duration_seconds: 55, calories_burned: 95, created_at: new Date().toISOString() },
      ];
      localStorage.setItem('fitnex_workouts', JSON.stringify(workouts));
    }

    return workouts.slice(0, limit);
  },
};

export default gymService;
