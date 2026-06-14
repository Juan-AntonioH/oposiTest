import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from '@/features/auth/styles/Auth.styles';
import { ScreenLayout } from '@/shared/layouts/ScreenLayout';

export function OppositionsScreen() {
    return (
        <ScreenLayout
            title="Oposiciones"
            showSidebar={true}
            // isLoggedIn={isLoggedIn} // 👈 Pasa tu estado de autenticación real
            // userName={userName}
            // userAvatar={userAvatar}
            // onLogout={logout}
        >
            <View style={styles.container}>
                <Text>hola</Text>
            </View>
        </ScreenLayout>
    );
}
