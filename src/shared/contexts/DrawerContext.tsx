'use client';

import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerOption {
  icon: string; // Icon name (used inside MUI <Icon>)
  path: string; // Path for the route
  label: string; // Label text for the option
}

interface IDrawerContextData {
  isDrawerOpen: boolean; // State to control if the drawer is open or closed
  toggleDrawerOpen: () => void; // Function to toggle the drawer open/closed
  drawerOptions: IDrawerOption[]; // Array of options to be displayed in the drawer
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void; // Function to set new drawer options
}

interface IProps {
  children: React.ReactNode; // Children elements to be rendered inside the context provider
}

/* The usability of the context is for sharing information between pages and components, in this case, it ends up using the AppThemeProvider around the pages. */
const DrawerContext = createContext<IDrawerContextData | undefined>(undefined); // Create context with undefined initial value

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('useDrawerContext must be used within a DrawerProvider');
  }
  return context;
};

export const DrawerProvider: React.FC<IProps> = ({ children }) => {
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]); // State for drawer options
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer open/close

  /* The useCallback hook has the ability to memoize functions. */
  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen); // Toggle the drawer open/close state
  }, []);

  /* The useCallback hook was used because this function will be in the application's context. */
  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
    setDrawerOptions(newDrawerOptions); // Set new drawer options
  }, []);

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        drawerOptions,
        toggleDrawerOpen,
        setDrawerOptions: handleSetDrawerOptions,
      }}
    >
      {children} {/* Render children inside the context provider */}
    </DrawerContext.Provider>
  );
};
