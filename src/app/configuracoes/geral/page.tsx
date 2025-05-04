'use client';
import { useEffect, useRef } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import SaveIcon from '@mui/icons-material/Save';
import { Button, Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import { Box, Theme } from '@mui/system';

import { putGeneralConfig } from '@/api';
import { VGrid } from '@/shared/forms';
import { GeneralConfig } from '@/shared/types';

interface GeneralConfigProps {
  data: GeneralConfig | null;
}

export default function Geral({ data }: GeneralConfigProps) {
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const formRef = useRef<FormHandles>(null);

  const handleSave = (dados: GeneralConfig) => {
    putGeneralConfig(dados);
  };

  useEffect(() => {
    if (data) {
      formRef.current?.setData(data);
    }
  }, [data]);

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
      <Form ref={formRef} onSubmit={handleSave}>
        <VGrid
          tituloItem="PID"
          pathScope=""
          grupoItens={[
            {
              labelTextField: 'P',
              valueTextField: data?.configP?.toString() ?? 'P',
              textHelperText: 'P deve estar entre 0,0 e 10,0',
              nameTextField: 'configP',
              gridItem: 4,
            },
            {
              labelTextField: 'I',
              valueTextField: data?.configI?.toString() || 'I',
              textHelperText: 'I deve estar entre 0,0 e 10,0',
              nameTextField: 'configI',
              gridItem: 4,
            },
            {
              labelTextField: 'D',
              valueTextField: data?.configD?.toString() || 'D',
              textHelperText: 'D deve estar entre 0,0 e 10,0',
              nameTextField: 'configD',
              gridItem: 4,
            },
          ]}
        />
        <VGrid
          tituloItem="Forno"
          pathScope=""
          grupoItens={[
            {
              labelTextField: 'Temperatura Máxima',
              valueTextField: data?.ovenTemperatureMax?.toString() || 'Temperatura Máxima',
              textHelperText: 'A temperatura máxima deve ser menor que 230°C',
              nameTextField: 'ovenTemperatureMax',
              labelSuffix: '°C',
              gridItem: 6,
            },
            {
              labelTextField: 'Máxima velocidade do ventilador',
              valueTextField: data?.ovenFanRPMMax?.toString() || 'Máxima velocidade do ventilador',
              textHelperText: 'A velocidade máxima deve ser menor que 3000RPM',
              nameTextField: 'ovenFanRPMMax',
              labelSuffix: 'RPM',
              gridItem: 6,
            },
          ]}
        />
        <VGrid
          tituloItem="Processo"
          pathScope=""
          grupoItens={[
            {
              labelTextField: 'Tempo máximo de processo',
              valueTextField: data?.processTimeMax?.toString() || 'Tempo máximo de processo',
              textHelperText: 'O tempo máximo de processo deve ser menor que 60min',
              nameTextField: 'processTimeMax',
              labelSuffix: 'min',
              gridItem: 6,
            },
          ]}
        />
        <VGrid
          tituloItem="Tensão de Alimentação"
          pathScope=""
          grupoItens={[
            {
              labelTextField: 'Tensão de Alimentação',
              valueTextField: data?.minVoltageInput?.toString() || 'Tensão de Alimentação',
              textHelperText: 'Mínima tensão de alimentação sem dar erro',
              nameTextField: 'minVoltageInput',
              labelSuffix: 'V',
              gridItem: 6,
            },
            {
              labelTextField: 'Tensão de Alimentação',
              valueTextField: data?.maxVoltageInput?.toString() || 'Tensão de Alimentação',
              textHelperText: 'Máxima tensão de alimentação sem dar erro',
              nameTextField: 'maxVoltageInput',
              labelSuffix: 'V',
              gridItem: 6,
            },
          ]}
        />
        <Grid container item direction="row" padding={2} justifyContent="flex-end">
          <Grid item>
            <Button
              onClick={() => formRef.current?.submitForm()}
              color="primary"
              disableElevation
              variant="contained"
              startIcon={<SaveIcon />}
            >
              <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                Salvar
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Box>
  );
}
