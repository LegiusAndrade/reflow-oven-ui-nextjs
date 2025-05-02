import { TopBarWrapper } from '@/shared/components/top-bar-wrapper/TopBarWrapper';

export default function Home() {
  return (
    <div>
      <TopBarWrapper
        amountNotification={10}
        messageStatus="Testando"
        showIconNotification={true}
        showIconWorld={true}
        showiconWifi={true}
      ></TopBarWrapper>

      <h1>Reflow Oven</h1>
    </div>
  );
}
