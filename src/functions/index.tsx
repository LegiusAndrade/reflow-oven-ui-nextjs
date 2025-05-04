import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import WarningIcon from '@mui/icons-material/Warning';
import { ChipProps } from '@mui/material';
import { blue, green, orange, red } from '@mui/material/colors';
import { GridRenderCellParams } from '@mui/x-data-grid';

export const ActionTypeNotification: Array<{ id: number; enumConc: string; msg: string }> = [
  { id: 0, enumConc: 'INFO', msg: 'Atenção' },
  { id: 1, enumConc: 'SUCCESS', msg: 'Normal' },
  { id: 2, enumConc: 'WARNING', msg: 'Crítica' },
  { id: 3, enumConc: 'ERROR', msg: 'Grave' },
];

export function getChipProps(params: GridRenderCellParams): ChipProps {
  const elementIndex = ActionTypeNotification.map((el) => {
    return el.msg;
  }).indexOf(params.value);

  if (elementIndex >= 0) {
    let element: JSX.Element;
    let borderCol: string;

    if (elementIndex === 0) {
      element = <FmdBadIcon style={{ fill: blue[500] }} />;
      borderCol = blue[500];
    } else if (elementIndex === 1) {
      element = <CheckCircleIcon style={{ fill: green[500] }} />;
      borderCol = green[500];
    } else if (elementIndex === 2) {
      element = <WarningIcon style={{ fill: orange[500] }} />;
      borderCol = orange[500];
    } else {
      element = <DangerousIcon style={{ fill: red[500] }} />;
      borderCol = red[500];
    }

    return {
      icon: element,
      label: params.value,
      style: {
        borderColor: borderCol,
      },
    };
  } else
    return {
      label: 'Indefinido',
    };
}
