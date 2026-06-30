import React from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  Animated,
  Image,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { SidebarProps } from './Sidebar.types';
import { styles } from './Sidebar.styles';
import { PRESET_AVATARS } from '@/features/auth/constants/avatars';
import { resolveAvatar } from '@/features/auth/utils/avatarResolver';

export function Sidebar({
  isOpen,
  onClose,
  isLoggedIn = false,
  userName,
  userAvatar,
  onLoginClick,
  onProfileClick,
  onLogout,
  onNavigate,
}: SidebarProps) {

  const translateX = React.useRef(new Animated.Value(-300)).current;

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : -300,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  // =========================
  // AVATAR STATE (CORREGIDO)
  // =========================
  const [avatarSource, setAvatarSource] = React.useState<any>(
    PRESET_AVATARS[0].image
  );

  React.useEffect(() => {
    let mounted = true;
    
    async function loadAvatar() {
      // Si no hay avatar, volvemos directamente al predefinido sin esperar promesas
      if (!userAvatar) {
        if (mounted) setAvatarSource(PRESET_AVATARS[0].image);
        return;
      }

      try {
        const resolved = await resolveAvatar(userAvatar);
        if (mounted && resolved) {
          setAvatarSource(resolved);
        }
      } catch (error) {
        console.error("Error resolviendo el avatar:", error);
      }
    }

    loadAvatar();

    return () => {
      mounted = false;
    };
  }, [userAvatar, isOpen]); // 👈 Añadido isOpen para forzar la actualización al abrir el Sidebar

  // =========================
  // MENU
  // =========================
  const menuItems = isLoggedIn
    ? [
      { label: 'Inicio', icon: 'home', action: () => onNavigate?.('inicio') },
      { label: 'Oposiciones', icon: 'category', action: () => onNavigate?.('oposiciones') },
      { label: 'Configuración', icon: 'settings', action: () => { } },
      {
        label: 'Logout',
        icon: 'logout',
        action: () => {
          // Limpiamos el avatar local inmediatamente al cerrar sesión para evitar fugas visuales
          setAvatarSource(PRESET_AVATARS[0].image);
          onLogout?.();
        },
      },
    ]
    : [
      { label: 'Inicio', icon: 'home', action: () => onNavigate?.('inicio') },
    ];

  return (
    <Modal visible={isOpen} transparent animationType="none">

      {/* overlay */}
      <Pressable style={styles.overlay} onPress={onClose} />

      {/* sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          { transform: [{ translateX }] },
        ]}
      >

        {/* header */}
        <View style={styles.header}>
          <Text style={styles.title}>Menú</Text>

          <Pressable onPress={onClose}>
            <MaterialIcons name="close" size={28} />
          </Pressable>
        </View>

        {/* auth */}
        <View style={styles.authSection}>
          {!isLoggedIn ? (
            <Pressable
              style={styles.loginButton}
              onPress={() => {
                onLoginClick?.();
                onClose();
              }}
            >
              <Text style={styles.loginText}>Login</Text>
            </Pressable>
          ) : (
            <Pressable
              style={styles.profileContainer}
              onPress={onProfileClick}
            >
              {/* Forzamos el re-render de la imagen usando la key cuando cambia el source */}
              <Image 
                key={userAvatar} 
                source={avatarSource} 
                style={styles.avatar} 
              />

              <View style={styles.userInfo}>
                <Text style={styles.userName} numberOfLines={1}>
                  {userName ?? 'Usuario'}
                </Text>
                <Text style={styles.profileLink}>Perfil</Text>
              </View>
            </Pressable>
          )}
        </View>

        {/* menu */}
        <View style={styles.menu}>
          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              style={styles.menuItem}
              onPress={() => {
                item.action();
                onClose();
              }}
            >
              <MaterialIcons name={item.icon as any} size={22} />
              <Text style={styles.menuText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>

      </Animated.View>
    </Modal>
  );
}
