import { BottomBarWrapper, TopBarWrapper } from '@/shared/components';

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

      <BottomBarWrapper />
    </div>
  );
}
