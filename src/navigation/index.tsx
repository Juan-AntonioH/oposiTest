// import { DashboardScreen } from '@/features/dashboard/screens/DashboardScreen';

// export function Navigation() {
//   return <DashboardScreen />;
// }
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardScreen } from '@/features/dashboard/screens/DashboardScreen';
import { LoginScreen } from '@/features/auth/screens/LoginScreen';
import { RegisterScreen } from '@/features/auth/screens/RegisterScreen';
import { RecoveryScreen } from '@/features/auth/screens/RecoveryScreen';
import { AuthenticatorScreen } from '@/features/auth/screens/AuthenticatorScreen';
import { OppositionsScreen } from '@/features/exam/screens/OppositionsScreen';
import { OppositionScreen } from '@/features/exam/screens/OppositionScreen';
import { ExamsScreen } from '@/features/exam/screens/ExamsScreen';
import { TestScreen } from '@/features/exam/screens/TestScreen';
import { ExamSummaryScreen } from '@/features/exam/screens/ExamSummaryScreen'
import { ExamReviewScreen } from '@/features/exam/screens/ExamReviewScreen';

// Importaciones del módulo de Administración
import { QuestionFormScreen } from '@/features/admin/screens/QuestionFormScreen';
import { QuestionsListScreen } from '@/features/admin/screens/QuestionsListScreen';
import { FirebaseQuestion } from '@/features/admin/types/question';

// Definimos los nombres de las pantallas para TypeScript
export type RootStackParamList = {
  Dashboard: undefined;
  Login: undefined;
  Register: undefined;
  Recovery: undefined;
  Authenticator: { email: string }; // La pantalla de autenticación espera un parámetro de correo electrónico
  Oppositions: undefined;
  OppositionScreen: { idDocument: string; id: string, name: string };
  ExamsScreen: { opositionId: string; name: string };
  TestScreen: { opositionId: string; name: string, setTime: number, examType: string, year: number, immediateSolution: boolean, titleParam: string }
  ExamSummaryScreen: undefined;
  ExamReviewScreen: { startIndex?: number };
  // Añadida la ruta del formulario con el tipado oficial de tu base de datos
  QuestionsList: {
    idDocument: string;            // ID de la oposición
    nombreOposicion: string;
    siglas: string;       // Nombre de la oposición para el título dinámico
  };
  QuestionForm: {
    idDocument: string;            // ID de la oposición (ej: 'opo_01')
    nombreOposicion: string;       // Nombre de la oposición (ej: 'Técnico auxiliar informática')
    questionData?: FirebaseQuestion; // Opcional: activa el modo EDICIÓN si se provee
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        animation: 'none' // 👈 Desactiva todas las animaciones de transición de forma global
      }}>
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Recovery" component={RecoveryScreen} />
        <Stack.Screen name="Authenticator" component={AuthenticatorScreen} />
        <Stack.Screen name="Oppositions" component={OppositionsScreen} />
        <Stack.Screen name="OppositionScreen" component={OppositionScreen} />
        <Stack.Screen name="ExamsScreen" component={ExamsScreen} />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="ExamSummaryScreen" component={ExamSummaryScreen} />
        <Stack.Screen name="ExamReviewScreen" component={ExamReviewScreen} />
        {/* PANTALLAS DE ADMINISTRACIÓN */}
        <Stack.Screen name="QuestionsList" component={QuestionsListScreen} />
        <Stack.Screen name="QuestionForm" component={QuestionFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
