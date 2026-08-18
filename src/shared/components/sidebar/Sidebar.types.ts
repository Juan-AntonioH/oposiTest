export type SidebarRoute =
  | 'inicio'
  | 'historial'
  | 'oposiciones'
  // | 'configuracion'
  | 'login';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;

  isLoggedIn?: boolean;
  uid?: string;
  userName?: string;
  accountName?: string;
  userAvatar?: string;
  userEmail?: string;
  userRole?: string;

  onLoginClick?: () => void;
  onProfileClick?: () => void;
  onLogout?: () => void;

  onNavigate?: (screen: SidebarRoute) => void;
}