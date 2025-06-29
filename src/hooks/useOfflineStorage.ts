import { useState, useEffect } from 'react';
import { Lecturer, CreateLecturerData, UpdateLecturerData } from '../types/lecturer';

const STORAGE_KEY = 'lecturer_offline_data';
const PENDING_ACTIONS_KEY = 'lecturer_pending_actions';

interface PendingAction {
  id: string;
  type: 'create' | 'update' | 'delete';
  data?: CreateLecturerData | UpdateLecturerData;
  lecturerId?: string;
  timestamp: number;
}

export const useOfflineStorage = () => {
  const [offlineData, setOfflineData] = useState<Lecturer[]>([]);
  const [pendingActions, setPendingActions] = useState<PendingAction[]>([]);

  useEffect(() => {
    // Load offline data from localStorage
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      setOfflineData(JSON.parse(savedData));
    }

    const savedActions = localStorage.getItem(PENDING_ACTIONS_KEY);
    if (savedActions) {
      setPendingActions(JSON.parse(savedActions));
    }
  }, []);

  const saveOfflineData = (data: Lecturer[]) => {
    setOfflineData(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const addPendingAction = (action: Omit<PendingAction, 'id' | 'timestamp'>) => {
    const newAction: PendingAction = {
      ...action,
      id: Date.now().toString(),
      timestamp: Date.now()
    };
    
    const updatedActions = [...pendingActions, newAction];
    setPendingActions(updatedActions);
    localStorage.setItem(PENDING_ACTIONS_KEY, JSON.stringify(updatedActions));
  };

  const clearPendingActions = () => {
    setPendingActions([]);
    localStorage.removeItem(PENDING_ACTIONS_KEY);
  };

  const createOfflineLecturer = (data: CreateLecturerData) => {
    const newLecturer: Lecturer = {
      ...data,
      id: `offline_${Date.now()}`,
      created_at: new Date().toISOString()
    };

    const updatedData = [newLecturer, ...offlineData];
    saveOfflineData(updatedData);
    addPendingAction({ type: 'create', data });

    return newLecturer;
  };

  const updateOfflineLecturer = (data: UpdateLecturerData) => {
    const updatedData = offlineData.map(lecturer => 
      lecturer.id === data.id ? { ...lecturer, ...data } : lecturer
    );
    
    saveOfflineData(updatedData);
    addPendingAction({ type: 'update', data });
  };

  const deleteOfflineLecturer = (id: string) => {
    const updatedData = offlineData.filter(lecturer => lecturer.id !== id);
    saveOfflineData(updatedData);
    addPendingAction({ type: 'delete', lecturerId: id });
  };

  return {
    offlineData,
    pendingActions,
    saveOfflineData,
    createOfflineLecturer,
    updateOfflineLecturer,
    deleteOfflineLecturer,
    clearPendingActions,
    hasPendingActions: pendingActions.length > 0
  };
};