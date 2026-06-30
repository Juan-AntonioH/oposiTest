// import { SafeAreaProvider } from 'react-native-safe-area-context';

// import { Navigation } from '@/navigation';

// export default function App() {
//   return (
//     <SafeAreaProvider>
//       <Navigation />
//     </SafeAreaProvider>
//   );
// }
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { AuthRouter } from '@/navigation/AuthRouter';
import { useAuthStore } from '@/store/authStore';

export default function App() {
  const initAuth = useAuthStore((s) => s.initAuth);

  useEffect(() => {
    initAuth();
  }, []);

  return (
    <>
      <NavigationContainer>
        <AuthRouter />
      </NavigationContainer>
      <Toast />
    </>
  );
}