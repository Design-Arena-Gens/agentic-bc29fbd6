'use client';

import { useEffect, useState } from 'react';
import { Timer, Trophy, RotateCcw } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function NoFapTimer({ fullView = false }: { fullView?: boolean }) {
  const nofap = useStore((state) => state.nofap);
  const updateNoFap = useStore((state) => state.updateNoFap);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (!nofap) {
      updateNoFap({
        startDate: new Date(),
        currentStreak: 0,
        longestStreak: 0,
        relapses: 0,
      });
    }
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [nofap, updateNoFap]);

  const calculateStreak = () => {
    if (!nofap) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const diff = currentTime.getTime() - new Date(nofap.startDate).getTime();
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const streak = calculateStreak();

  const handleReset = () => {
    if (!nofap) return;
    if (confirm('Are you sure you want to reset your streak?')) {
      const currentStreak = Math.floor(
        (currentTime.getTime() - new Date(nofap.startDate).getTime()) / (1000 * 60 * 60 * 24)
      );
      updateNoFap({
        startDate: new Date(),
        currentStreak: 0,
        longestStreak: Math.max(nofap.longestStreak, currentStreak),
        relapses: nofap.relapses + 1,
      });
    }
  };

  if (fullView) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-4 gradient-orange rounded-xl">
            <Timer className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">NoFap Journey</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-6 text-center">
            <div className="text-5xl font-bold text-purple-700">{streak.days}</div>
            <div className="text-purple-600 font-medium mt-2">Days</div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-6 text-center">
            <div className="text-5xl font-bold text-blue-700">{streak.hours}</div>
            <div className="text-blue-600 font-medium mt-2">Hours</div>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-6 text-center">
            <div className="text-5xl font-bold text-green-700">{streak.minutes}</div>
            <div className="text-green-600 font-medium mt-2">Minutes</div>
          </div>
          <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl p-6 text-center">
            <div className="text-5xl font-bold text-orange-700">{streak.seconds}</div>
            <div className="text-orange-600 font-medium mt-2">Seconds</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-600 font-medium">Longest Streak</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{nofap?.longestStreak || 0} days</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-gray-600 font-medium mb-2">Total Relapses</div>
            <div className="text-3xl font-bold text-gray-800">{nofap?.relapses || 0}</div>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="w-full bg-red-500 text-white py-4 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Reset Streak
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 gradient-orange rounded-xl">
          <Timer className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">NoFap</h2>
      </div>
      <div className="text-center py-4">
        <div className="text-4xl font-bold text-gray-800">{streak.days}</div>
        <div className="text-gray-600">Days Strong</div>
        <div className="text-sm text-gray-500 mt-2">
          {streak.hours}h {streak.minutes}m {streak.seconds}s
        </div>
      </div>
      <div className="flex justify-between text-sm mt-4">
        <div>
          <div className="text-gray-600">Best</div>
          <div className="font-semibold">{nofap?.longestStreak || 0}d</div>
        </div>
        <div>
          <div className="text-gray-600">Relapses</div>
          <div className="font-semibold">{nofap?.relapses || 0}</div>
        </div>
      </div>
    </div>
  );
}
