import { Icon } from '@iconify/react/dist/iconify.js';
import { useSearchParams } from 'react-router-dom';
import { TRequestSidebarMenu } from '../../types';

type Props = {
  menu: TRequestSidebarMenu[];
};

export const Sidebar = ({ menu }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const section = searchParams.get('section');

  const handleChangeSection = (item: string) => {
    if (section === item) return;
    const newParams = new URLSearchParams(searchParams);
    newParams.set('section', item);

    setSearchParams(newParams);
  };

  return (
    <div className="border-r border-gray-400 h-full w-[240px]">
      {menu.map((item) => (
        <div
          key={item.code}
          className="flex items-center justify-between gap-x-2 cursor-pointer px-4 py-4"
          onClick={() => handleChangeSection(item.code)}
        >
          {section === item.code ? (
            <Icon icon="material-symbols-light:circle" className="text-emerald-600" />
          ) : (
            <Icon icon="material-symbols-light:circle-outline" />
          )}
          <div className="flex-1">{item.title}</div>
        </div>
      ))}
    </div>
  );
};
