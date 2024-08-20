import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Inputs from './inputs';
import Outputs from './outputs';
import { Icon } from 'react-native-paper';
import { useNavigation } from 'expo-router';

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC = () => {
  const nav = useNavigation();
  nav.setOptions({
    title: 'Wage Calculator',
  });
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Inputs"
          component={Inputs}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon source="cog" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Outputs"
          component={Outputs}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon source="calculator" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default HomeScreen;
