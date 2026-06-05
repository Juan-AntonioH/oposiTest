import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Navigation } from '@/navigation';

export default function App() { console.log("hola -> "+process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID);
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}
// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// // 1. Importamos el proveedor y el contenedor correcto desde la nueva librería
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import * as SplashScreen from 'expo-splash-screen';
// import { StatusBar } from 'expo-status-bar';

// // Tus alias @/ ya reparados
// import { CustomButton } from '@/shared/components/Button/CustomButton';
// import { ProgressBar } from '@/shared/components/ProgressBar/ProgressBar';
// import { QuestionCard } from '@/features/exam/components/QuestionCard';
// import { useExamStore } from '@/features/exam/store/useExamStore';
// import { Question } from '@/features/exam/types';

// SplashScreen.preventAutoHideAsync();
// const queryClient = new QueryClient();

// const MOCK_QUESTION: Question = {
//   id: 'q1',
//   statement: 'Según el artículo 1.1 de la Constitución Española de 1978, España se constituye en un Estado:',
//   options: [
//     'Federal, demócrata y laico.',
//     'Social y democrático de Derecho.',
//     'Autonómico y socialmente avanzado.',
//     'Presidencialista y de pleno derecho.'
//   ],
//   correctIndex: 1
// };

// export default function App() {
//   const [appReady, setAppReady] = useState(false);
//   const { answers, resetExam } = useExamStore();

//   useEffect(() => {
//     const timer = setTimeout(() => setAppReady(true), 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (appReady) {
//       SplashScreen.hideAsync();
//     }
//   }, [appReady]);

//   if (!appReady) return null;

//   const progressValue = answers[MOCK_QUESTION.id] !== undefined ? 1 : 0;

//   return (
//     // 2. Envolvemos todo con SafeAreaProvider en la raíz absoluta
//     <SafeAreaProvider>
//       <QueryClientProvider client={queryClient}>
//         <SafeAreaView style={styles.safeArea}>
//           <StatusBar style="dark" />
//           <View style={styles.container}>
            
//             <View style={styles.header}>
//               <Text style={styles.categoryTitle}>BLOQUE I: CONSTITUCIÓN ESPAÑOLA</Text>
//               <Text style={styles.subtitle}>Progreso del simulacro</Text>
//               <ProgressBar progress={progressValue} />
//             </View>

//             <View style={styles.main}>
//               <QuestionCard question={MOCK_QUESTION} />
//             </View>

//             <View style={styles.footer}>
//               <CustomButton 
//                 title="Reiniciar Pregunta" 
//                 variant="secondary"
//                 onPress={() => resetExam()} 
//               />
//             </View>

//           </View>
//         </SafeAreaView>
//       </QueryClientProvider>
//     </SafeAreaProvider>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
//   container: { flex: 1, paddingHorizontal: 20, justifyContent: 'space-between' },
//   header: { marginTop: 20, marginBottom: 10 },
//   categoryTitle: { fontSize: 13, fontWeight: '700', color: '#1A56DB', letterSpacing: 1, marginBottom: 4 },
//   subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 8 },
//   main: { flex: 1, justifyContent: 'center' },
//   footer: { marginBottom: 20 }
// });
