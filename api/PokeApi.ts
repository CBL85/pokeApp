import axios from 'axios';
import { ICharacter } from '@/api/interfaces/ICharacter';

// Base URL de la API
const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

// Función para obtener los Pokémon paginados
export const fetchCharacters = async (
  generation: number = 1 // Especifica la generación seleccionada (1, 2, 3, 4, ...)
): Promise<ICharacter[]> => {
  let offset = 0;
  let limit = 0;

  // Ajusta el offset y el limit según la generación seleccionada
  switch (generation) {
    case 1:
      offset = 0;  // Comienza desde el Pokémon 1
      limit = 151; // Generación 1 tiene 151 Pokémon
      break;
    case 2:
      offset = 151; // Comienza desde el Pokémon 152
      limit = 100;  // Generación 2 tiene 100 Pokémon
      break;
    case 3:
      offset = 251; // Comienza desde el Pokémon 252
      limit = 135;  // Generación 3 tiene 135 Pokémon
      break;
    case 4:
      offset = 386; // Comienza desde el Pokémon 387
      limit = 107;  // Generación 4 tiene 107 Pokémon
      break;
    case 5:
      offset = 493; // Comienza desde el Pokémon 387
      limit = 156;  // Generación 4 tiene 107 Pokémon
      break;
    case 6:
      offset = 649; // Comienza desde el Pokémon 387
      limit = 72;  // Generación 4 tiene 107 Pokémon
      break;
    case 7:
      offset = 721; // Comienza desde el Pokémon 387
      limit = 88;  // Generación 4 tiene 107 Pokémon
      break;
    case 8:
      offset = 809; // Comienza desde el Pokémon 387
      limit = 96;  // Generación 4 tiene 107 Pokémon
      break;
    case 9:
      offset = 905; // Comienza desde el Pokémon 387
      limit = 120;  // Generación 4 tiene 107 Pokémon
      break;
  }

  try {
    // Solicita los Pokémon de acuerdo al offset y limit
    const response = await axios.get(`${API_BASE_URL}?offset=${offset}&limit=${limit}`);
    const results = response.data.results;

    // Obtener los detalles completos de cada Pokémon
    const detailedResults = await Promise.all(
      results.map(async (result: any) => {
        const pokemonDetails = await axios.get(result.url);
        return pokemonDetails.data; // Retorna los detalles completos del Pokémon
      })
    );

    return detailedResults as ICharacter[];
  } catch (error) {
    console.error('Error al obtener los Pokémon:', error);
    throw error;
  }
};

// Función para obtener un Pokémon por ID o nombre
export const fetchCharacterById = async (id: string): Promise<ICharacter> => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!response.data) {
      throw new Error('No se encontró el Pokémon.');
    }

    // Imprimir los nombres disponibles en diferentes idiomas
    //console.log('Nombres disponibles:', response.data.pokemon('/1'));

    return response.data as ICharacter; // Forzamos que el retorno coincida con ICharacter
  } catch (error) {
    console.error('Error al obtener el Pokémon:', error);
    throw error;
  }
};