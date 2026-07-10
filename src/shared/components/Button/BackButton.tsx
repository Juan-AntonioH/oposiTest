import { styles } from "@/features/exam/styles/exam.styles";
import { useNavigation } from "expo-router";
import { Pressable, View, Text } from "react-native";

export function BackButton() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>← Volver</Text>
            </Pressable>
        </View>
    );
}