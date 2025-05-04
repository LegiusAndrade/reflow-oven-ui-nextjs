import { getDiagnosticConfig, getGeneralConfig, getNetworkConfig, getNotificationConfig } from '@/api';
import ConfigTabs from '@/shared/components/tabs/Tabs';

export default async function Configuracoes() {
  const [generalConfig, redeConfig, notificacoesConfig, diagnosticoConfig] = await Promise.all([
    getGeneralConfig(),
    getNetworkConfig(),
    getNotificationConfig(),
    getDiagnosticConfig(),
  ]);

  return (
    <ConfigTabs
      generalConfig={generalConfig}
      redeConfig={redeConfig}
      notificacoesConfig={notificacoesConfig}
      diagnosticoConfig={diagnosticoConfig}
    />
  );
}
