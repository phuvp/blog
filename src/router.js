import VueRouter from 'vue-router';

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/archive', component: () => import('@/components/Archive') },
    { path: '*', component: () => import('@/components/Login') },
    { path: '/login', component: () => import('@/components/Login') },
    { path: '/opener', component: () => import('@/components/Opener') },
  ],
});
