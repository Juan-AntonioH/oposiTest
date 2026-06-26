// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { DashboardScreen } from '@/features/dashboard/screens/DashboardScreen';
// import { OppositionsScreen } from '@/features/exam/screens/OppositionsScreen';
// import { OppositionScreen } from '@/features/exam/screens/OppositionScreen';
// import { ExamsScreen } from '@/features/exam/screens/ExamsScreen';
// import { TestScreen } from '@/features/exam/screens/TestScreen';
// import { ExamSummaryScreen } from '@/features/exam/screens/ExamSummaryScreen';
// import { ExamReviewScreen } from '@/features/exam/screens/ExamReviewScreen';

// import { BlocksScreen } from '@/features/exam/screens/BlocksScreen';
// import { ThemesScreen } from '@/features/exam/screens/ThemesScreen';
// import { CustomTestScreen } from '@/features/exam/screens/CustomTestScreen';

// import { QuestionsListScreen } from '@/features/admin/screens/QuestionsListScreen';
// import { QuestionFormScreen } from '@/features/admin/screens/QuestionFormScreen';

// import { FirebaseQuestion } from '@/features/admin/types/question';

// const Stack = createNativeStackNavigator();

// export function AppStack() {
//     return (
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="Dashboard" component={DashboardScreen} />

//             <Stack.Screen name="Oppositions" component={OppositionsScreen} />
//             <Stack.Screen name="OppositionScreen" component={OppositionScreen} />

//             <Stack.Screen name="ExamsScreen" component={ExamsScreen} />
//             <Stack.Screen name="BlocksScreen" component={BlocksScreen} />
//             <Stack.Screen name="ThemesScreen" component={ThemesScreen} />
//             <Stack.Screen name="CustomTestScreen" component={CustomTestScreen} />

//             <Stack.Screen name="TestScreen" component={TestScreen} />
//             <Stack.Screen name="ExamSummaryScreen" component={ExamSummaryScreen} />
//             <Stack.Screen name="ExamReviewScreen" component={ExamReviewScreen} />

//             {/* ADMIN */}
//             <Stack.Screen name="QuestionsList" component={QuestionsListScreen} />
//             <Stack.Screen name="QuestionForm" component={QuestionFormScreen} />
//         </Stack.Navigator>
//     );
// }
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DashboardScreen } from '@/features/dashboard/screens/DashboardScreen';

const Stack = createNativeStackNavigator();

export function AppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
    );
}