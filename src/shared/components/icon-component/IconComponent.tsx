import { useState } from 'react';

import { Divider, Tooltip, Typography } from '@mui/material';

interface IIconComponentProps {
  titleTooltip: string; // Tooltip text shown on hover
  icon: React.ReactNode; // Icon component (ex: <MySvgIcon />)
  textIcon: string; // Label text next to the icon
  isFirstIcon?: boolean; // If true, don't show the left-side divider
}

// Functional component that displays an icon, label and optional tooltip
export const IconComponent: React.FC<IIconComponentProps> = ({
  titleTooltip = '',
  icon = null,
  textIcon = '',
  isFirstIcon = false,
}) => {
  // Local state to control whether the tooltip is shown
  const [openTooltip, setOpenTooltip] = useState(false);

  // Handle tooltip open manually
  const handleTooltipOpen = () => {
    setOpenTooltip(true);
  };

  // Handle tooltip close manually
  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };
  return (
    <>
      {/* Conditionally render a vertical divider unless it's the first item */}
      {!isFirstIcon && (
        <Divider
          variant="middle"
          orientation="vertical"
          style={{
            alignSelf: 'auto',
            height: '25px',
            margin: '0px 1px',
            width: '3px',
          }}
        />
      )}

      {/* Tooltip wrapping the icon+text content */}
      <Tooltip
        title={titleTooltip} // Tooltip text
        slotProps={{ popper: { disablePortal: true } }} // Keep tooltip inside layout context
        onClick={handleTooltipOpen} // Open tooltip manually on click
        onClose={handleTooltipClose} // Close on outside click
        open={openTooltip} // Controlled open state
        disableFocusListener // Prevent showing on keyboard focus
        arrow // Show arrow on tooltip
      >
        <Typography
          display={'flex'} // Align icon and text in a row
          variant="button" // Apply button-like text style
          whiteSpace={'nowrap'} // Prevent line wrapping
          textOverflow={'ellipsis'} // Add "..." if text overflows
          overflow={'hidden'} // Prevent overflow scroll
          gap={0.5} // Space between icon and text
        >
          {icon}
          {textIcon}
        </Typography>
      </Tooltip>
    </>
  );
};
