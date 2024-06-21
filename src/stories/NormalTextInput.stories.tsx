import type { Meta, StoryObj } from '@storybook/react';
import { NormalTextInput } from '../components';

const meta: Meta<typeof NormalTextInput> = {
    component: NormalTextInput,
    title: 'NormalTextInput',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const PasswordInput: Story = {
    args: {
        typePassword: true,
    },
};

export const Normal: Story = {
    args: {},
};
