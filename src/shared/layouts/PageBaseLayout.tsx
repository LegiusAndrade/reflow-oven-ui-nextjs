'use client';
// This file is part of the "shared" module, which contains common components and utilities used across the application.
import React from 'react';

import { Box, Icon, IconButton, Paper, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';

import { BottomBarWrapper, TopBarWrapper } from '../components';
import { useDrawerContext } from '../contexts';

interface IPageBaseLayout {
  children: React.ReactNode; // React children elements to be rendered in the layout
}

export const PageBaseLayout: React.FC<IPageBaseLayout> = ({ children }) => {
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md')); // Checks if screen width is below "md"

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm')); // Checks if screen width is below "sm"
  // Alternative (shorter) way: const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const theme = useTheme(); // Access current MUI theme

  const drawerContext = useDrawerContext(); // Access drawer toggle function from context

  const toggleDrawerOpen = drawerContext?.toggleDrawerOpen;

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      {/* Top bar with icons and status message */}
      <Box>
        <TopBarWrapper
          showIconWorld
          showIconNotification
          showiconWifi
          amountNotification={1}
          messageStatus="Aguardando inicializar processo..." // Status message (can be dynamic)
        />
      </Box>

      {/* Header section that adapts its height based on screen size */}
      <Box
        padding={1}
        display="flex"
        alignItems="center"
        gap={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} // Responsive height based on breakpoints
      >
        {/* Show menu icon on small screens */}
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
          overflow="hidden" // Cuts off text that overflows horizontally
          whiteSpace="nowrap" // Prevents text from wrapping to the next line
          textOverflow="ellipsis" // Shows "..." when text is truncated
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'} // Responsive text size
        >
          {mdDown ? 'Nome do sistema' : 'Nome do sistema - Nome do módulo'}{' '}
          {/* System name and module name */}
        </Typography>
      </Box>

      {/* Optional toolbar could be added here if needed */}
      {/* {toolbarComponent && <Box>{toolbarComponent}</Box>} */}

      {/* Main content container with optional styles */}
      <Box
        component={Paper}
        sx={
          {
            //backgroundColor: 'primary.main', // Example of adding a background color
          }
        }
        elevation={10} // Shadow depth
        maxWidth="xl" // Max width for large displays
        height="100%"
        width="99%" // Slight margin from full width
        mx="auto" // Horizontal centering
      >
        {children} {/* Render page content here */}
      </Box>

      {/* Bottom bar fixed at the page bottom */}
      <Box>
        <BottomBarWrapper />
      </Box>
    </Box>
  );
};
