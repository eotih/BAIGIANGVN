/* eslint-disable prettier/prettier */
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
// Organization
import Organization from './pages/organization/Organization';
import Account from './pages/organization/Account';
import Banner from './pages/organization/Banner';
import Profile from './pages/organization/Profile';
// Management
import Products from './pages/management/Products';
import Blog from './pages/management/Blog';
import Customer from './pages/management/Customer';
import Contact from './pages/management/Contact';
import Order from './pages/management/Order';
import OrderDetail from './pages/management/OrderDetail';
import ProductDetails from './pages/management/ProductDetails';
import Product from './pages/management/Product';
// Component
import Role from './pages/component/Role';
import Payment from './pages/component/Payment';
import Category from './pages/component/Category';
import State from './pages/component/State';
import Brand from './pages/component/Brand';
import Utilities from './pages/component/Utilities';
import { AddProduct, EditProduct, Review } from './components/_dashboard/products';
import { AddPost, EditPost } from './components/_dashboard/post';
// Delivery
import Service from './pages/delivery/Service';
import Shipper from './pages/delivery/Shipper';
import ShippingDepartment from './pages/delivery/ShippingDepartment';
// Article
import Field from './pages/article/Field';
import Post from './pages/article/Post';
import TrashBin from './pages/article/TrashBin';
// Page
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import User from './pages/User';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'blog', element: <Blog /> },
        { path: 'profile', element: <Profile /> },
      ]
    },
    {
      path: '/organization',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'account', element: <Account /> },
        { path: 'banner', element: <Banner /> },
        { path: 'organization', element: <Organization /> }
      ]
    },
    {
      path: '/component',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'role', element: <Role /> },
        { path: 'payment', element: <Payment /> },
        { path: 'category', element: <Category /> },
        { path: 'utilities', element: <Utilities /> },
        { path: 'state', element: <State /> },
        { path: 'brand', element: <Brand /> }
      ]
    },
    {
      path: '/delivery',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'services', element: <Service /> },
        { path: 'payment', element: <Payment /> },
        { path: 'shipper', element: <Shipper /> },
        { path: 'shipping-department', element: <ShippingDepartment /> }
      ]
    },
    {
      path: '/article',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'post', element: <Post /> },
        { path: 'post/trash_bin', element: <TrashBin /> },
        { path: 'post/add', element: <AddPost /> },
        { path: 'post/edit/:slug', element: <EditPost /> },
        { path: 'field', element: <Field /> }
      ]
    },
    {
      path: '/management',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'customer', element: <Customer /> },
        { path: 'contact', element: <Contact /> },
        { path: 'product', element: <Product /> },
        { path: 'order', element: <Order /> },
        { path: 'products', element: <Products /> },
        { path: 'products/edit/:slug', element: <EditProduct /> },
        { path: 'products/detail/:slug', element: <ProductDetails /> },
        { path: 'products/review/:slug', element: <Review /> },
        { path: 'order/detail/:id', element: <OrderDetail /> },
        { path: 'products/add', element: <AddProduct /> }
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
