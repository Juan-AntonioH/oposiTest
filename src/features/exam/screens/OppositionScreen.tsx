import React from 'react';
import {
    ScrollView,
    Text,
    View,
} from 'react-native';

import {
    RouteProp,
    useNavigation,
} from '@react-navigation/native';

import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { BackButton } from '@/shared/components/Button/BackButton';
import { RootStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useOppositionMenu } from '../hooks/opposition/useOppositionMenu';

import { styles } from '../styles/exam.styles';
import {
    AdminActions,
    OppositionMenuCard,
} from '../components';
import {
    OPPOSITION_MENU,
} from '../constants/oppositionMenu';

interface OppositionScreenProps {
    route: RouteProp<RootStackParamList, 'OppositionScreen'>;
}
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'OppositionScreen'
>;

export function OppositionScreen({
    route,
}: OppositionScreenProps) {
    const navigation = useNavigation<NavigationProp>();
    const {
        idDocument,
        code,
        name,
    } = route.params;

    const { handleMenuPress } = useOppositionMenu({
        navigation,
        oppositionId: idDocument,
        name,
    });
    const role = useAuthStore((state) => state.role);

    const hasAdminAccess =
        role === 'admin' || role === 'moderator';

    return (
        <ScreenLayout title={code}>

            <BackButton />

            <ScrollView
                contentContainerStyle={styles.container}
            >

                <Text style={styles.mainTitle}>
                    {name}
                </Text>

                <Text style={styles.mainSubtitle}>
                    Selecciona el tipo de test que deseas realizar
                </Text>

                <View>

                    {OPPOSITION_MENU.map((item) => (

                        <OppositionMenuCard
                            key={item.id}
                            item={item}
                            onPress={() => handleMenuPress(item)}
                        />

                    ))}

                </View>

                {hasAdminAccess && (
                    <AdminActions
                        navigation={navigation}
                        idDocument={idDocument}
                        code={code}
                        name={name}
                    />
                )}

            </ScrollView>

        </ScreenLayout>
    );

}