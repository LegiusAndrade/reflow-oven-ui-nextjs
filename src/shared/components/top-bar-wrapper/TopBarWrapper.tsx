import { TopBar } from '../top-bar/TopBar';

interface ITopBarWrapper {
  showiconWifi?: boolean;
  showIconWorld?: boolean;
  showIconNotification?: boolean;
  amountNotification?: number;
  messageStatus?: string;
}

// Server component to wrap the TopBar (which is a client component)
export const TopBarWrapper = (props: ITopBarWrapper) => {
  return <TopBar {...props} />;
};
