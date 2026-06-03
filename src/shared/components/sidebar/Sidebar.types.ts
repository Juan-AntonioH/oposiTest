// Define los tipos de navegación disponibles en la app
export type SidebarRoute =
  | 'inicio'
  | 'lista'
  | 'categorias'
  | 'login';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;

  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;

  onLoginClick?: () => void;
  onProfileClick?: () => void;
  onLogout?: () => void;

  onNavigate?: (screen: SidebarRoute) => void;
}