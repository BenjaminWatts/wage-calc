import { INPUTS, OUTPUTS } from '@/src/components/icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

const MainTabLayout: React.FC = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        headerShown: false,
      }}
      initialRouteName="inputs"
    >
      <Tabs.Screen
        name="inputs"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name={INPUTS} color={color} />
          ),
          title: 'Inputs',
          headerShown: false, // Add this line to disable the header for the inputs screen
        }}
      />
      <Tabs.Screen
        name="calcs"
        options={{
          title: 'Calculations',
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name={OUTPUTS} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default MainTabLayout;
