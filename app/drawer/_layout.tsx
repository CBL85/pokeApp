import { View, Text } from 'react-native';
import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import ContentDrawer from '@/components/shared/ContentDrawer';

const DrawerLayout = () => {
  return (
    <Drawer
      drawerContent={ContentDrawer}
      screenOptions={{
        headerShown: true,
        overlayColor: 'rgba(0,0,0,0.4)',
        drawerActiveTintColor: 'indigo',
        headerShadowVisible: false,
        sceneStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      <Drawer.Screen
          name="tabs" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Tabs',
            title: 'Tabs-Stacks',
            drawerIcon: ({color, size}) => (<Ionicons name="apps" size={size} color={color}></Ionicons>)
          }}
        />
        <Drawer.Screen
          name="user/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'User',
            title: 'User Screen',
            drawerIcon: ({color, size}) => (<Ionicons name="person-circle-outline" size={size} color={color}></Ionicons>)
          }}
        />
        <Drawer.Screen
          name="settings/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Settings',
            title: 'Settings Screen',
            drawerIcon: ({color, size}) => (<Ionicons name="compass" size={size} color={color}></Ionicons>)
          }}
        />
  </Drawer>
  )
}

export default DrawerLayout;