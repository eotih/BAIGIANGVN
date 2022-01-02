import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Profile from './pages/Profile';
import Invest from './pages/Invest';
import Products from './pages/Products';
import History from './pages/History';
// import Blog from './pages/Blog';
import NotFound from './pages/Page404';
import isAdmin from './services/auth';
//
import UserAdmin from './pages/Admin/User';
import NewsAdmin from './pages/Admin/News';
import TrashbinNewsAdmin from './pages/Admin/Trash-bin-news';
import Transfer from './pages/Admin/Transfer';
import LessonAdmin from './pages/Admin/Lessons';

// ----------------------------------------------------------------------

export default function Router() {
  const admin = isAdmin();
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'products', element: <Products /> },
        { path: 'taikhoan', element: <Profile /> },
        { path: 'naptien', element: <Invest /> },
        { path: 'lichsu', element: <History /> }
      ]
    },
    {
      path: '/admin',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        {
          path: 'users',
          element: admin ? <UserAdmin /> : <NotFound />
        },
        {
          path: 'lessons',
          element: admin ? <LessonAdmin /> : <NotFound />
        },
        { path: 'news', element: admin ? <NewsAdmin /> : <NotFound /> },
        { path: 'news/trash_bin', element: admin ? <TrashbinNewsAdmin /> : <NotFound /> },
        { path: 'notifications', element: admin ? <TrashbinNewsAdmin /> : <NotFound /> },
        { path: 'transfer', element: admin ? <Transfer /> : <NotFound /> },
        { path: 'bank', element: admin ? <TrashbinNewsAdmin /> : <NotFound /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
