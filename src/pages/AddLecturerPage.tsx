import React, { useState } from 'react';
import { LecturerForm } from '../components/forms/LecturerForm';
import { useLecturers } from '../hooks/useLecturers';
import { CreateLecturerData } from '../types/lecturer';
import { Toast } from '../components/common/Toast';

interface AddLecturerPageProps {
  onBack: () => void;
}

export const AddLecturerPage: React.FC<AddLecturerPageProps> = ({ onBack }) => {
  const { createLecturer } = useLecturers();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (data: CreateLecturerData) => {
    setIsLoading(true);
    const result = await createLecturer(data);
    setIsLoading(false);

    if (result.success) {
      setToast({ message: 'Lecturer created successfully!', type: 'success' });
      setTimeout(() => {
        onBack();
      }, 1500);
    } else {
      setToast({ message: result.error || 'Failed to create lecturer', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LecturerForm
          onSubmit={handleSubmit}
          onCancel={onBack}
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