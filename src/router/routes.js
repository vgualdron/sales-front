const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'Iniciar Sesión', component: () => import('pages/Login.vue') },
    ],
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Inicio', component: () => import('pages/Home.vue') },
    ],
  },
  {
    path: '/role',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Roles',
        component: () => import('pages/Role.vue'),
        meta: { permissions: ['role.list'] },
      },
    ],
  },
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Usuarios',
        component: () => import('pages/User.vue'),
        meta: { permissions: ['user.list'] },
      },
    ],
  },
  {
    path: '/new',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Recolección de direcciones',
        component: () => import('pages/New.vue'),
        meta: { permissions: ['new.list'] },
      },
    ],
  },
  {
    path: '/param',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Parametros',
        component: () => import('pages/Configuration.vue'),
        meta: { permissions: ['parameter.list'] },
      },
    ],
  },
  {
    path: '/report-dinamic',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Reportes Dinamicos',
        component: () => import('pages/ReportDinamic.vue'),
        meta: { permissions: ['reportsDinamic.list'] },
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
  {
    path: '/unauthorized',
    component: () => import('pages/Error401.vue'),
  },
];

export default routes;
