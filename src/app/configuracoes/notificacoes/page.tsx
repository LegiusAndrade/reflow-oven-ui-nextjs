'use client';
import React, { useState, useEffect } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import WarningIcon from '@mui/icons-material/Warning';
import { Box, Chip, ChipProps, Paper, styled, Theme, useMediaQuery } from '@mui/material';
import { blue, green, orange, red } from '@mui/material/colors';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
  GridRowModel,
} from '@mui/x-data-grid';

import { putNotificationConfig } from '@/api';

import { ActionTypeNotification } from '@/functions';
import { NotificacaoConfig } from '@/types/api';

const StyledBox = styled(Box)(({ theme }) => ({
  height: 300,
  width: '100%',
  '& .MuiDataGrid-cell--editing': {
    backgroundColor: 'rgb(255,215,115, 0.19)',
    color: '#1a3e72',
    '& .MuiInputBase-root': {
      height: '100%',
    },
  },
  '& .Mui-error': {
    backgroundColor: `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
    color: theme.palette.error.main,
  },
}));

interface NotificacaoConfigProps {
  data: NotificacaoConfig[] | null;
}

interface RowData {
  id: number;
  alertName: number;
  continueProcess: boolean;
  activeBuzzer: EActionBuzzerAlert;
  songBuzzer: number;
  typeNotification: number;
  continueProcessString: string;
  songBuzzerString: string;
  typeNotificationString: string;
}

const AlertNameMap: Array<{ id: number; msg: string }> = [
  { id: 0, msg: 'Fault' },
  { id: 1, msg: 'Excesso de temperatura Forno' },
  { id: 2, msg: 'Excesso de temperatura Placa' },
  { id: 3, msg: 'Temperatura não atingida no tempo limite' },
  { id: 4, msg: 'Ventilador PCB parado' },
  { id: 5, msg: 'Sensor temperatura do forno com falha' },
  { id: 6, msg: 'Sensor temperatura da placa com falha' },
  { id: 7, msg: 'Tensão da rede abaixo do valor estipulado' },
  { id: 8, msg: 'Tensão da rede acima do valor estipulado' },
  { id: 9, msg: 'Tensão de alimentação da placa abaixo do valor estipulado' },
  { id: 10, msg: 'Tensão de alimentação da placa acima do valor estipulado' },
];

const ActionContinueProcess: Array<{ id: number; enumConc: string; msg: string }> = [
  { id: 0, enumConc: 'STOP_PROCESS', msg: 'Parar Processo' },
  { id: 1, enumConc: 'CONTINUE_PROCESS', msg: 'Continuar Processo' },
];

enum EActionBuzzerAlert {
  DISABLE = 0,
  ENABLE,
}

const ActionSongBuzzer: Array<{ id: number; enumConc: string; msg: string }> = [
  { id: 0, enumConc: 'CONTINUE', msg: 'Contínuo' },
  { id: 1, enumConc: 'PULSE', msg: 'Pulsante' },
];

function getChipProps(params: GridRenderCellParams): ChipProps {
  if (params.value === ActionTypeNotification[0].msg) {
    return {
      icon: <FmdBadIcon style={{ fill: blue[500] }} />,
      label: params.value,
      style: { borderColor: blue[500] },
    };
  } else if (params.value === ActionTypeNotification[1].msg) {
    return {
      icon: <CheckCircleIcon style={{ fill: green[500] }} />,
      label: params.value,
      style: { borderColor: green[500] },
    };
  } else if (params.value === ActionTypeNotification[2].msg) {
    return {
      icon: <WarningIcon style={{ fill: orange[500] }} />,
      label: params.value,
      style: { borderColor: orange[500] },
    };
  } else if (params.value === ActionTypeNotification[3].msg) {
    return {
      icon: <DangerousIcon style={{ fill: red[500] }} />,
      label: params.value,
      style: { borderColor: red[500] },
    };
  } else {
    return { label: 'Indefinido' };
  }
}

export default function Notificacoes({ data }: NotificacaoConfigProps) {
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  const [rows, setRows] = useState<RowData[]>([]);

  useEffect(() => {
    if (data) {
      const mappedRows = data.map((row, index) => ({
        id: index + 1,
        alertName: row.alertName,
        continueProcess: row.continueProcess,
        activeBuzzer: row.activeBuzzer,
        songBuzzer: row.songBuzzer,
        typeNotification: row.typeNotification,
        continueProcessString: ActionContinueProcess[row.continueProcess ? 1 : 0].msg,
        songBuzzerString: ActionSongBuzzer[row.songBuzzer].msg,
        typeNotificationString: ActionTypeNotification[row.typeNotification].msg,
      }));
      setRows(mappedRows);
    }
  }, [data]);

  const columns: GridColDef[] = [
    {
      field: 'alertName',
      headerName: 'Alerta',
      width: lgDown ? 400 : 400,
      valueGetter: (params: GridValueGetterParams) => {
        const id = params.row.alertName;
        const found = AlertNameMap.find((e) => e.id === id);
        return found ? found.msg : 'Valor desconhecido';
      },
    },
    {
      field: 'continueProcessString',
      headerName: 'Processo',
      type: 'singleSelect',
      valueOptions: ActionContinueProcess.map((el) => el.msg),
      width: 160,
      editable: true,
    },
    {
      field: 'activeBuzzer',
      headerName: 'Buzzer',
      type: 'boolean',
      width: 100,
      editable: true,
    },
    {
      field: 'songBuzzerString',
      headerName: 'Som do Buzzer',
      type: 'singleSelect',
      valueOptions: ActionSongBuzzer.map((el) => el.msg),
      width: 150,
      editable: true,
      renderCell: (params) => (params.row.activeBuzzer ? params.value : 'Inoperante'),
    },
    {
      field: 'typeNotificationString',
      headerName: 'Tipo de Notificação',
      type: 'singleSelect',
      valueOptions: ActionTypeNotification.map((el) => el.msg),
      width: 150,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        ActionTypeNotification[params.row.typeNotification]?.msg || 'Valor desconhecido',
      renderCell: (params) => <Chip variant="outlined" {...getChipProps(params)} />,
    },
  ];

  const processRowUpdate = React.useCallback(async (newRow: GridRowModel) => {
    const updatedRow: RowData = {
      id: newRow.id,
      alertName: newRow.alertName,
      activeBuzzer: newRow.activeBuzzer,
      continueProcessString: newRow.continueProcessString,
      songBuzzerString: newRow.songBuzzerString,
      typeNotificationString: newRow.typeNotificationString,
      continueProcess:
        ActionContinueProcess.find((e) => e.msg === newRow.continueProcessString)?.id === 0 ? false : true,
      songBuzzer: ActionSongBuzzer.find((e) => e.msg === newRow.songBuzzerString)?.id || 0,
      typeNotification: ActionTypeNotification.find((e) => e.msg === newRow.typeNotificationString)?.id || 0,
    };

    const { continueProcessString, songBuzzerString, typeNotificationString, id, ...payload } = updatedRow;

    setRows((prevRows) => prevRows.map((row) => (row.alertName === newRow.alertName ? updatedRow : row)));

    await putNotificationConfig(payload, updatedRow.alertName);
    return updatedRow;
  }, []);

  return (
    <Box
      margin={1}
      style={{ overflow: 'auto', height: lgDown ? '62vh' : '73vh' }}
      display="flex"
      flexDirection="column"
      component={Paper}
      variant="outlined"
    >
      <StyledBox>
        <DataGrid
          style={{ overflow: 'auto', height: lgDown ? '62vh' : '73vh' }}
          hideFooter
          getRowId={(row) => row.alertName}
          rows={rows}
          columns={columns}
          editMode="row"
          isCellEditable={(params) =>
            params.row.activeBuzzer || (!params.row.activeBuzzer && params.field !== 'songBuzzerString')
          }
          processRowUpdate={processRowUpdate}
        />
      </StyledBox>
    </Box>
  );
}
