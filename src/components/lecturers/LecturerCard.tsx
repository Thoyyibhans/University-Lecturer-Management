import React from 'react';
import { Edit, Trash2, Eye, User } from 'lucide-react';
import { Lecturer } from '../../types/lecturer';

interface LecturerCardProps {
  lecturer: Lecturer;
  onEdit: (lecturer: Lecturer) => void;
  onDelete: (lecturer: Lecturer) => void;
  onView: (lecturer: Lecturer) => void;
}

export const LecturerCard: React.FC<LecturerCardProps> = ({
  lecturer,
  onEdit,
  onDelete,
  onView
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">{lecturer.name}</h3>
            <p className="text-sm text-gray-600">{lecturer.degree}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onView(lecturer)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(lecturer)}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(lecturer)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">NIDN:</span>
          <span className="text-sm font-medium text-gray-900">{lecturer.nidn}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Position:</span>
          <span className="text-sm font-medium text-gray-900">{lecturer.functional_position}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Serdos:</span>
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${
            lecturer.serdos_status === 'Sudah Sertifikasi' 
              ? 'bg-green-100 text-green-800'
              : lecturer.serdos_status === 'Dalam Proses'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {lecturer.serdos_status}
          </span>
        </div>
      </div>
    </div>
  );
};