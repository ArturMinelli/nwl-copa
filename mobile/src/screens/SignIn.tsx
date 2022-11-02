import { StatusBar } from 'expo-status-bar';
import { Center, Text } from 'native-base';

export function SignIn() {
  return (
    <Center flex={1} bgColor="gray.900">
      <Text color="white">
        Sign In!
      </Text>
      <StatusBar style="auto" />
    </Center>
  );
}