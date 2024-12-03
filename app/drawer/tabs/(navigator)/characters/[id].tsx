import { View, Text } from 'react-native';
import React from 'react';
import { personajes } from '@/api/personajes';
import { Redirect, useLocalSearchParams } from 'expo-router';

const DetailHero = () => {
  // const params = useLocalSearchParams();
  // console.log(params);
  const { id } = useLocalSearchParams();

  const personaje = personajes.find(p => p.id == id);

  if(!personaje) {
    return <Redirect href="/"/>
  }

  return (
    <View className="px-5 mt-10">
      <Text className="font-rale-black text-2xl">{personaje.nombre}</Text>
      <Text>{personaje.description}</Text>
      <Text className="font-rale-light text-xl">{personaje.poder}</Text>
    </View>
  )
}

export default DetailHero;