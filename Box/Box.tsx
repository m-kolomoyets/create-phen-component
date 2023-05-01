import { memo } from 'react';
import clsx from 'clsx';
import type { BoxProps } from './types';
import s from './Box.module.css';

const Box: React.FC<BoxProps> = ({ className }) => {
	return <div className={clsx(s.wrap, className)}>Box</div>;
};

export default memo(Box);
