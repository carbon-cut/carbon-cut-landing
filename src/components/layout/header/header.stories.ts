import { StoryObj } from '@storybook/nextjs-vite';
import Header from './index';
import next from 'next';

const meta = {
  title: 'Layout/Header',
  component: Header,

} as const;

export default meta;
type Story = StoryObj< typeof meta>;


export const mainPage: Story = {
    parameters:{
        nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/'
      }
    }
    }
}


export const formPages: Story = {
    args:{

    }
}
