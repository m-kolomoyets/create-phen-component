import type { Meta, StoryObj } from '@storybook/react';
import type { COMPONENT_NAMEProps } from './types';
import COMPONENT_NAME from './COMPONENT_NAME';

const meta = {
	title: 'ui/COMPONENT_NAME',
	component: COMPONENT_NAME,
	tags: ['autodocs'],
} satisfies Meta<typeof COMPONENT_NAME>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {} as COMPONENT_NAMEProps,
};
