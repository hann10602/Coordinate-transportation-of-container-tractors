type Props = {
  title: string;
  id: string;
  isSelected?: boolean;
  children: React.ReactNode;
};

export const Card = ({ title, id, isSelected, children }: Props) => {
  return (
    <div className="border border-gray-400 rounded-lg overflow-hidden flex h-full w-full" id={id}>
      <div className={`${isSelected ? '' : 'hidden'} h-full w-3 bg-emerald-600`}></div>
      <div className="p-4 flex-1">
        <p className="text-sm font-bold">{title}</p>
        {children}
      </div>
    </div>
  );
};
