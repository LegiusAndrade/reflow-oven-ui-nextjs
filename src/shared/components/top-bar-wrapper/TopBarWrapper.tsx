import { TopBar } from '../top-bar/TopBar';

// Server component to wrap the TopBar (which is a client component)
export const TopBarWrapper = (props: React.ComponentProps<typeof TopBar>) => {
  return <TopBar {...props} />;
};
