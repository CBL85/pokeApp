import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importa Picker
import { fetchCharacters } from '@/api/PokeApi'; // Importa la función desde la API centralizada
import { ICharacter } from '@/api/interfaces/ICharacter';
import { Link } from 'expo-router';

function isICharacter(item: any): item is ICharacter {
  return item && typeof item.name === 'string' && Array.isArray(item.types);
}

const CharactersScreen = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]); // Tipo explícito
  const [loading, setLoading] = useState(true);
  const [generation, setGeneration] = useState('1'); // Generación seleccionada

  const generations = [
    { label: 'Generación 1', value: '1', start: 1, end: 151 },
    { label: 'Generación 2', value: '2', start: 152, end: 251 },
    { label: 'Generación 3', value: '3', start: 252, end: 386 },
    { label: 'Generación 4', value: '4', start: 387, end: 493 },
    { label: 'Generación 5', value: '5', start: 494, end: 649 },
    { label: 'Generación 6', value: '6', start: 650, end: 721 },
    { label: 'Generación 7', value: '7', start: 722, end: 809 },
    { label: 'Generación 8', value: '8', start: 810, end: 905 },
    { label: 'Generación 9', value: '9', start: 906, end: 1025 },
  ];

  useEffect(() => {
    const getCharacters = async () => {
      try {
        setLoading(true);
        const selectedGen = generations.find((gen) => gen.value === generation);
        if (selectedGen) {
          const allCharacters = await fetchCharacters(Number(selectedGen.value));
          const validCharacters = allCharacters.filter(isICharacter);
          setCharacters(validCharacters);
        }
      } catch (error) {
        console.error('Error al cargar los personajes:', error);
      } finally {
        setLoading(false);
      }
    };

    getCharacters();
  }, [generation]); // Se ejecuta cada vez que cambia la generación

  const getBorderColor = (type: string) => {
    const typeColors: { [key: string]: string } = {
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
    return typeColors[type.toLowerCase()] || 'white';
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 px-4 bg-gray-100">
      {/* Dropdown para seleccionar generación */}
      <Picker
        selectedValue={generation}
        onValueChange={(value) => setGeneration(value)}
        style={{ marginBottom: 10 }}
      >
        {generations.map((gen) => (
          <Picker.Item key={gen.value} label={gen.label} value={gen.value} />
        ))}
      </Picker>

      {/* Listado de personajes */}
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View className="flex-1 px-2 py-2">
            <View
              className="bg-white rounded-lg shadow-md p-4 h-auto"
              style={{
                borderWidth: 3,
                borderColor: getBorderColor(item.types[0].type.name),
                borderRadius: 8,
              }}
            >
              <Link href={`/drawer/tabs/(navigator)/personajes/${item.id}`}>
                <Image
                  source={{
                    uri: item.sprites && item.sprites.other && item.sprites.other['official-artwork']
                      ? item.sprites.other['official-artwork'].front_default.toString()
                      : 'default-image-url'
                  }}
                  style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 8,
                    resizeMode: 'contain',
                  }}
                />
              </Link>
              <Text className="text-lg font-bold mt-2 text-center">
                #{item.id} {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CharactersScreen;