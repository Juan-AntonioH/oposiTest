import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';

import { useAuthStore } from '@/store/authStore';

import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';

export function Navigation() {
  const status = useAuthStore((s) => s.status);

  if (status === 'loading') {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {status === 'authenticated' ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}