import { lazy } from 'react';

const DashBoard = lazy(() => import('../pages/Dashboard'));
const UsersPage = lazy(() => import('../pages/Form/UsersPage'));
const LogsPage = lazy(() => import('../pages/Form/LogsPage'));
const ManualPushPage = lazy(() => import('../pages/Form/ManualPushPage'));
const PositionsPage = lazy(() => import('../pages/Form/PositionsPage'));
const FormLayout = lazy(() => import('../pages/Form/ApiSetting'));
const Settings = lazy(() => import('../pages/Settings'));
const ReportBalancePage = lazy(() => import('../pages/ReportBalancePage'));
const ReportPnLPage = lazy(() => import('../pages/ReportPnLPage'));
const ReportuPnLPage = lazy(() => import('../pages/ReportuPnLPage'));
const ReportCoinLeaderBoard = lazy(
  () => import('../pages/ReportCoinLeaderBoard'),
);

const coreRoutes = [
  {
    path: '/dashboard/',
    title: 'DashBoard',
    component: DashBoard,
  },
  {
    path: '/api-detail',
    title: 'ApiDetail',
    component: FormLayout,
  },
  {
    path: '/users',
    title: 'Users',
    component: UsersPage,
  },
  {
    path: '/positions',
    title: 'Positions',
    component: PositionsPage,
  },
  {
    path: '/logs',
    title: 'Logs',
    component: LogsPage,
  },
  {
    path: '/manualpush',
    title: 'ManualPushPage',
    component: ManualPushPage,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/report-balance',
    title: 'Balance',
    component: ReportBalancePage,
  },
  {
    path: '/report-pnl',
    title: 'PnL',
    component: ReportPnLPage,
  },
  {
    path: '/report-upnl',
    title: 'PnL',
    component: ReportuPnLPage,
  },
  {
    path: '/reports-coins-leaderboard',
    title: 'PnL',
    component: ReportCoinLeaderBoard,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
];

const routes = [...coreRoutes];
export default routes;
