'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { X, Save } from 'lucide-react';

export default function ProfileMenu({ onClose }: { onClose: () => void }) {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age.toString() || '',
    weight: user?.weight.toString() || '',
    height: user?.height.toString() || '',
  });

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        name: formData.name,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
      });
      setEditing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      <div className="w-80 bg-white h-full shadow-2xl overflow-y-auto">
        <div className="gradient-bg p-6 text-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Profile</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-4xl font-bold mx-auto">
            {user?.name[0].toUpperCase()}
          </div>
        </div>

        <div className="p-6 space-y-4">
          {!editing ? (
            <>
              <div>
                <label className="text-sm text-gray-600">Name</label>
                <div className="text-lg font-semibold">{user?.name}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Age</label>
                <div className="text-lg font-semibold">{user?.age} years</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Gender</label>
                <div className="text-lg font-semibold capitalize">{user?.gender}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Weight</label>
                <div className="text-lg font-semibold">{user?.weight} kg</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Height</label>
                <div className="text-lg font-semibold">{user?.height} cm</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Goals</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user?.goals.map((goal) => (
                    <span
                      key={goal}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setEditing(true)}
                className="w-full gradient-bg text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Height (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex-1 gradient-bg text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex-1" onClick={onClose}></div>
    </div>
  );
}
