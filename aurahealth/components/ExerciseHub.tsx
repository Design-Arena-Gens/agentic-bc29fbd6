'use client';

import { useState } from 'react';
import { Dumbbell, Plus, Check, Home, Building, Heart, Wind } from 'lucide-react';
import { useStore } from '@/lib/store';
import { format, isToday, isThisWeek, isThisMonth } from 'date-fns';

export default function ExerciseHub() {
  const exercises = useStore((state) => state.exercises);
  const addExercise = useStore((state) => state.addExercise);
  const toggleExercise = useStore((state) => state.toggleExercise);
  const [activeCategory, setActiveCategory] = useState<'home' | 'gym' | 'cardio' | 'yoga'>('home');
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewPeriod, setViewPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [newExercise, setNewExercise] = useState({
    name: '',
    duration: '',
    calories: '',
  });

  const categories = [
    { id: 'home', label: 'Home Workout', icon: Home, color: 'gradient-blue' },
    { id: 'gym', label: 'Gym', icon: Building, color: 'gradient-green' },
    { id: 'cardio', label: 'Cardio', icon: Heart, color: 'gradient-orange' },
    { id: 'yoga', label: 'Yoga', icon: Wind, color: 'gradient-purple' },
  ] as const;

  const getFilteredExercises = () => {
    return exercises.filter((ex) => {
      const matchesCategory = ex.category === activeCategory;
      const date = new Date(ex.timestamp);
      if (viewPeriod === 'daily') return matchesCategory && isToday(date);
      if (viewPeriod === 'weekly') return matchesCategory && isThisWeek(date);
      if (viewPeriod === 'monthly') return matchesCategory && isThisMonth(date);
      return matchesCategory;
    });
  };

  const handleAdd = () => {
    if (newExercise.name && newExercise.duration) {
      addExercise({
        id: Date.now().toString(),
        name: newExercise.name,
        category: activeCategory,
        duration: parseInt(newExercise.duration),
        calories: parseInt(newExercise.calories) || 0,
        completed: false,
        timestamp: new Date(),
      });
      setNewExercise({ name: '', duration: '', calories: '' });
      setShowAddForm(false);
    }
  };

  const filteredExercises = getFilteredExercises();
  const completed = filteredExercises.filter((ex) => ex.completed).length;
  const totalCalories = filteredExercises.filter((ex) => ex.completed).reduce((sum, ex) => sum + ex.calories, 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Exercise Hub</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Exercise
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? `${cat.color} text-white`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <cat.icon className="w-5 h-5" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Period Toggle */}
        <div className="flex gap-2 mb-6">
          {(['daily', 'weekly', 'monthly'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setViewPeriod(period)}
              className={`px-4 py-2 rounded-lg font-semibold capitalize transition-colors ${
                viewPeriod === period
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-700">{completed}</div>
            <div className="text-blue-600 font-medium">Completed</div>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-700">{filteredExercises.length}</div>
            <div className="text-green-600 font-medium">Total</div>
          </div>
          <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-orange-700">{totalCalories}</div>
            <div className="text-orange-600 font-medium">Calories</div>
          </div>
        </div>

        {/* Add Exercise Form */}
        {showAddForm && (
          <div className="bg-purple-50 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-4">New Exercise</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Exercise name"
                value={newExercise.name}
                onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Duration (minutes)"
                  value={newExercise.duration}
                  onChange={(e) => setNewExercise({ ...newExercise, duration: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="number"
                  placeholder="Calories (optional)"
                  value={newExercise.calories}
                  onChange={(e) => setNewExercise({ ...newExercise, calories: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className="flex-1 gradient-bg text-white py-2 rounded-lg font-semibold hover:opacity-90"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Exercise List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Exercise Checklist</h3>
          {filteredExercises.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Dumbbell className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No exercises for this period. Add your first one!</p>
            </div>
          ) : (
            filteredExercises.map((exercise) => (
              <div
                key={exercise.id}
                className={`border-2 rounded-xl p-6 transition-all ${
                  exercise.completed
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleExercise(exercise.id)}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${
                        exercise.completed
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                    >
                      {exercise.completed && <Check className="w-6 h-6 text-white" />}
                    </button>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{exercise.name}</h4>
                      <p className="text-sm text-gray-500">
                        {exercise.duration} min • {exercise.calories} cal
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(exercise.timestamp), 'MMM dd, hh:mm a')}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
