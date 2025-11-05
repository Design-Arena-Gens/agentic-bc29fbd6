'use client';

import { Apple } from 'lucide-react';
import { useStore } from '@/lib/store';
import { format, isToday } from 'date-fns';

export default function CalorieTracker() {
  const meals = useStore((state) => state.meals);
  const todayMeals = meals.filter((m) => isToday(new Date(m.timestamp)));
  const totalCalories = todayMeals.reduce((sum, m) => sum + m.calories, 0);
  const targetCalories = 2000;
  const progress = Math.min((totalCalories / targetCalories) * 100, 100);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 gradient-blue rounded-xl">
          <Apple className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Calories</h2>
      </div>
      <div className="text-center py-4">
        <div className="text-4xl font-bold text-gray-800">
          {totalCalories}
          <span className="text-xl text-gray-500">/{targetCalories}</span>
        </div>
        <div className="text-gray-600">kcal consumed</div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="gradient-blue h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
        <div>
          <div className="font-semibold text-gray-800">
            {todayMeals.reduce((sum, m) => sum + m.protein, 0)}g
          </div>
          <div className="text-gray-600">Protein</div>
        </div>
        <div>
          <div className="font-semibold text-gray-800">
            {todayMeals.reduce((sum, m) => sum + m.carbs, 0)}g
          </div>
          <div className="text-gray-600">Carbs</div>
        </div>
        <div>
          <div className="font-semibold text-gray-800">
            {todayMeals.reduce((sum, m) => sum + m.fats, 0)}g
          </div>
          <div className="text-gray-600">Fats</div>
        </div>
      </div>
    </div>
  );
}
