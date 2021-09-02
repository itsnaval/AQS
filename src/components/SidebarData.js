import Dashboard from '../assets/dashboard.png';
import Analyse from '../assets/analyses.png';
import Dataset from '../assets/datasets.png';
import Favorite from '../assets/favorite.png';
import Recent from '../assets/recent.png';

export const SidebarData = [
  {
    title: 'Favorites',
    path: '/favorites',
    icon: Favorite,
    cName: 'nav-text'
  },
  {
    title: 'Recent',
    path: '/recent',
    icon: Recent,
    cName: 'nav-text'
  },
  {
    title: 'Dashboards',
    path: '/dashboards',
    icon: Dashboard,
    cName: 'nav-text'
  },
  {
    title: 'Analyses',
    path: '/',
    icon: Analyse,
    cName: 'nav-text'
  },
  {
    title: 'Datasets',
    path: '/Datasets',
    icon: Dataset,
    cName: 'nav-text'
  },
  {
    // title: 'Prepare',
    path: '/Prepare',
    // icon: Dataset,
    cName: 'nav-text'
  },
  {
    // title: 'Trial',
    // path: '/Trial',
    // icon: Dataset,
    cName: 'nav-text'
  },
];
