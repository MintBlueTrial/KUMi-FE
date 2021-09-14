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
        {
          exact: true,
          path: '/board',
          component: '@/pages/taskBoard/index',
          title: 'KUMi - 任务看板',
        },
        {
          exact: true,
          path: '/list',
          component: '@/pages/taskList/index',
          title: 'KUMi - 任务列表',
        },
      ],
    },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
});
