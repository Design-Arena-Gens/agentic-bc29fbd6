'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Menu, User, Apple, Dumbbell, Timer, Sparkles, Plus } from 'lucide-react';
import ProfileMenu from './ProfileMenu';
import CalorieTracker from './CalorieTracker';
import ExerciseHub from './ExerciseHub';
import NoFapTimer from './NoFapTimer';
import SkincareReminder from './SkincareReminder';
import NutritionTracker from './NutritionTracker';

export default function Dashboard() {
  const user = useStore((state) => state.user);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  if (!user) return null;

  const bmi = (user.weight / ((user.height / 100) ** 2)).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold gradient-bg bg-clip-text text-transparent">
              AuraHealth
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Welcome, {user.name}!</span>
            <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white font-semibold">
              {user.name[0].toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* Profile Menu Overlay */}
      {showProfileMenu && (
        <ProfileMenu onClose={() => setShowProfileMenu(false)} />
      )}

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-[72px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Sparkles },
              { id: 'nutrition', label: 'Nutrition', icon: Apple },
              { id: 'exercise', label: 'Exercise', icon: Dumbbell },
              { id: 'nofap', label: 'NoFap', icon: Timer },
              { id: 'skincare', label: 'Skincare', icon: Sparkles },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                  activeView === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-purple-600'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeView === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Profile Snapshot */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 gradient-bg rounded-xl">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Profile</h2>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Age:</span>
                  <span className="font-semibold">{user.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-semibold">{user.weight} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Height:</span>
                  <span className="font-semibold">{user.height} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">BMI:</span>
                  <span className="font-semibold">{bmi}</span>
                </div>
              </div>
            </div>

            {/* Calorie Tracker */}
            <CalorieTracker />

            {/* Exercise Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 gradient-green rounded-xl">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Exercise</h2>
              </div>
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-gray-800">
                  {useStore.getState().exercises.filter(e => e.completed).length}
                </div>
                <div className="text-gray-600">Completed Today</div>
              </div>
              <button
                onClick={() => setActiveView('exercise')}
                className="w-full mt-4 gradient-green text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                View Details
              </button>
            </div>

            {/* NoFap Timer */}
            <NoFapTimer />

            {/* Skincare Reminder */}
            <SkincareReminder />

            {/* Goals */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold text-gray-800 mb-4">My Goals</h2>
              <div className="space-y-2">
                {user.goals.map((goal) => (
                  <div
                    key={goal}
                    className="px-4 py-2 gradient-purple rounded-lg text-gray-700 font-medium"
                  >
                    {goal}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === 'nutrition' && <NutritionTracker />}
        {activeView === 'exercise' && <ExerciseHub />}
        {activeView === 'nofap' && (
          <div className="max-w-2xl mx-auto">
            <NoFapTimer fullView />
          </div>
        )}
        {activeView === 'skincare' && (
          <div className="max-w-2xl mx-auto">
            <SkincareReminder fullView />
          </div>
        )}
      </main>
    </div>
  );
}
