import React from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';

export const OfflineIndicator: React.FC = () => {
  const { isOnline } = usePWA();
  const [showOfflineMessage, setShowOfflineMessage] = React.useState(false);

  React.useEffect(() => {
    if (!isOnline) {
      setShowOfflineMessage(true);
    } else {
      // Hide message after coming back online
      const timer = setTimeout(() => {
        setShowOfflineMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  if (!showOfflineMessage) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50">
      <div className={`flex items-center justify-center p-3 rounded-lg shadow-lg transition-all duration-300 ${
        isOnline 
          ? 'bg-green-500 text-white' 
          : 'bg-orange-500 text-white'
      }`}>
        {isOnline ? (
          <>
            <Wifi className="w-5 h-5 mr-2" />
            <span className="font-medium">Back online!</span>
          </>
        ) : (
          <>
            <WifiOff className="w-5 h-5 mr-2" />
            <span className="font-medium">You're offline - some features may be limited</span>
          </>
        )}
      </div>
    </div>
  );
};