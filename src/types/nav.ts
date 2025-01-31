export interface SidebarNavItem {
  title: string;
  href?: string;
  items?: SidebarNavItem[];
  disabled?: boolean;
  external?: boolean;
  label?: string;
}
