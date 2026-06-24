// Define los tipos de navegación disponibles en la app
export type SidebarRoute =
  | 'inicio'
  | 'list'
  | 'oposiciones'
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