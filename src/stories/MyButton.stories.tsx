import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MyButton } from '../components';

const meta: Meta<typeof MyButton> = {
    component: MyButton,
    title: 'MyButton',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
    args: {
        onClick: action('click-button'),
        textButton: 'Click me!',
    },
};
