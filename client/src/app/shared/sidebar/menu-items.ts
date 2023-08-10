import { RouteInfo, RouteUser } from './sidebar.metadata';

export const ROUTES: RouteUser[] = [
  {
    role: 'ROLE_ADMIN',
    routes:
    [
      {
        path: '/admin/dashboard',
        title: 'Dashbaord',
        icon: 'bi bi-speedometer2',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/admin/users',
        title: 'Users Management',
        icon: 'bi bi-speedometer2',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/admin/leagues',
        title: 'League Management',
        icon: 'bi bi-speedometer2',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/admin/academies',
        title: 'Academy Management',
        icon: 'bi bi-speedometer2',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/admin/squads',
        title: 'Squad Management',
        icon: 'bi bi-speedometer2',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/admin/teams',
        title: 'Team Management',
        icon: 'bi bi-speedometer2',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    role: 'ROLE_COACH',
    routes: [
      {
        path: '/coach',
        title: 'Dashboard',
        icon: 'bi bi-speedometer2',
        class: '',
        extralink: false,
        submenu: []
      },
      // {
      //   path: '/coach/leagues',
      //   title: 'League Management',
      //   icon: 'bi bi-bell',
      //   class: '',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/coach/teams',
      //   title: 'Team Management',
      //   icon: 'bi bi-patch-check',
      //   class: '',
      //   extralink: false,
      //   submenu: []
      // },
      {
        path: '/coach/squads',
        title: 'Squad Management',
        icon: 'bi bi-hdd-stack',
        class: '',
        extralink: false,
        submenu: []
      },
      // {
      //   path: '/component/card',
      //   title: 'Card',
      //   icon: 'bi bi-card-text',
      //   class: '',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/component/dropdown',
      //   title: 'Dropdown',
      //   icon: 'bi bi-menu-app',
      //   class: '',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/component/pagination',
      //   title: 'Pagination',
      //   icon: 'bi bi-dice-1',
      //   class: '',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/component/nav',
      //   title: 'Nav',
      //   icon: 'bi bi-pause-btn',
      //   class: '',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/component/table',
      //   title: 'Table',
      //   icon: 'bi bi-layout-split',
      //   class: '',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/about',
      //   title: 'About',
      //   icon: 'bi bi-people',
      //   class: '',
      //   extralink: false,
      //   submenu: []
      // }
    ]
  },
  {
    role: 'ROLE_REFEREE',
    routes: [
      {
        path: '/referee',
        title: 'Fixture Setup',
        icon: 'bi bi-speedometer2',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/referee/mangegames',
        title: 'Games Management',
        icon: 'bi bi-pause-btn',
        class: '',
        extralink: false,
        submenu: []
      },
      // {
      //   path: '/component/badges',
      //   title: 'Badges',
      //   icon: 'bi bi-patch-check',
      //   class: '',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/component/buttons',
      //   title: 'Button',
      //   icon: 'bi bi-hdd-stack',
      //   class: '',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/component/card',
      //   title: 'Card',
      //   icon: 'bi bi-card-text',
      //   class: '',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/component/dropdown',
      //   title: 'Dropdown',
      //   icon: 'bi bi-menu-app',
      //   class: '',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/component/pagination',
      //   title: 'Pagination',
      //   icon: 'bi bi-dice-1',
      //   class: '',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/component/nav',
      //   title: 'Nav',
      //   icon: 'bi bi-pause-btn',
      //   class: '',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/component/table',
      //   title: 'Table',
      //   icon: 'bi bi-layout-split',
      //   class: '',
      //   extralink: false,
      //   submenu: []
      // },
      // {
      //   path: '/about',
      //   title: 'About',
      //   icon: 'bi bi-people',
      //   class: '',
      //   extralink: false,
      //   submenu: []
      // }
    ]
  }
];
