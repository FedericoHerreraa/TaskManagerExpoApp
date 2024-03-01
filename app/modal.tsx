import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import LoginScreenPage from '@/components/LoginScreenPage';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <LoginScreenPage/>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
