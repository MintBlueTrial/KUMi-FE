import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [
        { exact: true, path: '/', component: '@/pages/home/index' },
        { exact: true, component: '@/pages/404/index' },
      ],
    },
  ],
  fastRefresh: {},
});
