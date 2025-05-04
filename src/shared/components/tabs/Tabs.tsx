'use client';
import { useState } from 'react';

import AnnouncementIcon from '@mui/icons-material/Announcement';
import ApiIcon from '@mui/icons-material/Api';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { Box, Tab } from '@mui/material';

import Diagnostico from '@/app/configuracoes/diagnostico/page';
import Geral from '@/app/configuracoes/geral/page';
import Notificacoes from '@/app/configuracoes/notificacoes/page';
import Rede from '@/app/configuracoes/rede/page';
import { DiagnosticoConfig, GeneralConfig, NotificacaoConfig, RedeConfig } from '@/shared/types';

interface ConfigTabsProps {
  generalConfig: GeneralConfig | null;
  redeConfig: RedeConfig | null;
  notificacoesConfig: NotificacaoConfig[] | null;
  diagnosticoConfig: DiagnosticoConfig[] | null;
}

export default function ConfigTabs({
  generalConfig,
  redeConfig,
  notificacoesConfig,
  diagnosticoConfig,
}: ConfigTabsProps) {
  const [tabValue, setTabValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <Box display="flex" flexDirection="column" style={{ width: '100%', height: '80vh' }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Configurações do equipamento">
            <Tab icon={<DisplaySettingsIcon />} iconPosition="start" value="1" label="Geral" />
            <Tab icon={<PermDataSettingIcon />} iconPosition="start" value="2" label="Rede" />
            <Tab icon={<AnnouncementIcon />} iconPosition="start" value="3" label="Notificações" />
            <Tab icon={<ApiIcon />} iconPosition="start" value="4" label="Diagnóstico" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Geral data={generalConfig} />
        </TabPanel>
        <TabPanel value="2">
          <Rede data={redeConfig} />
        </TabPanel>
        <TabPanel value="3">
          <Notificacoes data={notificacoesConfig} />
        </TabPanel>
        <TabPanel value="4">
          <Diagnostico data={diagnosticoConfig} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
