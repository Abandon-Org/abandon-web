import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    favicon: 'favicon.ico',
  },
  dva:{}, //开启dva
  routes,
  npmClient: 'npm',
});

