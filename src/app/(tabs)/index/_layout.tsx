import { Stack } from 'expo-router';

export const InputsStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Your Situation',
          // headerShown: false,
        }}
      />
      <Stack.Screen name="salary" />
      <Stack.Screen name="working-schedule" />
      <Stack.Screen name="children" />
      <Stack.Screen name="child" />
    </Stack>
  );
};

export default InputsStack;
