'use client';
import { Box, Button, Icon, Paper, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';

import DeveloperBoardIcon from '@/shared/assets/icons/developer_board.svg'; // Importing a developer board icon
import HvacIcon from '@/shared/assets/icons/hvac.svg'; // Importing a HVAC icon
import MicroWaveIcon from '@/shared/assets/icons/microwave.svg'; // Importing a microwave icon
import SpeedIcon from '@/shared/assets/icons/speed.svg'; // Importing a speed icon
import { useDrawerContext } from '@/shared/contexts';

import { IconComponent } from '../icon-component/IconComponent';

// Functional component for the bottom status bar
export const BottomBar: React.FC = () => {
  const theme = useTheme(); // Access current MUI theme

  const drawerContext = useDrawerContext(); // Access drawer toggle function from context

  const toggleDrawerOpen = drawerContext?.toggleDrawerOpen;

  // Check if screen size is less than or equal to 'lg' breakpoint (≤1200px)
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg')); // Check if screen size is less than or equal to large breakpoint 1200px

  return (
    <>
      <Box
        gap={1} // Gap between items
        marginX={0} // Horizontal margin
        padding={0.25} // Padding around the box
        paddingX={2} // Horizontal padding
        display={'flex'} // Flexbox display
        alignItems={'center'} // Center items vertically
        height={theme.spacing(5)} // Height of the box
        component={Paper} // Use Paper component for elevation
        elevation={10} // Shadow depth
        flexDirection={'row'} // Flex direction
      >
        {/* Left side of the bar — contains toggle menu on small screens */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Only show menu toggle button when screen is small (mobile/tablet) */}

          {lgDown && (
            <Button
              color="primary"
              disableElevation
              variant={'text'}
              startIcon={<Icon>menu</Icon>} // Material icon for the button
            >
              <Typography
                variant="button"
                whiteSpace={'nowrap'} // Prevents line wrapping
                textOverflow={'ellipsis'} // Adds "..." when overflowing
                overflow={'hidden'} // Prevents scroll bar from showing
                onClick={toggleDrawerOpen} // Toggle drawer when clicked
              >
                Menu
              </Typography>
            </Button>
          )}
        </Box>
        
        {/* Temperature of oven */}
        <IconComponent
          titleTooltip="Temperatura forno"
          icon={<DeveloperBoardIcon style={{
            fill: theme.palette.text.primary,
            width: 24,
            height: 24,
          }} />}
          textIcon="170°C"
          isFirstIcon={true} // Indicates this is the first icon (skip divider)
        />

        {/* Temperature of PCB */}
        <IconComponent titleTooltip="Temperatura PCB" icon={<MicroWaveIcon style={{
          fill: theme.palette.text.primary,
          width: 24,
          height: 24,
        }}/>} textIcon="70°C" />

        {/* Fan speed for oven */}
        <IconComponent titleTooltip="Velocidade ventilador forno" icon={<SpeedIcon style={{
          fill: theme.palette.text.primary,
          width: 24,
          height: 24,
        }}/>} textIcon="1500RPM" />

        {/* Fan speed for PCB */}
        <IconComponent titleTooltip="Velocidade ventilador PCB" icon={<SpeedIcon style={{
          fill: theme.palette.text.primary,
          width: 24,
          height: 24,
        }}/>} textIcon="800RPM" />

        {/* Voltage and current through heating element */}
        <IconComponent
          titleTooltip="Tensão @ Corrente resistência"
          icon={<HvacIcon style={{
            fill: theme.palette.text.primary,
            width: 24,
            height: 24,
          }}/>}
          textIcon="110V @ 2A"
        />
      </Box>
    </>
  );
};
