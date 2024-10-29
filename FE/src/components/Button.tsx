import React from 'react';

type Props = {
	children: React.ReactNode;
	className: string;
};

export const Button = (props: Props) => {
	return <button {...props} className={`${props.className} p-4 rounded-md`} />;
};
