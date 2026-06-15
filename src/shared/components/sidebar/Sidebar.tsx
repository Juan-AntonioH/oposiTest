import React from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  Animated,
  Image,
} from 'react-native';

import { SidebarProps } from './Sidebar.types';
import { styles } from './Sidebar.styles';
import { MaterialIcons } from '@expo/vector-icons';
import { PRESET_AVATARS } from '@/features/auth/constants/avatars';

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

  // Animación simple de entrada (slide from left)
  const translateX = React.useRef(new Animated.Value(-300)).current;
  React.useEffect(() => {
    if (isOpen) {
      // abre el sidebar
      Animated.timing(translateX, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      // cierra el sidebar
      Animated.timing(translateX, {
        toValue: -300,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);

  // Menú dinámico según login
  const menuItems = isLoggedIn
    ? [
      { label: 'Inicio', icon: 'home', action: () => onNavigate?.('inicio') },
      { label: 'Oposiciones', icon: 'category', action: () => onNavigate?.('oposiciones') },
      { label: 'Lista', icon: 'list', action: () => onNavigate?.('lista') },
      { label: 'Configuración', icon: 'settings', action: () => { } },
      {
        label: 'Logout',
        icon: 'logout',
        action: () => {
          onLogout?.();
          onNavigate?.('inicio');

        },
      },
    ]
    : [
      { label: 'Inicio', icon: 'home', action: () => onNavigate?.('inicio') },
      // { label: 'Oposiciones', icon: 'category', action: () => onNavigate?.('oposiciones') },

    ];

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
    >
      {/* OVERLAY */}
      <Pressable
        style={styles.overlay}
        onPress={onClose}
      />

      {/* SIDEBAR */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Menú</Text>

          <Pressable onPress={onClose}>
            <MaterialIcons name="close" size={30} />{/*<Text style={styles.close}>✕</Text>*/}
          </Pressable>
        </View>

        {/* AUTH SECTION */}
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
            <Pressable style={styles.profileContainer} onPress={onProfileClick}>
              {/* AVATAR DESDE EL BANCO DE IMÁGENES */}
              <Image
                source={
                  PRESET_AVATARS.find((avatar) => avatar.id === (userAvatar || 'avatar_01'))?.image ||
                  PRESET_AVATARS[0].image
                }
                style={styles.avatar}
              />
              {/* DATOS DE USUARIO */}
              <View style={styles.userInfo}>
                <Text style={styles.userName} numberOfLines={1}>
                  {userName ?? 'Opositor/a'}
                </Text>
                <Text style={styles.profileLink}>
                  Perfil
                </Text>
              </View>
            </Pressable>
          )}
        </View>

        {/* MENU */}
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
              {/* 🟢 ICONO MATERIALICON A LA IZQUIERDA */}
              <MaterialIcons
                name={item.icon as any}
                size={24} // O el color de tu tema (ej: colors.white)
                style={styles.menuIcon}
              />

              {/* TEXTO DE LA OPCIÓN */}
              <Text style={styles.menuText}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </Animated.View>
    </Modal>
  );
}

