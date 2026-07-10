import React from 'react';
import {
    Pressable,
    View,
    ViewStyle,
    StyleProp,
    TextStyle,
    Text,
} from 'react-native';

import { styles } from './card.styles'

interface CustomCardProps {

    title: string | React.ReactNode;

    subtitle?: string | React.ReactNode;

    description?: string | React.ReactNode;

    icon?: React.ReactNode;

    badge?: React.ReactNode;

    headerRight?: React.ReactNode;

    footer?: React.ReactNode;

    children?: React.ReactNode;

    onPress?: () => void;

    disabled?: boolean;

    variant?: 'default' | 'outlined' | 'flat';

    contentStyle?: StyleProp<ViewStyle>;

    iconContainerStyle?: StyleProp<ViewStyle>;

}

export function CustomCard({
    title,
    subtitle,
    description,
    icon,
    badge,
    headerRight,
    footer,
    children,
    onPress,
    disabled = false,
    variant = 'default',
    contentStyle,
    iconContainerStyle,
}: CustomCardProps) {

    const cardStyle = [
        styles.card,
        variant === 'outlined' && styles.outlined,
        variant === 'flat' && styles.flat,
        disabled && styles.disabled,
        contentStyle,
    ];

    const Content = (

        <View style={cardStyle}>

            <View style={styles.header}>

                {icon && (
                    <View
                        style={[
                            styles.iconContainer,
                            iconContainerStyle,
                        ]}
                    >
                        {icon}
                    </View>
                )}

                <View style={styles.center}>

                    <View style={styles.titleRow}>

                        <View style={styles.titleContainer}>
                            {renderContent(title, styles.title)}
                        </View>

                        {badge}

                    </View>

                    {subtitle && (
                        <View style={styles.subtitle}>
                            {renderContent(subtitle, styles.subtitle)}
                        </View>
                    )}

                    {description && (
                        <View style={styles.description}>
                            {renderContent(description, styles.description)}
                        </View>
                    )}

                </View>

                {headerRight && (
                    <View style={styles.headerRight}>
                        {headerRight}
                    </View>
                )}

            </View>

            {children && (
                <View style={styles.children}>
                    {children}
                </View>
            )}

            {footer && (
                <View style={styles.footer}>
                    {footer}
                </View>
            )}

        </View>

    );

    if (!onPress) {
        return Content;
    }

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
        >
            {Content}
        </Pressable>
    );

}
function renderContent(
    content: string | React.ReactNode | undefined,
    style: TextStyle,
) {

    if (!content) {
        return null;
    }

    if (typeof content === 'string') {
        return (
            <Text style={style}>
                {content}
            </Text>
        );
    }

    return content;

}