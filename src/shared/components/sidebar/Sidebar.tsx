import React from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  Animated,
} from 'react-native';

import { SidebarProps } from './Sidebar.types';
import { styles } from './Sidebar.styles';

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
        { label: 'Inicio', action: () => onNavigate?.('inicio') },
        { label: 'Categorías', action: () => onNavigate?.('categorias') },
        { label: 'Lista', action: () => onNavigate?.('lista') },
        { label: 'Configuración', action: () =>  {} },
        {
          label: 'Logout',
          action: () => {
            onLogout?.();
            onNavigate?.('inicio');
          },
        },
      ]
    : [
        { label: 'Inicio', action: () => onNavigate?.('inicio') },
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
            <Text style={styles.close}>✕</Text>
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
            <Pressable onPress={onProfileClick}>
              <Text style={styles.userName}>
                {userName ?? 'Usuario'}
              </Text>
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