import React from 'react';
import { GraduationCap, Plus, Wifi, WifiOff, RotateCcw } from 'lucide-react';
import { useLecturers } from '../../hooks/useLecturers';

interface HeaderProps {
  onAddLecturer: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddLecturer }) => {
  const { isOnline, hasPendingSync } = useLecturers();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">Lecturer Management</h1>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-600">University System</p>
                  <div className="flex items-center space-x-1">
                    {isOnline ? (
                      <Wifi className="w-3 h-3 text-green-500" />
                    ) : (
                      <WifiOff className="w-3 h-3 text-orange-500" />
                    )}
                    {hasPendingSync && (
                      <div className="flex items-center">
                        <RotateCcw className="w-3 h-3 text-blue-500 animate-spin" />
                        <span className="text-xs text-blue-600 ml-1">Syncing...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={onAddLecturer}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Add Lecturer</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
    </header>
  );
};