import { FC } from 'react';
import { Link } from 'react-router-dom';

import { type SidebarItem } from '.';
import { cn } from '../../helpers';

export type SidebarItemProps = SidebarItem & {
  active?: boolean;
  isChild?: boolean;
  basePath: string;
  sidebarOpen: boolean;
  onClick?: () => void;
};

export const SidebarItemComp: FC<SidebarItemProps> = ({
  pathname,
  title,
  label,
  Icon,
  active,
  isChild,
  basePath,
  sidebarOpen,
  items,
  onClick,
}) => (
  <Link
    className={cn(
      'flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-md p-2 font-medium',
      {
        'gap-2': sidebarOpen,
        'gap-3': !sidebarOpen,
        'pl-2.5': !sidebarOpen,
        'dark:text-white': active,
        'bg-slate-100 dark:bg-slate-800': active && !isChild && !items,
        'bg-slate-200 dark:bg-slate-900': active && (isChild || items),
        'text-slate-500 dark:text-slate-400': !active,
        'hover:bg-slate-100 dark:hover:bg-slate-800': !active && !isChild,
        'hover:bg-slate-200 dark:hover:bg-slate-900': !active && isChild,
      },
    )}
    to={[basePath, pathname].join('/').replace(/\/{2,}/g, '/')}
    onClick={onClick}
  >
    <Icon className="h-5 w-5 min-w-min" size={16} />
    <div className="min-w-max">
      {title}
      <div className="ml-auto flex items-center space-x-2">{label}</div>
    </div>
  </Link>
);
