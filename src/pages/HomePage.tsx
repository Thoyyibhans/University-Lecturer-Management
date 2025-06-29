import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { LecturerList } from '../components/lecturers/LecturerList';
import { useLecturers } from '../hooks/useLecturers';
import { Lecturer } from '../types/lecturer';

interface HomePageProps {
  onAddLecturer: () => void;
  onEditLecturer: (lecturer: Lecturer) => void;
  onViewLecturer: (lecturer: Lecturer) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onAddLecturer,
  onEditLecturer,
  onViewLecturer
}) => {
  const { lecturers, loading, deleteLecturer } = useLecturers();
  const [deleteConfirm, setDeleteConfirm] = useState<Lecturer | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;
    
    setIsDeleting(true);
    const result = await deleteLecturer(deleteConfirm.id);
    setIsDeleting(false);
    
    if (result.success) {
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddLecturer={onAddLecturer} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LecturerList
          lecturers={lecturers}
          loading={loading}
          onEdit={onEditLecturer}
          onDelete={setDeleteConfirm}
          onView={onViewLecturer}
        />
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delete Lecturer
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{deleteConfirm.name}</strong>? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};