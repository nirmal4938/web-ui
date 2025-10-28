export interface NavItem {
  label: string;
  path?: string; // make optional
  permission?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}
