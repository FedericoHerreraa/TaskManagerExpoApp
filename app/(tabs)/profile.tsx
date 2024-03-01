import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/LoginScreenPage';
import { Text, View } from '@/components/Themed';
import ProfileScreenPage from '@/components/ProfileScreen';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <ProfileScreenPage/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
