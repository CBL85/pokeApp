import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
const TabsLayout = () => {
  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: 'green',
      tabBarShowLabel: true,
      headerShown: false,
      tabBarStyle: {
        backgroundColor: 'white'
      }
    }}
    >
      <Tabs.Screen
        name="(navigator)"
        options={{
          title: 'Stack',
          tabBarIcon: ({color}) => <Ionicons size={25} name="home-outline" color={color}/>
        }}
      />

      <Tabs.Screen
       name="calendar/index"
       options={{
        title: 'Calendar',
        tabBarIcon: ({color}) => <Ionicons size={25} name="calendar" color={color} />
      }}
      />
   
      <Tabs.Screen
        name="version/index"
        options={{
            title: 'Version',
            tabBarIcon: ({color}) => <Ionicons size={25} name="infinite" color={color} />
        }}
      />
      
    </Tabs>
  )
}

export default TabsLayout;