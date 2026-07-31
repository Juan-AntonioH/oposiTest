import React, {
  useCallback,
  useState,
} from 'react';

import {
  Alert,
  BackHandler,
  Platform,
  View,
} from 'react-native';

import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { resolveAvatar } from '@/features/auth/utils/avatarResolver';
import { Toolbar } from '@/shared/components/toolbar/ToolBar';
import { Sidebar } from '@/shared/components/sidebar/Sidebar';
import { useAuthStore } from '@/store/authStore';

interface Props {
  children: React.ReactNode;
  showSidebar?: boolean;
  title: string;
}

export function ScreenLayout({
  children,
  showSidebar = true,
  title,
}: Props) {
  const navigation = useNavigation<any>();

  const {
    status,
    uid,
    displayName,
    accountName,
    email,
    role,
    avatar,
    logout,
  } = useAuthStore();

  const isLoggedIn = status === 'authenticated';

  const [sidebarOpen, setSidebarOpen] = useState(false);
  useFocusEffect(

    useCallback(() => {

      if (Platform.OS !== 'android') {
        return;
      }

      const subscription =
        BackHandler.addEventListener(

          'hardwareBackPress',

          () => {

            Alert.alert(

              'Salir de OposiTest',

              '¿Quieres salir de la aplicación?',

              [

                {
                  text: 'Cancelar',
                  style: 'cancel',
                },

                {
                  text: 'Salir',
                  style: 'destructive',

                  onPress: () => {

                    BackHandler.exitApp();

                  },

                },

              ],

            );

            return true;

          },

        );

      return () => {

        subscription.remove();

      };

    }, []),

  );
  // =========================
  // NAVIGATION
  // =========================
  const handleNavigate = (screen: string) => {
    setSidebarOpen(false);

    switch (screen) {
      case 'inicio':
        navigation.navigate('Dashboard');
        break;

      case 'oposiciones':
        navigation.navigate('Oppositions');
        break;

      case 'historial':
        navigation.navigate('ExamHistoryScreen');
        break;
    }
  };

  // =========================
  // LOGIN CLICK
  // =========================
  const handleLoginClick = () => {
    setSidebarOpen(false);
    navigation.navigate('Login');
  };

  const handleProfileClick = () => {
    setSidebarOpen(false);
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>

      {showSidebar && (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isLoggedIn={isLoggedIn}
          userName={displayName}
          userAvatar={avatar}
          userEmail={email ?? undefined}
          userRole={role ?? undefined}
          onNavigate={handleNavigate}
          onLogout={logout}
          onLoginClick={handleLoginClick}
          onProfileClick={handleProfileClick}
        />
      )}

      <Toolbar
        title={title}
        onMenuPress={showSidebar ? () => setSidebarOpen(true) : undefined}
      />

      <View style={{ flex: 1 }}>
        {children}
      </View>

    </SafeAreaView>
  );
}