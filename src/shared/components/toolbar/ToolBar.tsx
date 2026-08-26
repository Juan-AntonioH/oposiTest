import { View, Text, Pressable } from 'react-native';

import { styles } from './ToolBar.styles';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/core/theme/colors';

interface ToolbarProps {
  title: string;
  onMenuPress?: () => void;
}

export function Toolbar({ title, onMenuPress }: ToolbarProps) {
  return (
    <View style={styles.container}>

      {/* SOLO MOSTRAR HAMBURGER SI EXISTE onMenuPress */}
      {onMenuPress ? (
        <Pressable
          style={styles.menuButton}
          onPress={onMenuPress}
        >
          <MaterialIcons name="menu" size={32} color={colors.white}></MaterialIcons>
        </Pressable>
      ) : (
        <View style={{ width: 40 }} />
      )}

      <Text style={styles.title}>{title}</Text>

      <View style={styles.placeholder} />
    </View>
  );
}