import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'trang chủ',
    path: '/dashboard/app',
    admin: false,
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'sản phẩm',
    path: '/dashboard/products',
    admin: false,
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'tài khoản',
    path: '/dashboard/taikhoan',
    admin: false,
    icon: getIcon('vs:profile')
  },
  {
    title: 'nạp tiền',
    path: '/dashboard/naptien',
    admin: false,
    icon: getIcon('si-glyph:money-coin')
  },
  {
    title: 'lịch sử',
    path: '/dashboard/lichsu',
    admin: false,
    icon: getIcon('fontisto:history')
  },
  {
    title: 'admin',
    path: '/admin',
    admin: true,
    icon: getIcon(peopleFill),
    children: [
      {
        title: 'users',
        path: '/admin/users'
      },
      {
        title: 'lessons',
        path: '/admin/lessons'
      },
      {
        title: 'transfer',
        path: '/admin/transfer'
      },
      {
        title: 'news',
        path: '/admin/news'
      },
      {
        title: 'notifications',
        path: '/admin/notifications'
      },
      {
        title: 'bank',
        path: '/admin/bank'
      }
    ]
  }
];

export default sidebarConfig;
