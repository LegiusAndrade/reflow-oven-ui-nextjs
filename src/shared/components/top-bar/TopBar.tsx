'use client';
import React from 'react';

import NotificationsIcon from '@mui/icons-material/Notifications';
import PublicIcon from '@mui/icons-material/Public';
import WifiIcon from '@mui/icons-material/Wifi';
import { Badge, Box, Divider, LinearProgress, Paper, Typography, useTheme } from '@mui/material';

import { useClockContext } from '../clock/Clock';

interface ITopBar {
  showiconWifi?: boolean;
  showIconWorld?: boolean;
  showIconNotification?: boolean;

  amountNotification?: number;

  messageStatus?: string;
}

export const TopBar: React.FC<ITopBar> = ({
  showiconWifi = false,
  showIconWorld = false,
  showIconNotification = false,
  amountNotification = 0,
  messageStatus = '',
}) => {
  const theme = useTheme();
  const { hourDate, todayDate } = useClockContext();
  return (
    <>
      <Box
        gap={1} //Distance between elements
        marginX={0} // Margin in X axis
        padding={0.25} // Internal spacing
        paddingX={2} // Internal spacing in X axis, theme.spacing was not passed as it already works with it by default
        display="flex" // //Display Flex changes the way the Layout behaves, by default it is like a row, one component next to the other
        alignItems="center" // Aligns the elements in the center
        height={theme.spacing(5)} // Height of the top bar
        component={Paper} // Paper is a component that gives a shadow effect
        elevation={10} // Elevation is the shadow effect
        flexDirection="row" // Flex direction is the direction of the layout, by default it is row
      >
        <Typography
          variant="h6" // Font size
          width={'100%'} // Width of the element
          whiteSpace={'nowrap'} // Prevents the text from breaking
          textOverflow={'ellipsis'} // Prevents the text from overflowing adding "..." on the end
          overflow={'hidden'} // Prevents the text from overflowing
        >
          {messageStatus}
        </Typography>

        {/* Notification Icon Section */}
        {showIconNotification && amountNotification > 0 && (
          <>
            <Divider variant="middle" orientation="vertical" />
            <Box display="flex" alignItems="center" paddingX={0.5}>
              <Badge badgeContent={amountNotification} color="warning">
                <NotificationsIcon />
              </Badge>
            </Box>
          </>
        )}

        {/* Link Server Icon Section */}
        {showIconWorld && <Divider variant="middle" orientation="vertical" />}
        {showIconWorld && (
          <Box display="flex" alignItems="center" paddingX={0.5}>
            <PublicIcon fontSize="medium" />
          </Box>
        )}

        {/* Wi-Fi Icon Section */}
        {showiconWifi && <Divider variant="middle" orientation="vertical" />}
        {showiconWifi && (
          <Box display="flex" alignItems="center" paddingX={0.5}>
            <WifiIcon fontSize="medium" />
          </Box>
        )}

        {/* Date Section */}
        <Divider variant="middle" orientation="vertical" />
        <Typography variant="h6" display={'flex'}>
          {todayDate}
        </Typography>

        {/* Time Section */}
        <Divider variant="middle" orientation="vertical" />
        <Typography variant="h6" display={'flex'}>
          {hourDate}
        </Typography>

        {/* Decorative Loading Bar */}
        <LinearProgress sx={{ borderRadius: '16px' }} color="secondary" />
      </Box>
    </>
  );
};
