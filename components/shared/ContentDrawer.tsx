import { View, Text } from 'react-native'
import React from 'react'
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const ContentDrawer = (props:DrawerContentComponentProps) => {
  return (
   <DrawerContentScrollView>
      <View className="
        flex 
        justify-center 
        items-center 
        h-[150px]
        bg-primary
        rounded-xl
        mx-3
        mb-10
        p-10
        "
      >
        <View className="flex justify-center items-center rounded-full h-24 w-24 bg-white">
          <Text className="font-rale-black text-gray-800">R.N</Text>
        </View>
      </View>

    <DrawerItemList {...props}/>
    
   </DrawerContentScrollView>
  )
}

export default ContentDrawer;