import React, { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { AddLecturerPage } from './pages/AddLecturerPage';
import { EditLecturerPage } from './pages/EditLecturerPage';
import { LecturerDetailPage } from './pages/LecturerDetailPage';
import { InstallPrompt } from './components/common/InstallPrompt';
import { OfflineIndicator } from './components/common/OfflineIndicator';
import { Lecturer } from './types/lecturer';

type PageType = 'home' | 'add' | 'edit' | 'detail';

interface AppState {
  currentPage: PageType;
  selectedLecturer?: Lecturer;
}

function App() {
  const [appState, setAppState] = useState<AppState>({
    currentPage: 'home'
  });

  const navigateToHome = () => {
    setAppState({ currentPage: 'home' });
  };

  const navigateToAdd = () => {
    setAppState({ currentPage: 'add' });
  };

  const navigateToEdit = (lecturer: Lecturer) => {
    setAppState({ currentPage: 'edit', selectedLecturer: lecturer });
  };

  const navigateToDetail = (lecturer: Lecturer) => {
    setAppState({ currentPage: 'detail', selectedLecturer: lecturer });
  };

  const renderCurrentPage = () => {
    switch (appState.currentPage) {
      case 'home':
        return (
          <HomePage
            onAddLecturer={navigateToAdd}
            onEditLecturer={navigateToEdit}
            onViewLecturer={navigateToDetail}
          />
        );
      case 'add':
        return <AddLecturerPage onBack={navigateToHome} />;
      case 'edit':
        return appState.selectedLecturer ? (
          <EditLecturerPage
            lecturerId={appState.selectedLecturer.id}
            onBack={navigateToHome}
          />
        ) : (
          <HomePage
            onAddLecturer={navigateToAdd}
            onEditLecturer={navigateToEdit}
            onViewLecturer={navigateToDetail}
          />
        );
      case 'detail':
        return appState.selectedLecturer ? (
          <LecturerDetailPage
            lecturerId={appState.selectedLecturer.id}
            onBack={navigateToHome}
            onEdit={navigateToEdit}
          />
        ) : (
          <HomePage
            onAddLecturer={navigateToAdd}
            onEditLecturer={navigateToEdit}
            onViewLecturer={navigateToDetail}
          />
        );
      default:
        return (
          <HomePage
            onAddLecturer={navigateToAdd}
            onEditLecturer={navigateToEdit}
            onViewLecturer={navigateToDetail}
          />
        );
    }
  };

  return (
    <div className="App">
      {renderCurrentPage()}
      <InstallPrompt />
      <OfflineIndicator />
    </div>
  );
}

export default App;