import { Stack } from 'expo-router';

export const InputsStack = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
      }}
      initialRouteName="index"
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Cost Of Work',
        }}
      />
      <Stack.Screen
        name="salary"
        options={{
          title: 'Salary and Pension',
        }}
      />
      <Stack.Screen
        name="working-schedule"
        options={{
          title: 'Working Schedule',
        }}
      />
      <Stack.Screen
        name="children/index"
        options={{
          headerShown: true,
          title: 'Children',
        }}
      />
      <Stack.Screen
        name="children/[index]"
        options={{
          title: 'Child',
        }}
      />
      <Stack.Screen
        name="commuting"
        options={{
          title: 'Commuting Expenses',
        }}
      />
    </Stack>
  );
};

export default InputsStack;
