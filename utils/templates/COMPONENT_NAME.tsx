import { memo } from 'react';
import clsx from 'clsx';
import type { COMPONENT_NAMEProps } from './types';
import s from './COMPONENT_NAME.module.css';

const COMPONENT_NAME: React.FC<COMPONENT_NAMEProps> = ({ className }) => {
	return <div className={clsx(s.wrap, className)}>{COMPONENT_NAME}</div>;
};

export default memo(COMPONENT_NAME);
