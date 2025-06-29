import React, { useState, useEffect } from 'react';
import { LecturerDetail } from '../components/lecturers/LecturerDetail';
import { useLecturers } from '../hooks/useLecturers';
import { Lecturer } from '../types/lecturer';
import { Toast } from '../components/common/Toast';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

interface LecturerDetailPageProps {
  lecturerId: string;
  onBack: () => void;
  onEdit: (lecturer: Lecturer) => void;
}

export const LecturerDetailPage: React.FC<LecturerDetailPageProps> = ({
  lecturerId,
  onBack,
  onEdit
}) => {
  const { getLecturerById, deleteLecturer } = useLecturers();
  const [lecturer, setLecturer] = useState<Lecturer | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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

  const handleDeleteConfirm = async () => {
    if (!lecturer) return;
    
    setIsDeleting(true);
    const result = await deleteLecturer(lecturer.id);
    setIsDeleting(false);
    
    if (result.success) {
      setToast({ message: 'Lecturer deleted successfully!', type: 'success' });
      setTimeout(() => {
        onBack();
      }, 1500);
    } else {
      setToast({ message: result.error || 'Failed to delete lecturer', type: 'error' });
      setDeleteConfirm(false);
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
        <LecturerDetail
          lecturer={lecturer}
          onBack={onBack}
          onEdit={onEdit}
          onDelete={() => setDeleteConfirm(true)}
        />
      </div>
      
      <ConfirmDialog
        isOpen={deleteConfirm}
        title="Delete Lecturer"
        message={`Are you sure you want to delete ${lecturer.name}? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirm(false)}
        confirmText="Delete"
        isLoading={isDeleting}
      />
      
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