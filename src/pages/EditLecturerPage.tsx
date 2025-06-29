import React, { useState, useEffect } from 'react';
import { LecturerForm } from '../components/forms/LecturerForm';
import { useLecturers } from '../hooks/useLecturers';
import { Lecturer, CreateLecturerData } from '../types/lecturer';
import { Toast } from '../components/common/Toast';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

interface EditLecturerPageProps {
  lecturerId: string;
  onBack: () => void;
}

export const EditLecturerPage: React.FC<EditLecturerPageProps> = ({ lecturerId, onBack }) => {
  const { updateLecturer, getLecturerById } = useLecturers();
  const [lecturer, setLecturer] = useState<Lecturer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const loadLecturer = async () => {
      const result = await getLecturerById(lecturerId);
      if (result.success) {
        setLecturer(result.data);
      } else {
        setToast({ message: result.error || 'Failed to load lecturer', type: 'error' });
      }
      setIsLoadingData(false);
    };

    loadLecturer();
  }, [lecturerId, getLecturerById]);

  const handleSubmit = async (data: CreateLecturerData) => {
    if (!lecturer) return;

    setIsLoading(true);
    const result = await updateLecturer({ ...data, id: lecturer.id });
    setIsLoading(false);

    if (result.success) {
      setToast({ message: 'Lecturer updated successfully!', type: 'success' });
      setTimeout(() => {
        onBack();
      }, 1500);
    } else {
      setToast({ message: result.error || 'Failed to update lecturer', type: 'error' });
    }
  };

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!lecturer) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Lecturer Not Found</h2>
            <button
              onClick={onBack}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LecturerForm
          onSubmit={handleSubmit}
          onCancel={onBack}
          initialData={lecturer}
          isLoading={isLoading}
        />
      </div>
      
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};