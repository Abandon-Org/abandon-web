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
  routes,
  npmClient: 'npm',
});

