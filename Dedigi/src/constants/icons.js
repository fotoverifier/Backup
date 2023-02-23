import { ReactComponent as SelectionIcon } from '../assets/images/selection-ic.svg';
import { ReactComponent as LineIcon } from '../assets/images/line-ic.svg';
import { ReactComponent as PentoolIcon } from '../assets/images/pentool-ic.svg';
import { ReactComponent as CircleIcon } from '../assets/images/point-ic.svg';
import { ReactComponent as GridIcon } from '../assets/images/grid-ic.svg';
import { ReactComponent as DiffIcon } from '../assets/images/diff-ic.svg';

import { ReactComponent as DocsIcon } from '../assets/images/docs-ic.svg';
import { ReactComponent as HomeIcon } from '../assets/images/home-ic.svg';

import { ReactComponent as InfoIcon } from '../assets/images/info-ic.svg';
import { ReactComponent as AngleUpIcon } from '../assets/images/angle-up-ic.svg';
import { ReactComponent as AngleDownIcon } from '../assets/images/angle-down-ic.svg';
import { ReactComponent as UploadIcon } from '../assets/images/upload-ic.svg';
import { ReactComponent as RefreshIcon } from '../assets/images/refresh-ic.svg';
import { ReactComponent as DownloadIcon } from '../assets/images/download-ic.svg';

const generalIcons = {
  'info-ic': {
    iconName: 'info-ic',
    icon: InfoIcon,
  },
  'angle-up-ic': {
    iconName: 'angle-up-ic',
    icon: AngleUpIcon,
  },
  'angle-down-ic': {
    iconName: 'angle-down-ic',
    icon: AngleDownIcon,
  },
  'upload-ic': {
    iconName: 'upload-ic',
    icon: UploadIcon,
  },
  'refresh-ic': {
    iconName: 'refresh-ic',
    icon: RefreshIcon,
  },
  'download-ic': {
    iconName: 'download-ic',
    icon: DownloadIcon,
  },
};

const toolBarIcons = [
  {
    iconName: 'selection-ic',
    icon: SelectionIcon,
    alt: 'Selection',
  },
  {
    iconName: 'line-ic',
    icon: LineIcon,
    alt: 'Line',
  },
  {
    iconName: 'pentool-ic',
    icon: PentoolIcon,
    alt: 'Pentool',
  },
  {
    iconName: 'point-ic',
    icon: CircleIcon,
    alt: 'Point',
  },
  {
    iconName: 'grid-ic',
    icon: GridIcon,
    alt: 'Grid',
  },
  {
    iconName: 'diff-ic',
    icon: DiffIcon,
    alt: 'Differences',
  },
];

const pageIcons = [
  {
    iconName: 'docs-ic',
    icon: DocsIcon,
    pathLink: '/tutorial',
  },
  {
    iconName: 'home-ic',
    icon: HomeIcon,
    pathLink: '/',
  },
];

export { generalIcons, toolBarIcons, pageIcons };
