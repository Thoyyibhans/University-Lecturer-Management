import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft } from 'lucide-react';
import { CreateLecturerData, Lecturer } from '../../types/lecturer';

interface LecturerFormProps {
  onSubmit: (data: CreateLecturerData) => Promise<void>;
  onCancel: () => void;
  initialData?: Lecturer;
  isLoading?: boolean;
}

const functionalPositions = [
  'Asisten Ahli',
  'Lektor',
  'Lektor Kepala',
  'Guru Besar'
];

const ranks = [
  'Penata Muda Tk. I (III/b)',
  'Penata (III/c)',
  'Penata Tk. I (III/d)',
  'Pembina (IV/a)',
  'Pembina Tk. I (IV/b)',
  'Pembina Utama Muda (IV/c)',
  'Pembina Utama Madya (IV/d)',
  'Pembina Utama (IV/e)'
];

const serdosStatuses = [
  'Belum Sertifikasi',
  'Sudah Sertifikasi',
  'Dalam Proses'
];

export const LecturerForm: React.FC<LecturerFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<CreateLecturerData>({
    nidn: '',
    name: '',
    degree: '',
    scopus_id: '',
    functional_position: '',
    rank: '',
    last_education: '',
    serdos_status: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        nidn: initialData.nidn,
        name: initialData.name,
        degree: initialData.degree,
        scopus_id: initialData.scopus_id || '',
        functional_position: initialData.functional_position,
        rank: initialData.rank,
        last_education: initialData.last_education,
        serdos_status: initialData.serdos_status
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nidn.trim()) newErrors.nidn = 'NIDN is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.degree.trim()) newErrors.degree = 'Degree is required';
    if (!formData.functional_position.trim()) newErrors.functional_position = 'Functional position is required';
    if (!formData.rank.trim()) newErrors.rank = 'Rank is required';
    if (!formData.last_education.trim()) newErrors.last_education = 'Last education is required';
    if (!formData.serdos_status.trim()) newErrors.serdos_status = 'Serdos status is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await onSubmit(formData);
    }
  };

  const handleChange = (field: keyof CreateLecturerData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {initialData ? 'Edit Lecturer' : 'Add New Lecturer'}
        </h2>
        <button
          onClick={onCancel}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              NIDN *
            </label>
            <input
              type="text"
              value={formData.nidn}
              onChange={(e) => handleChange('nidn', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.nidn ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter NIDN"
            />
            {errors.nidn && <p className="text-red-500 text-sm mt-1">{errors.nidn}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Degree *
            </label>
            <input
              type="text"
              value={formData.degree}
              onChange={(e) => handleChange('degree', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.degree ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Dr. S.Kom., M.Kom"
            />
            {errors.degree && <p className="text-red-500 text-sm mt-1">{errors.degree}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scopus ID
            </label>
            <input
              type="text"
              value={formData.scopus_id}
              onChange={(e) => handleChange('scopus_id', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Scopus ID (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Functional Position *
            </label>
            <select
              value={formData.functional_position}
              onChange={(e) => handleChange('functional_position', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.functional_position ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select functional position</option>
              {functionalPositions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
            {errors.functional_position && <p className="text-red-500 text-sm mt-1">{errors.functional_position}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rank *
            </label>
            <select
              value={formData.rank}
              onChange={(e) => handleChange('rank', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.rank ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select rank</option>
              {ranks.map(rank => (
                <option key={rank} value={rank}>{rank}</option>
              ))}
            </select>
            {errors.rank && <p className="text-red-500 text-sm mt-1">{errors.rank}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Education *
            </label>
            <input
              type="text"
              value={formData.last_education}
              onChange={(e) => handleChange('last_education', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.last_education ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter last education"
            />
            {errors.last_education && <p className="text-red-500 text-sm mt-1">{errors.last_education}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Serdos Status *
            </label>
            <select
              value={formData.serdos_status}
              onChange={(e) => handleChange('serdos_status', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.serdos_status ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select serdos status</option>
              {serdosStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            {errors.serdos_status && <p className="text-red-500 text-sm mt-1">{errors.serdos_status}</p>}
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Lecturer'}
          </button>
        </div>
      </form>
    </div>
  );
};