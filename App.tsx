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
import { useAuthStore } from '@/store/authStore';
import { Navigation } from '@/navigation';

export default function App() {
  const initAuth = useAuthStore((s) => s.initAuth);

  useEffect(() => {
    initAuth();
  }, []);

  return <Navigation />;
}