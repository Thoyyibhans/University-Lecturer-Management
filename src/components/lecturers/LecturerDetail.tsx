import React from 'react';
import { ArrowLeft, Edit, Trash2, User, Calendar, Award, GraduationCap } from 'lucide-react';
import { Lecturer } from '../../types/lecturer';

interface LecturerDetailProps {
  lecturer: Lecturer;
  onBack: () => void;
  onEdit: (lecturer: Lecturer) => void;
  onDelete: (lecturer: Lecturer) => void;
}

export const LecturerDetail: React.FC<LecturerDetailProps> = ({
  lecturer,
  onBack,
  onEdit,
  onDelete
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-white hover:text-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to List
            </button>
            <div className="flex space-x-3">
              <button
                onClick={() => onEdit(lecturer)}
                className="flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </button>
              <button
                onClick={() => onDelete(lecturer)}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
          
          <div className="flex items-center mt-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="ml-6">
              <h1 className="text-3xl font-bold text-white">{lecturer.name}</h1>
              <p className="text-blue-100 text-lg">{lecturer.degree}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Basic Information
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">NIDN:</span>
                    <span className="font-medium text-gray-900">{lecturer.nidn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Full Name:</span>
                    <span className="font-medium text-gray-900">{lecturer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Degree:</span>
                    <span className="font-medium text-gray-900">{lecturer.degree}</span>
                  </div>
                  {lecturer.scopus_id && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Scopus ID:</span>
                      <span className="font-medium text-gray-900">{lecturer.scopus_id}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Registration Info
                </h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created At:</span>
                    <span className="font-medium text-gray-900">{formatDate(lecturer.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-blue-600" />
                  Professional Information
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Functional Position:</span>
                    <span className="font-medium text-gray-900">{lecturer.functional_position}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rank:</span>
                    <span className="font-medium text-gray-900">{lecturer.rank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Serdos Status:</span>
                    <span className={`font-medium px-3 py-1 rounded-full ${
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

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                  Education
                </h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Education:</span>
                    <span className="font-medium text-gray-900">{lecturer.last_education}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};