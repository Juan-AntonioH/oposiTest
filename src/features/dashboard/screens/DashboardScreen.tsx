import { View } from 'react-native';

import { Toolbar } from '@/shared/components/toolbar/ToolBar';

export function DashboardScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Toolbar
        title="OposiTest"
        onMenuPress={() => alert('Menu')}
      />
    </View>
  );
}