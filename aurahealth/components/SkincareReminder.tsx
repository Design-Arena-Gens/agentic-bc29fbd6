'use client';

import { useState } from 'react';
import { Sparkles, Plus, Check, Trash2 } from 'lucide-react';
import { useStore } from '@/lib/store';
import { isToday } from 'date-fns';

export default function SkincareReminder({ fullView = false }: { fullView?: boolean }) {
  const skincare = useStore((state) => state.skincare);
  const addSkincareRoutine = useStore((state) => state.addSkincareRoutine);
  const toggleSkincare = useStore((state) => state.toggleSkincare);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRoutine, setNewRoutine] = useState({
    name: '',
    time: 'morning' as 'morning' | 'evening',
    products: '',
  });

  const todayRoutines = skincare.filter((r) => isToday(new Date(r.timestamp)));
  const completedToday = todayRoutines.filter((r) => r.completed).length;

  const handleAdd = () => {
    if (newRoutine.name && newRoutine.products) {
      addSkincareRoutine({
        id: Date.now().toString(),
        name: newRoutine.name,
        time: newRoutine.time,
        products: newRoutine.products.split(',').map((p) => p.trim()),
        completed: false,
        timestamp: new Date(),
      });
      setNewRoutine({ name: '', time: 'morning', products: '' });
      setShowAddForm(false);
    }
  };

  if (fullView) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-4 gradient-purple rounded-xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Skincare Routine</h2>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Routine
          </button>
        </div>

        {showAddForm && (
          <div className="bg-purple-50 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-4">New Routine</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Routine name"
                value={newRoutine.name}
                onChange={(e) => setNewRoutine({ ...newRoutine, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
              />
              <select
                value={newRoutine.time}
                onChange={(e) =>
                  setNewRoutine({ ...newRoutine, time: e.target.value as any })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
              >
                <option value="morning">Morning</option>
                <option value="evening">Evening</option>
              </select>
              <input
                type="text"
                placeholder="Products (comma-separated)"
                value={newRoutine.products}
                onChange={(e) => setNewRoutine({ ...newRoutine, products: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
              />
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

        <div className="space-y-4">
          {todayRoutines.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No routines for today. Add your first one!</p>
            </div>
          ) : (
            todayRoutines.map((routine) => (
              <div
                key={routine.id}
                className={`border-2 rounded-xl p-6 transition-all ${
                  routine.completed
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <button
                        onClick={() => toggleSkincare(routine.id)}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                          routine.completed
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-gray-300 hover:border-purple-500'
                        }`}
                      >
                        {routine.completed && <Check className="w-5 h-5 text-white" />}
                      </button>
                      <div>
                        <h3 className="font-bold text-gray-800">{routine.name}</h3>
                        <span className="text-sm text-gray-500 capitalize">{routine.time}</span>
                      </div>
                    </div>
                    <div className="ml-11 flex flex-wrap gap-2">
                      {routine.products.map((product) => (
                        <span
                          key={product}
                          className="px-3 py-1 bg-white border border-purple-200 rounded-full text-sm text-gray-700"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 gradient-purple rounded-xl">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Skincare</h2>
      </div>
      <div className="text-center py-4">
        <div className="text-4xl font-bold text-gray-800">
          {completedToday}/{todayRoutines.length}
        </div>
        <div className="text-gray-600">Routines Done</div>
      </div>
      {todayRoutines.slice(0, 2).map((routine) => (
        <div
          key={routine.id}
          className={`flex items-center gap-2 p-2 rounded-lg mb-2 ${
            routine.completed ? 'bg-purple-50' : 'bg-gray-50'
          }`}
        >
          <button
            onClick={() => toggleSkincare(routine.id)}
            className={`w-6 h-6 rounded-full border-2 flex-shrink-0 ${
              routine.completed ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
            }`}
          >
            {routine.completed && <Check className="w-4 h-4 text-white" />}
          </button>
          <span className="text-sm text-gray-700 truncate">{routine.name}</span>
        </div>
      ))}
    </div>
  );
}
