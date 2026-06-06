import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import { ScreenLayout } from '@/shared/layouts/ScreenLayout'; // 1. Importa tu layout
import { RootStackParamList } from '@/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


export const RegisterScreen = () => {
    return (

        <View >
            <Text>Register Screen</Text>

        </View>

    )
}