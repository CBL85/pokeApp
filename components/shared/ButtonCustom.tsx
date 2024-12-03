import { Text, Pressable, PressableProps } from 'react-native'
import React from 'react'

interface Props extends PressableProps {
  children: string;
  color?: 'primary'|'secondary'|'tertiary';
  className?: string
  variant?: 'text-only'
}
const ButtonCustom = ({children, color ='primary', onPress, className, variant, onLongPress}:Props) => {

 const btnColor = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary'
 }[color];

 const textColor = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary'
 }[color];

  if(variant === 'text-only') {
    return (
    <Pressable
      className={`p-3 ${className}`}
      onPress={onPress}
     >
      <Text className={`${textColor} text-center`}>{children}</Text>
     </Pressable>
     )
  }

  return (
   <Pressable
    className={`p-3  rounded-md ${btnColor} ${className}`}
   onPress={onPress}
   >
    <Text className={`text-white text-center`}>{children}</Text>
   </Pressable>
  )
}

export default ButtonCustom;