'use client';
import { useEffect, useRef, useState } from 'react';

import { FormHandles, Scope } from '@unform/core';
import { Form } from '@unform/web';

import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperTextProps,
  Grid,
  Paper,
  Stack,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { putNetworkConfig } from '@/api';
import { VTextField } from '@/shared/forms';
import { RedeConfig } from '@/shared/types';

const HelperText = ({ children }: FormHelperTextProps) => (
  <Stack>
    <Typography fontSize={'15px'} color={'#999999'}>
      {children}
    </Typography>
  </Stack>
);

interface RedeConfigProps {
  data: RedeConfig | null;
}

export default function Rede({ data }: RedeConfigProps) {
  const [configStaticIP, setConfigStaticIP] = useState(true);

  const theme = useTheme();
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const formRef = useRef<FormHandles>(null);
  const handleSave = (dados: RedeConfig) => {
    dados.staticIP = configStaticIP;
    putNetworkConfig(dados);
    //console.log(dados);
  };

  useEffect(() => {
    formRef.current?.setData(data!);
    setConfigStaticIP(data?.staticIP ?? true);
  }, [data]);

  return (
    <Box
      margin={1}
      style={{ overflow: 'auto', height: lgDown ? '62vh' : '73vh' }}
      display="flex"
      flexDirection="column"
      component={Paper}
      variant="outlined"
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <Grid container direction="column" padding={2}>
          <Grid item>
            <Typography variant="h6" paddingBottom={2}>
              Rede
            </Typography>
          </Grid>
          <Scope path={''}>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={4}>
                <VTextField
                  label="Endereço IP"
                  defaultValue={data?.ipV4?.toString() ?? 'Endereço IP'}
                  variant="outlined"
                  name="ipV4"
                  textHelperText="Exemplo: xxx.xxx.xxx.xxx"
                  fullWidth
                  disabled={!configStaticIP}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" paddingTop={2} spacing={2}>
              <Grid item xs={4}>
                <VTextField
                  label="Máscara Sub-Rede"
                  defaultValue={data?.subnetMask?.toString() ?? 'Máscara Sub-Rede'}
                  variant="outlined"
                  name="subnetMask"
                  textHelperText="Exemplo: xxx.xxx.xxx.xxx"
                  fullWidth
                  disabled={!configStaticIP}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" paddingTop={2} spacing={2}>
              <Grid item xs={4}>
                <VTextField
                  label={'Gateway Padrão'}
                  defaultValue={data?.defaultGateway?.toString() ?? 'Gateway Padrão'}
                  variant="outlined"
                  name="defaultGateway"
                  textHelperText="Exemplo: xxx.xxx.xxx.xxx"
                  fullWidth
                  disabled={!configStaticIP}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" paddingTop={2} spacing={2}>
              <Grid item xs={4}>
                <VTextField
                  label={'Servidor DNS Principal'}
                  defaultValue={data?.primaryDNS?.toString() ?? 'Servidor DNS Principal'}
                  variant="outlined"
                  name="primaryDNS"
                  textHelperText="Exemplo: xxx.xxx.xxx.xxx"
                  fullWidth
                  disabled={!configStaticIP}
                />
              </Grid>
              <Grid item xs={4}>
                <VTextField
                  label={'Servidor DNS Secundário'}
                  defaultValue={data?.secondaryDNS?.toString() ?? 'Servidor DNS Secundário'}
                  variant="outlined"
                  name="secondaryDNS"
                  textHelperText="Exemplo: xxx.xxx.xxx.xxx"
                  fullWidth
                  disabled={!configStaticIP}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" paddingTop={2} spacing={2}>
              <Grid item xs={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => {
                        setConfigStaticIP(e.target.checked);
                      }}
                      checked={configStaticIP}
                    />
                  }
                  label={
                    <Typography
                      variant="body1" //Typography aplica diversas estilizações e acaba removendo, dai isso adiciona a estilização do botão
                      whiteSpace="nowrap" //Não quebra a linha do texto
                      textOverflow="ellipsis" //Coloca '...' no fim
                      overflow="hidden" //Impede que apareça uma barra de scroll
                    >
                      IP Fixo
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {configStaticIP && (
              <Grid container item direction="row" paddingTop={2} spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    label="Endereço IP para ping"
                    variant="outlined"
                    name=""
                    FormHelperTextProps={{ component: HelperText }}
                    helperText="Exemplo: xxx.xxx.xxx.xxx"
                    fullWidth
                    disabled={!configStaticIP}
                  />
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => formRef.current?.submitForm()}
                    color="primary"
                    disableElevation
                    variant={'contained'}
                    startIcon={<SaveIcon />}
                  >
                    <Typography
                      variant="button" //Typography aplica diversas estilizações e acaba removendo, dai isso adiciona a estilização do botão
                      whiteSpace="nowrap" //Não quebra a linha do texto
                      textOverflow="ellipsis" //Coloca '...' no fim
                      overflow="hidden" //Impede que apareça uma barra de scroll
                    >
                      Teste Ping
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            )}
          </Scope>
        </Grid>

        <Grid container item direction="row" justifyContent="flex-end" padding={2}>
          <Grid item>
            <Button
              onClick={() => formRef.current?.submitForm()}
              color="primary"
              disableElevation
              variant={'contained'}
              startIcon={<SaveIcon />}
            >
              <Typography
                variant="button" //Typography aplica diversas estilizações e acaba removendo, dai isso adiciona a estilização do botão
                whiteSpace="nowrap" //Não quebra a linha do texto
                textOverflow="ellipsis" //Coloca '...' no fim
                overflow="hidden" //Impede que apareça uma barra de scroll
              >
                Salvar
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Box>
  );
}
