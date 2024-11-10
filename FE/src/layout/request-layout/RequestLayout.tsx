import { TRequestSidebarMenu } from '../../types';
import { Sidebar } from './Sidebar';

type Props = {
  menu: TRequestSidebarMenu[];
  children: React.ReactNode;
};

export const RequestLayout = ({ menu, children }: Props) => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar menu={menu} />
      <div className="flex-1 px-8 py-16 h-full overflow-y-scroll">{children}</div>
    </div>
  );
};
