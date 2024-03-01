import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import HomeScreenPage from '@/components/HomeScreen';
import CreateTaskScreen from '@/components/CreateTaskScree';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <CreateTaskScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
