import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const Button = (props: Props) => {
  return (
    <button
      {...props}
      className={`${props.className} flex justify-center items-center h-12 w-40 bg-black rounded-md`}
    />
  );
};
