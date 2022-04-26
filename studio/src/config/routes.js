import { HomeOutlined } from '@ant-design/icons';

//Pages
import Home from '../pages/home';

export default [
  {
    path: '/home',
    Component: Home,
    enableNavigation: true,
    enableBreadcrumb: true,
    Icon: HomeOutlined,
    title: 'Home',
  },
];
