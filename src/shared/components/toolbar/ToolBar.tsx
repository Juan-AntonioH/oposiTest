import { View, Text, Pressable } from 'react-native';

import { styles } from './ToolBar.styles';

interface ToolbarProps {
  title: string;
  onMenuPress?: () => void;
}

export function Toolbar({
  title,
  onMenuPress,
}: ToolbarProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.menuButton}
        onPress={onMenuPress}
      >
        <Text style={styles.menuIcon}>☰</Text>
      </Pressable>

      <Text style={styles.title}>
        {title}
      </Text>

      <View style={styles.placeholder} />
    </View>
  );
}