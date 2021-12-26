/* eslint-disable prettier/prettier */
import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import keypadoutline from '@iconify/icons-eva/keypad-outline';
import briefcasefill from '@iconify/icons-eva/briefcase-fill';
import carfill from '@iconify/icons-eva/car-fill';

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Organization',
    path: '/organization',
    icon: getIcon(peopleFill),
    children: [
      {
        title: 'Organization',
        path: '/organization/organization'
      },
      {
        title: 'Banner',
        path: '/organization/banner'
      },
      {
        title: 'Account',
        path: '/organization/account'
      }
    ]
  },
  {
    title: 'Component',
    path: '/component',
    icon: getIcon(briefcasefill),
    children: [
      {
        title: 'State',
        path: '/component/state'
      },
      {
        title: 'Roles',
        path: '/component/role'
      },
      {
        title: 'Utilities',
        path: '/component/utilities'
      },
      {
        title: 'Category',
        path: '/component/category'
      },
      {
        title: 'Payment',
        path: '/component/payment'
      },
      {
        title: 'Brands',
        path: '/component/brand'
      }
    ]
  },
  {
    title: 'Management',
    path: '/management',
    icon: getIcon(keypadoutline),
    children: [
      {
        title: 'Order',
        path: '/management/order'
      },
      {
        title: 'Customer',
        path: '/management/customer'
      },
      {
        title: 'Contact',
        path: '/management/contact'
      },
      // {
      //   title: 'Product List',
      //   path: '/management/product'
      // },
      {
        title: 'Products',
        path: '/management/products'
      },
    ]
  },
  {
    title: 'Delivery',
    path: '/delivery',
    icon: getIcon(carfill),
    children: [
      {
        title: 'Shipper',
        path: '/delivery/shipper'
      },
      {
        title: 'Shipping Department',
        path: '/delivery/shipping-department'
      },
      // {
      //   title: 'Pick Up Orders',
      //   path: '/delivery/pick-up'
      // },
      {
        title: 'Services',
        path: '/delivery/services'
      },
      // {
      //   title: 'Tracking order',
      //   path: '/delivery/tracking-order'
      // }
    ]
  },
  {
    title: 'Article',
    path: '/article',
    icon: getIcon(fileTextFill),
    children: [
      {
        title: 'Post',
        path: '/article/post'
      },
      {
        title: 'Field',
        path: '/article/field'
      }
    ]
  }
];

export default sidebarConfig;
