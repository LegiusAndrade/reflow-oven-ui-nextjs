'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import AssessmentIcon from '@mui/icons-material/Assessment';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';
import SunnyIcon from '@mui/icons-material/Sunny';
import {
  Drawer,
  useTheme,
  Box,
  Avatar,
  Divider,
  useMediaQuery,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Theme,
} from '@mui/material';

import { useAppThemeContext, useDrawerContext } from '../../contexts';

interface IListItemLinkProps {
  icon: React.ReactNode; // Icon name (used inside MUI <Icon>)
  label: string;
  toPage: string;
  onClick?: () => void;
}

interface IProps {
  children: React.ReactNode;
}

// Link for each drawer item
const ListItemLink: React.FC<IListItemLinkProps> = ({ toPage, icon, label, onClick }) => {
  const router = useRouter(); // Navigation router
  const pathname = usePathname(); // Current URL path

  const firstPath = pathname.split('/')[1] || '/'; // Extract first path segment
  const isSelected = `/${firstPath}` === toPage; // Check if the current route matches

  const handleClick = () => {
    onClick?.(); // Execute optional onClick (used to close drawer on mobile)
    router.push(toPage); // Navigate to new page
  };

  return (
    <ListItemButton selected={isSelected} onClick={handleClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const SideMenu: React.FC<IProps> = ({ children }) => {
  const theme = useTheme(); // Access current MUI theme
  const smDown = useMediaQuery(theme.breakpoints.down('sm')); // Below 600px
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg')); // Below 1200px

  const drawerWidthSpacing = 28; // Drawer width as MUI spacing units

  const { isDrawerOpen, toggleDrawerOpen, setDrawerOptions, drawerOptions } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();
  const isDark = theme.palette.mode === 'dark';
  // Set drawer items on initial render
  useEffect(() => {
    setDrawerOptions([
      { icon: <HomeIcon />, path: '/', label: 'Página Inicial' },
      { icon: <ReceiptIcon />, path: '/programas', label: 'Programas' },
      { icon: <AssessmentIcon />, path: '/relatorios', label: 'Relatórios' },
      { icon: <SettingsIcon />, path: '/configuracoes', label: 'Configurações' },
      { icon: <InfoIcon />, path: '/informacoes', label: 'Informações' },
    ]);
  }, [setDrawerOptions]);

  return (
    <>
      {/* Sidebar drawer - collapsible on mobile */}
      <Drawer
        open={isDrawerOpen}
        variant={lgDown ? 'temporary' : 'permanent'} // Temporary on mobile
        onClose={toggleDrawerOpen} // Close on mobile tap
      >
        <Box width={theme.spacing(drawerWidthSpacing)} height="100%" display="flex" flexDirection="column">
          {/* Logo Avatar */}
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              alt="Pandewilly"
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="https://i.postimg.cc/LXn4k7ww/logo-preto.png"
            />
          </Box>

          <Divider />

          {/* Menu items */}
          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((item) => (
                <ListItemLink
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  toPage={item.path}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>

          {/* Theme toggle */}
          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-block',
                      transition: 'transform 1s ease, opacity 1s ease',
                      transform: isDark ? 'rotate(360deg)' : 'rotate(0deg)',
                      opacity: 1,
                    }}
                  >
                    {isDark ? <DarkModeIcon /> : <SunnyIcon />}
                  </Box>
                </ListItemIcon>
                <ListItemText primary="Alternar tema" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      {/* Main content, pushes right if drawer is open */}
      <Box height="100vh" marginLeft={lgDown && !isDrawerOpen ? 0 : theme.spacing(drawerWidthSpacing)}>
        {children}
      </Box>
    </>
  );
};
