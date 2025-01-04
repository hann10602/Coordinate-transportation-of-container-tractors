type Props = {
  title: string;
  id: string;
  className?: string;
  isSelected?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

export const Card = ({ title, id, isSelected, children, onClick, className }: Props) => {
  return (
    <div
      className={`relative border border-gray-400 rounded-lg overflow-hidden flex h-fit w-full`}
      id={id}
      onClick={onClick}
    >
      <div className={`${isSelected ? '' : 'hidden'} absolute left-0 top-0 h-full w-3 bg-emerald-600`}></div>
      <div className={`${className} p-10 flex-1`}>
        <p className="font-bold mb-10">{title}</p>
        {children}
      </div>
    </div>
  );
};
