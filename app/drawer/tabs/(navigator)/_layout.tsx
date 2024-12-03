import React from 'react'
import { Stack } from 'expo-router';
 
const NavigatorLayout = () => {
  return (
  <Stack
    screenOptions={{
      headerShown: false,
      headerShadowVisible: false,
      contentStyle: {
        backgroundColor: 'white'
      },
      animation: 'fade'
    }}
  >
    <Stack.Screen 
      name="home/index"
      options={{
        title: 'Welcome to Home',
      }}
    />
    <Stack.Screen 
      name="characters/index"
      options={{
        title: 'Characters Screen'
      }}
    />
    <Stack.Screen 
      name="profile/index"
      options={{
        title: 'Profile Screen'
      }}
    />
  </Stack>
  )
}
 
export default NavigatorLayout;