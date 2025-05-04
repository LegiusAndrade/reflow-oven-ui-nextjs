'use client';
import React, { useState, useEffect } from 'react';

import { Box, Chip, Grid, Paper, Theme, Typography, useMediaQuery } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams, GridRowsProp } from '@mui/x-data-grid';

import { ActionTypeNotification, getChipProps } from '@/functions';
import { ButtonComponent } from '@/shared/components';
import { VDialog } from '@/shared/components/vDialog/VDialog';
import { DiagnosticoConfig } from '@/shared/types';

enum EDialogTest {
  AUTOMATIC = 0,
  MANUAL,
}

interface DiagnosticoConfigProps {
  data: DiagnosticoConfig[] | null;
}

export default function Diagnostico({ data }: DiagnosticoConfigProps) {
  const [openDialogTestAutomatic, setOpenDialogTestAutomatic] = useState(false);
  const [openDialogTestManual, setOpenDialogTestManual] = useState(false);
  const [rows, setRows] = useState<GridRowsProp>([]);

  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  useEffect(() => {
    if (data) {
      const mappedRows = data.map((row, index) => ({
        id: index + 1,
        dateAlert: new Date(row.dateAlert),
        nameAlert: row.nameAlert,
        processAlert: row.processAlert,
        typeAlert: row.typeAlert,
      }));
      setRows(mappedRows);
    } else {
      setRows([]);
    }
  }, [data]);

  const handleClickOpen = (dialogNumber: EDialogTest) => {
    if (dialogNumber === EDialogTest.AUTOMATIC) {
      setOpenDialogTestAutomatic(true);
    } else {
      setOpenDialogTestManual(true);
    }
  };

  const handleClose = (dialogNumber: EDialogTest) => {
    if (dialogNumber === EDialogTest.AUTOMATIC) {
      setOpenDialogTestAutomatic(false);
    } else {
      setOpenDialogTestManual(false);
    }
  };

  const handleStartTest = (dialogNumber: EDialogTest) => {
    // Implementar lógica de teste aqui
    handleClose(dialogNumber);
  };

  const columns: GridColDef[] = [
    {
      field: 'dateAlert',
      headerName: 'Data',
      type: 'dateTime',
      width: 160,
    },
    {
      field: 'nameAlert',
      headerName: 'Alerta',
      width: lgDown ? 400 : 400,
    },
    {
      field: 'processAlert',
      headerName: 'Erro durante processo',
      width: 180,
      valueGetter: (params: GridValueGetterParams) => (params.row.processAlert === 0 ? 'Não' : 'Sim'),
    },
    {
      field: 'typeAlert',
      headerName: 'Tipo de Notificação',
      type: 'string',
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        ActionTypeNotification[params.row.typeAlert]?.msg || 'Valor desconhecido',
      renderCell: (params) => <Chip variant="outlined" {...getChipProps(params)} />,
    },
  ];

  return (
    <Box
      margin={1}
      sx={{ maxHeight: lgDown ? '62vh' : '100vh' }}
      style={{ overflow: 'auto' }}
      display="flex"
      flexDirection="column"
      component={Paper}
      variant="outlined"
    >
      {data === null && (
        <Typography color="error" padding={2}>
          Erro ao carregar dados de diagnóstico
        </Typography>
      )}
      <Grid container direction="column" padding={2}>
        <Grid item>
          <Typography variant="h6" paddingBottom={2}>
            Erros ativos
          </Typography>
        </Grid>
        <Grid container item direction="row" spacing={2} paddingLeft={2}>
          <DataGrid
            style={{ overflow: 'auto', height: lgDown ? '30vh' : '30vh' }}
            hideFooter
            rows={rows}
            columns={columns}
            editMode="row"
          />
        </Grid>
      </Grid>
      <Grid container direction="column" padding={2}>
        <Grid item>
          <Typography variant="h6" paddingBottom={2}>
            Teste da placa
          </Typography>
        </Grid>
        <Grid container item direction="row">
          <Grid item>
            <ButtonComponent
              icon="brightness_auto"
              texto="Automático"
              variant="contained"
              aoClicarNoBotao={() => handleClickOpen(EDialogTest.AUTOMATIC)}
            />
          </Grid>
          <Grid item paddingLeft={2}>
            <ButtonComponent
              icon="format_indent_increase"
              texto="Manual"
              variant="contained"
              aoClicarNoBotao={() => handleClickOpen(EDialogTest.MANUAL)}
            />
          </Grid>
        </Grid>
        <Grid container item direction="row">
          <VDialog
            textoTituloDialog="Teste automático"
            textoCorpoDialog={`
              O teste automático consiste em acionar periféricos do equipamento e o próprio sistema constatar seu funcionamento. Os seguintes testes serão realizados:
              - Ventilador da PCB
              - Ventilador do Forno
              - Resistência do Forno
            `}
            stateOpenDialog={openDialogTestAutomatic}
            aoFecharODialog={() => handleClose(EDialogTest.AUTOMATIC)}
            grupoBotoes={[
              {
                tituloBotao: 'Cancelar',
                aoClicarNoBotao: () => handleClose(EDialogTest.AUTOMATIC),
              },
              {
                tituloBotao: 'Iniciar',
                aoClicarNoBotao: () => handleStartTest(EDialogTest.AUTOMATIC),
              },
            ]}
          />
          <VDialog
            textoTituloDialog="Teste manual"
            textoCorpoDialog={`
              O teste manual consiste em acionar periféricos do equipamento e o usuário constatar seu funcionamento. Os seguintes testes serão realizados:
              - Buzzer
              - Sensor de temperatura PCB
              - Sensor de temperatura do forno
              - LED de Status da PCB
              - LED de Comunicação da PCB
              - Relé da PCB
              - Ventilador da PCB
              - Ventilador do Forno
              - Resistência do Forno
            `}
            stateOpenDialog={openDialogTestManual}
            aoFecharODialog={() => handleClose(EDialogTest.MANUAL)}
            grupoBotoes={[
              {
                tituloBotao: 'Cancelar',
                aoClicarNoBotao: () => handleClose(EDialogTest.MANUAL),
              },
              {
                tituloBotao: 'Iniciar',
                aoClicarNoBotao: () => handleStartTest(EDialogTest.MANUAL),
              },
            ]}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
