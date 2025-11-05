'use client';

import { useState } from 'react';
import { Plus, Camera, Edit, Trash2 } from 'lucide-react';
import { useStore } from '@/lib/store';
import { format } from 'date-fns';

export default function NutritionTracker() {
  const meals = useStore((state) => state.meals);
  const addMeal = useStore((state) => state.addMeal);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [newMeal, setNewMeal] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    notes: '',
    recipe: '',
  });

  const handleAdd = () => {
    if (newMeal.name && newMeal.calories) {
      addMeal({
        id: Date.now().toString(),
        name: newMeal.name,
        calories: parseInt(newMeal.calories),
        protein: parseInt(newMeal.protein) || 0,
        carbs: parseInt(newMeal.carbs) || 0,
        fats: parseInt(newMeal.fats) || 0,
        timestamp: new Date(),
        notes: newMeal.notes,
        recipe: newMeal.recipe,
      });
      setNewMeal({ name: '', calories: '', protein: '', carbs: '', fats: '', notes: '', recipe: '' });
      setShowAddForm(false);
    }
  };

  const selectedMealData = meals.find((m) => m.id === selectedMeal);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Nutrition Tracker</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Log Meal
          </button>
        </div>

        {showAddForm && (
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-4">Log New Meal</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Meal name"
                value={newMeal.name}
                onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Calories"
                  value={newMeal.calories}
                  onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Protein (g)"
                  value={newMeal.protein}
                  onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Carbs (g)"
                  value={newMeal.carbs}
                  onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Fats (g)"
                  value={newMeal.fats}
                  onChange={(e) => setNewMeal({ ...newMeal, fats: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <textarea
                placeholder="Notes (optional)"
                value={newMeal.notes}
                onChange={(e) => setNewMeal({ ...newMeal, notes: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                rows={2}
              />
              <textarea
                placeholder="Recipe (optional)"
                value={newMeal.recipe}
                onChange={(e) => setNewMeal({ ...newMeal, recipe: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className="flex-1 gradient-bg text-white py-2 rounded-lg font-semibold hover:opacity-90"
                >
                  Add Meal
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

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Meal Timeline</h3>
          {meals.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Camera className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No meals logged yet. Start tracking your nutrition!</p>
            </div>
          ) : (
            [...meals].reverse().map((meal) => (
              <div
                key={meal.id}
                className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all cursor-pointer"
                onClick={() => setSelectedMeal(meal.id === selectedMeal ? null : meal.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">{meal.name}</h4>
                    <p className="text-sm text-gray-500">
                      {format(new Date(meal.timestamp), 'MMM dd, yyyy - hh:mm a')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">{meal.calories}</div>
                    <div className="text-sm text-gray-500">kcal</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-xl font-bold text-blue-700">{meal.protein}g</div>
                    <div className="text-xs text-blue-600">Protein</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-xl font-bold text-green-700">{meal.carbs}g</div>
                    <div className="text-xs text-green-600">Carbs</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3">
                    <div className="text-xl font-bold text-orange-700">{meal.fats}g</div>
                    <div className="text-xs text-orange-600">Fats</div>
                  </div>
                </div>
                {selectedMeal === meal.id && (meal.notes || meal.recipe) && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    {meal.notes && (
                      <div className="mb-3">
                        <div className="text-sm font-semibold text-gray-700 mb-1">Notes:</div>
                        <div className="text-gray-600">{meal.notes}</div>
                      </div>
                    )}
                    {meal.recipe && (
                      <div>
                        <div className="text-sm font-semibold text-gray-700 mb-1">Recipe:</div>
                        <div className="text-gray-600 whitespace-pre-line">{meal.recipe}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
