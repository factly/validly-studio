import {FileDoneOutlined , TableOutlined } from '@ant-design/icons';

//Pages
import Home from '../pages/home';
import Validly from '../pages/validly';
import Metafacts from '../pages/metafacts';
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
    Icon: FileDoneOutlined ,
    title: 'Validly',
  },
  {
    path: '/meta-data/datasets',
    Component: Metafacts ,
    enableNavigation: true,
    enableBreadcrumb: true,
    Icon:  TableOutlined,
    title: 'Metafacts',
  },

];
