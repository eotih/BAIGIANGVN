import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    admin: false,
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'user',
    path: '/dashboard/user',
    admin: true,
    icon: getIcon(peopleFill)
  },
  {
    title: 'product',
    path: '/dashboard/products',
    admin: true,
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    admin: false,
    icon: getIcon(fileTextFill)
  }
];

export default sidebarConfig;
