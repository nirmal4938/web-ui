import type { ReactNode } from 'react';


export type NavSubItem = {
  label: string;
  path: string;
  permission?: string;
};

export type NavItem = {
  label: string;
  icon: ReactNode;
  path?: string; // optional for parent items
  permission?: string;
  children?: NavSubItem[];
};
