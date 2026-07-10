import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthRouter } from './AuthRouter';

export function Navigation() {
  return (
    <NavigationContainer>
      <AuthRouter />
    </NavigationContainer>
  );
}