import { FileDoneOutlined, TableOutlined, ProfileOutlined } from '@ant-design/icons';
//Pages

import Validly from '../pages/validly';
import Metafacts from '../pages/metafacts';
import Documentation from '../pages/docs';
import ValidlyMetafacts from '../pages/validly-metafacts';

export default [
  {
    path: '/',
    Component: Validly,
    title: 'Validly',
  },
  {
    path: '/expectation/datasets',
    Component: Validly,
    enableNavigation: true,
    enableBreadcrumb: true,
    Icon: FileDoneOutlined,
    title: 'Validly',
  },
  {
    path: '/meta-data/datasets',
    Component: Metafacts,
    enableNavigation: true,
    enableBreadcrumb: true,
    Icon: TableOutlined,
    title: 'Metafacts',
  },
  {
    path: '/validly-metafacts',
    Component: ValidlyMetafacts,
    enableNavigation: true,
    enableBreadcrumb: true,
    Icon: FileDoneOutlined,
    title: 'Validly-Metafacts',
  },
  {
    path: '/docs',
    Component: Documentation,
    enableNavigation: true,
    enableBreadcrumb: true,
    Icon: ProfileOutlined,
    title: 'Documentation',
  },
];
