import React from 'react';
import { Pressable, Text } from 'react-native';

type Props = {
    cooldown: number;
    onPress: () => void;
    disabled?: boolean;
};

export function VerificationTimer({ cooldown, onPress, disabled }: Props) {
    const blocked = cooldown > 0 || disabled;

    return (
        <Pressable onPress={onPress} disabled={blocked}>
            <Text style={{ color: blocked ? '#999' : '#0284C7' }}>
                {cooldown > 0
                    ? `Reenviar correo (${cooldown}s)`
                    : 'Reenviar correo'}
            </Text>
        </Pressable>
    );
}