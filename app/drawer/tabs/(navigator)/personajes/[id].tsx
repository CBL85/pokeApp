import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchCharacterById } from '@/api/PokeApi';
import { ICharacter } from '@/api/interfaces/ICharacter';

const CharacterDetailScreen = () => {
  const { id } = useLocalSearchParams(); // Captura el ID desde la URL
  const [character, setCharacter] = useState<ICharacter | null>(null); // Estado para almacenar el personaje
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCharacter = async () => {
      if (!id) return;

      try {
        const data = await fetchCharacterById(id as string);
        const validData = {
          ...data,
          //names: data.names || [],
          types: data.types || [],
          sprites: {
            ...data.sprites,
            other: data.sprites?.other || { 'official-artwork': { front_default: '' } }
          }
        };

        setCharacter(validData);
      } catch (error) {
        console.error('Error al cargar los datos del personaje:', error);
        setCharacter(null);
      } finally {
        setLoading(false);
      }
    };

    getCharacter();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!character) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-xl font-bold">No se encontró el personaje</Text>
      </View>
    );
  }

  const getBorderColor = (type: string | undefined) => {
    const typeColors: Record<string, string> = {
      fire: 'red',
      water: 'blue',
      grass: 'green',
      electric: 'yellow',
      bug: 'lightgreen',
      normal: 'lightblue',
      ice: 'cyan',
      psychic: 'purple',
      dark: 'darkslategray',
      steel: 'darkgray',
      dragon: 'darkkhaki',
      fairy: 'hotpink',
      ghost: 'rebeccapurple',
      poison: 'mediumpurple',
      ground: 'darkorange',
      fighting: 'lightsalmon',
      flying: 'lightskyblue',
      rock: 'peru',
    };

    return type ? typeColors[type.toLowerCase()] || 'white' : 'gray'; // Valor predeterminado si no hay tipo
  };

  const mainType = character.types?.[0]?.type?.name;

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
      }}
      style={{
        borderWidth: 15,
        borderColor: getBorderColor(mainType),
        borderRadius: 100,
      }}
    >
      {character.sprites?.other?.['official-artwork']?.front_default ? (
        <Image
          source={{ uri: character.sprites.other['official-artwork'].front_default.toString() }}
          style={{
            width: '100%',
            height: 300,
            borderRadius: 8,
            resizeMode: 'contain',
          }}
          resizeMethod="resize"
        />
      ) : (
        <Text className="text-lg font-bold">Imagen no disponible</Text>
      )}
      <Text className="text-2xl font-bold mt-4">#{character.id}</Text>
      <Text className="text-2xl font-bold mt-4">{character.name?.toUpperCase()}</Text>
      <Text className="text-xl font-bold mt-2">TYPE(S):</Text>
      {character.types?.length ? (
        character.types.map((typeItem, index) => (
          <Text key={index} className="mr-2">{typeItem.type.name.toUpperCase()}</Text>
        ))
      ) : (
        <Text>---</Text>
      )}
      <Text className="text-xl font-bold mt-2">ABILITIES:</Text>
      {character.abilities?.length ? (
        character.abilities.map((abilitiesItem, index) => (
          <Text key={index} className="mr-2">{abilitiesItem.ability.name.toUpperCase()}</Text>
        ))
      ) : (
        <Text>---</Text>
      )}
      <Text className="text-xl font-bold mt-2">HEIGHT: {character.height}</Text>
      <Text className="text-xl font-bold mt-2">WEIGHT: {character.weight}</Text>
    </ScrollView>
  );
};

export default CharacterDetailScreen;
