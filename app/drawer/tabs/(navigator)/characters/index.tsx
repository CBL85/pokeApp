import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { personajes } from '@/api/personajes';
import { Link } from 'expo-router';

const CharactersScreen = () => {
  return (
      <View className="flex flex-1 px-4">
        <FlatList 
          data={personajes}
          keyExtractor={(personaje) => personaje.id}
          renderItem={({item}) => (
            <View className="mt-10">
              <Text className="text-2xl font-rale-black">{item.nombre}</Text>
              <View>
                <Link href={`/drawer/tabs/characters/${item.id}`}>Ir a personaje</Link>
              </View>
            </View>
          )}
        />
      </View>
  
  )
}

export default CharactersScreen;