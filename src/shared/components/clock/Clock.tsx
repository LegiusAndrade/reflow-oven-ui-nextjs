'use client';
import { createContext, useContext, useEffect, useState } from 'react';

interface IClockProps {
  hourDate: string;
  todayDate: string;
}

interface IProps {
  children: React.ReactNode;
}

// Create context to share clock data across the app
const ClockContext = createContext<IClockProps | undefined>(undefined);

// Custom hook to access the clock context safely
export const useClockContext = () => {
  const context = useContext(ClockContext);
  if (context === undefined) throw new Error('useClockContext must be used within a ClockProvider');
  return context;
};

const ClockProvider: React.FC<IProps> = ({ children }) => {
  const [hourDate, setHourDate] = useState('');
  const [todayDate, setTodayDate] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const date = new Date();
      setHourDate(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setTodayDate(
        date.toLocaleString([], {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
        })
      );
    };
    // Update the clock immediately on mount
    updateClock();
    // Set an interval to update the clock every second
    // This will ensure the clock is always up to date
    // and will not cause unnecessary re-renders
    // The interval is cleared when the component unmounts
    // to prevent memory leaks
    // and ensure the clock stops updating when the component is no longer in use
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
    // The interval is cleared when the component unmounts
    // to prevent memory leaks
    // and ensure the clock stops updating when the component is no longer in use
    // The interval is cleared when the component unmounts
    // to prevent memory leaks
  }, []);

  return <ClockContext.Provider value={{ hourDate, todayDate }}>{children}</ClockContext.Provider>;
};

export default ClockProvider;
