import React, { useState, useMemo } from 'react';
import { Search, Filter, SortAsc, SortDesc, Users } from 'lucide-react';
import { Lecturer } from '../../types/lecturer';
import { LecturerCard } from './LecturerCard';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface LecturerListProps {
  lecturers: Lecturer[];
  loading: boolean;
  onEdit: (lecturer: Lecturer) => void;
  onDelete: (lecturer: Lecturer) => void;
  onView: (lecturer: Lecturer) => void;
}

export const LecturerList: React.FC<LecturerListProps> = ({
  lecturers,
  loading,
  onEdit,
  onDelete,
  onView
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'nidn' | 'created_at'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterPosition, setFilterPosition] = useState('');
  const [filterSerdos, setFilterSerdos] = useState('');

  const filteredAndSortedLecturers = useMemo(() => {
    let filtered = lecturers.filter(lecturer => {
      const matchesSearch = lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lecturer.nidn.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPosition = !filterPosition || lecturer.functional_position === filterPosition;
      const matchesSerdos = !filterSerdos || lecturer.serdos_status === filterSerdos;
      
      return matchesSearch && matchesPosition && matchesSerdos;
    });

    filtered.sort((a, b) => {
      let aValue: string | Date = a[sortBy];
      let bValue: string | Date = b[sortBy];
      
      if (sortBy === 'created_at') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [lecturers, searchTerm, sortBy, sortOrder, filterPosition, filterSerdos]);

  const uniquePositions = Array.from(new Set(lecturers.map(l => l.functional_position))).filter(Boolean);
  const uniqueSerdosStatuses = Array.from(new Set(lecturers.map(l => l.serdos_status))).filter(Boolean);

  const handleSort = (field: 'name' | 'nidn' | 'created_at') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or NIDN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <select
              value={filterPosition}
              onChange={(e) => setFilterPosition(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Positions</option>
              {uniquePositions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
            
            <select
              value={filterSerdos}
              onChange={(e) => setFilterSerdos(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Serdos Status</option>
              {uniqueSerdosStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            {filteredAndSortedLecturers.length} of {lecturers.length} lecturers
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <button
              onClick={() => handleSort('name')}
              className={`flex items-center px-3 py-1 rounded-lg text-sm transition-colors ${
                sortBy === 'name' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Name
              {sortBy === 'name' && (
                sortOrder === 'asc' ? <SortAsc className="w-4 h-4 ml-1" /> : <SortDesc className="w-4 h-4 ml-1" />
              )}
            </button>
            <button
              onClick={() => handleSort('nidn')}
              className={`flex items-center px-3 py-1 rounded-lg text-sm transition-colors ${
                sortBy === 'nidn' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              NIDN
              {sortBy === 'nidn' && (
                sortOrder === 'asc' ? <SortAsc className="w-4 h-4 ml-1" /> : <SortDesc className="w-4 h-4 ml-1" />
              )}
            </button>
            <button
              onClick={() => handleSort('created_at')}
              className={`flex items-center px-3 py-1 rounded-lg text-sm transition-colors ${
                sortBy === 'created_at' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Date
              {sortBy === 'created_at' && (
                sortOrder === 'asc' ? <SortAsc className="w-4 h-4 ml-1" /> : <SortDesc className="w-4 h-4 ml-1" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Lecturer Grid */}
      {filteredAndSortedLecturers.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No lecturers found</h3>
          <p className="text-gray-600">
            {searchTerm || filterPosition || filterSerdos
              ? 'Try adjusting your search criteria or filters'
              : 'Get started by adding your first lecturer'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedLecturers.map((lecturer) => (
            <LecturerCard
              key={lecturer.id}
              lecturer={lecturer}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={onView}
            />
          ))}
        </div>
      )}
    </div>
  );
};