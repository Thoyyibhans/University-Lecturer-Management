import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Lecturer, CreateLecturerData, UpdateLecturerData } from '../types/lecturer';
import { useOfflineStorage } from './useOfflineStorage';
import { usePWA } from './usePWA';

export const useLecturers = () => {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isOnline } = usePWA();
  const {
    offlineData,
    saveOfflineData,
    createOfflineLecturer,
    updateOfflineLecturer,
    deleteOfflineLecturer,
    pendingActions,
    clearPendingActions
  } = useOfflineStorage();

  const fetchLecturers = async () => {
    try {
      setLoading(true);
      
      if (!isOnline) {
        // Use offline data when not connected
        setLecturers(offlineData);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('lecturers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const fetchedData = data || [];
      setLecturers(fetchedData);
      
      // Save to offline storage
      saveOfflineData(fetchedData);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      // Fallback to offline data
      setLecturers(offlineData);
    } finally {
      setLoading(false);
    }
  };

  const syncPendingActions = async () => {
    if (!isOnline || pendingActions.length === 0) return;

    try {
      for (const action of pendingActions) {
        switch (action.type) {
          case 'create':
            if (action.data) {
              await supabase.from('lecturers').insert([action.data]);
            }
            break;
          case 'update':
            if (action.data && 'id' in action.data) {
              await supabase
                .from('lecturers')
                .update(action.data)
                .eq('id', action.data.id);
            }
            break;
          case 'delete':
            if (action.lecturerId) {
              await supabase
                .from('lecturers')
                .delete()
                .eq('id', action.lecturerId);
            }
            break;
        }
      }
      
      clearPendingActions();
      // Refresh data after sync
      await fetchLecturers();
      
    } catch (err) {
      console.error('Failed to sync pending actions:', err);
    }
  };

  const createLecturer = async (lecturerData: CreateLecturerData) => {
    try {
      if (!isOnline) {
        // Create offline
        const newLecturer = createOfflineLecturer(lecturerData);
        setLecturers(prev => [newLecturer, ...prev]);
        return { success: true, data: newLecturer };
      }

      const { data, error } = await supabase
        .from('lecturers')
        .insert([lecturerData])
        .select()
        .single();

      if (error) throw error;
      setLecturers(prev => [data, ...prev]);
      
      // Update offline storage
      saveOfflineData([data, ...lecturers]);
      
      return { success: true, data };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create lecturer';
      return { success: false, error: message };
    }
  };

  const updateLecturer = async (lecturerData: UpdateLecturerData) => {
    try {
      if (!isOnline) {
        // Update offline
        updateOfflineLecturer(lecturerData);
        setLecturers(prev => prev.map(l => l.id === lecturerData.id ? { ...l, ...lecturerData } : l));
        return { success: true, data: lecturerData };
      }

      const { data, error } = await supabase
        .from('lecturers')
        .update(lecturerData)
        .eq('id', lecturerData.id)
        .select()
        .single();

      if (error) throw error;
      setLecturers(prev => prev.map(l => l.id === data.id ? data : l));
      
      // Update offline storage
      const updatedLecturers = lecturers.map(l => l.id === data.id ? data : l);
      saveOfflineData(updatedLecturers);
      
      return { success: true, data };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update lecturer';
      return { success: false, error: message };
    }
  };

  const deleteLecturer = async (id: string) => {
    try {
      if (!isOnline) {
        // Delete offline
        deleteOfflineLecturer(id);
        setLecturers(prev => prev.filter(l => l.id !== id));
        return { success: true };
      }

      const { error } = await supabase
        .from('lecturers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setLecturers(prev => prev.filter(l => l.id !== id));
      
      // Update offline storage
      const updatedLecturers = lecturers.filter(l => l.id !== id);
      saveOfflineData(updatedLecturers);
      
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete lecturer';
      return { success: false, error: message };
    }
  };

  const getLecturerById = async (id: string) => {
    try {
      // First try to find in current data (works offline too)
      const localLecturer = lecturers.find(l => l.id === id);
      if (localLecturer) {
        return { success: true, data: localLecturer };
      }

      if (!isOnline) {
        return { success: false, error: 'Lecturer not found offline' };
      }

      const { data, error } = await supabase
        .from('lecturers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch lecturer';
      return { success: false, error: message };
    }
  };

  useEffect(() => {
    fetchLecturers();
  }, []);

  // Sync pending actions when coming back online
  useEffect(() => {
    if (isOnline && pendingActions.length > 0) {
      syncPendingActions();
    }
  }, [isOnline, pendingActions.length]);

  return {
    lecturers,
    loading,
    error,
    createLecturer,
    updateLecturer,
    deleteLecturer,
    getLecturerById,
    refetch: fetchLecturers,
    isOnline,
    hasPendingSync: pendingActions.length > 0
  };
};