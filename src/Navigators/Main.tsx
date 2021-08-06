import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LoginScrren } from '@/Containers'
import { Icon } from "react-native-elements";
const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
      options={{
        tabBarIcon: ({ color, size }) => (

          <Icon name="home" color="#FF0000"  size={30} />
          ),
         
        }}
      name="Home" component={LoginScrren} />
    </Tab.Navigator>
  )
}

export default MainNavigator
