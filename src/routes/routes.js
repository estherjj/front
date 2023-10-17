import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Page404 from '../pages/Page404';

const Loadable = (Component) => (props) => {
  return (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );
};

const Router = ({ isAdminMode, setIsAdminMode }) => {
  return useRoutes([
    {
      path: '/mr',
      element: (
        <Layout isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      ),
      children: [
        { element: <Navigate to="/mr/dashboard" />, index: true },
        { path: 'dashboard', element: <MrUserDashboardPage /> },
        { path: 'reservation', element: <MrUserRegistherPage /> },
        { path: ':id', element: <MrUserMrDetailPage /> },
        { path: 'inquiry', element: <MrUserMrInquiryPage /> }
      ]
    },
    {
      path: '/car/admin',
      element: (
        <Layout isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      ),
      children: [
        { element: <Navigate to="/car/carList" />, index: true },
        {
          path: 'carList',
          element: (
            <CarAdminRegisterPage
              isAdminMode={isAdminMode}
              setIsAdminMode={setIsAdminMode}
            />
          )
        },
        {
          path: 'example',
          element: (
            <CarAdminExamplePage />
          )
        }
      ]
    },
    {
      path: '/mr/admin',
      element: (
        <Layout isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      ),
      children: [
        { element: <Navigate to="admin/mr/dashboard" />, index: true },
        { path: 'MrList', element: <MrAdminMrListPage /> },
        { path: 'MrRegister', element: <MrAdminRegisterPage /> },
        { path: 'Notice', element: <MrAdminNoticePage /> },
        { path: 'Test', element: <MrAdminTestPage /> }
      ]
    },
    {
      element: (
        <Layout isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      ),
      children: [
        { element: <Navigate to="/" />, index: true },
        { path: '*', element: <Page404 /> }
      ]
    },
    {
      path: '/carRez',
      element: (
        <Layout isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      ),
      children: [
        { element: <Navigate to="/carRez/dashboard" />, index: true },
        { path: 'dashboard', element: <CarUserDashboardPage /> },
        { path: 'reservation', element: <CarUserRegisterPage /> },
        { path: 'carRezComplete', element: <CarRezCompletePage /> }
      ]
    }
  ]);
};

export default Router;

const MrUserDashboardPage = Loadable(
  lazy(() => import('../pages/mr_user/Dashboard'))
);

const MrUserRegistherPage = Loadable(
  lazy(() => import('../pages/mr_user/Register'))
);

const MrUserMrDetailPage = Loadable(
  lazy(() => import('../pages/mr_user/detail/MrDetailPage'))
);

const MrUserMrInquiryPage = Loadable(
  lazy(() => import('../pages/mr_user/inquiry/MrInquiryPage'))
);

const CarAdminRegisterPage = Loadable(
  lazy(() => import('../pages/car_admin/Register'))
);

const CarUserDashboardPage = Loadable(
  lazy(() => import('../pages/car_user/Dashboard'))
);

const MrAdminRegisterPage = Loadable(
  lazy(() => import('../pages/mr_admin/MrRegister'))
);
const MrAdminMrListPage = Loadable(
  lazy(() => import('../pages/mr_admin/MrList'))
);
const MrAdminNoticePage = Loadable(
  lazy(() => import('../pages/mr_admin/MrNotice'))
);
const MrAdminTestPage = Loadable(
  lazy(() => import('../pages/mr_admin/DashBoard'))
);
const CarUserRegisterPage = Loadable(
  lazy(() => import('../pages/car_user/Register'))
);

const CarAdminExamplePage = Loadable(
  lazy(() => import('../pages/car_admin/Example'))
)
const CarRezCompletePage = Loadable(
  lazy(() => import('../pages/car_user/CarRezComplete'))
);
