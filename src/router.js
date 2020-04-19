import VueRouter from 'vue-router';

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/archive', component: () => import('@/components/Archive') },
    { path: '*', component: () => import('@/components/Opener') },
  ],
});
