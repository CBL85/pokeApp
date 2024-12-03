import { View, Image, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router'; // Router para navegación

// Definición del componente ButtonCustom
interface ButtonCustomProps {
  onPress: () => void;
  className?: string; // Clase opcional para estilos personalizados
  color?: string; // Color opcional
  variant?: 'text-only'; // Soporte para variantes
  children: React.ReactNode; // Contenido del botón (texto o JSX)
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({ onPress, className, color, children }) => {
  return (
    <View
      style={{
        backgroundColor: color === 'primary' ? '#2196F3' : 'transparent', // Color de fondo según variante
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
        borderRadius: 5,
        ...(className ? { borderColor: '#ddd', borderWidth: 1 } : {}), // Estilos condicionales
      }}
    >
      <Text onPress={onPress} style={{ color: '#fff', fontWeight: 'bold' }}>
        {children}
      </Text>
    </View>
  );
};

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
        {/* Botón con texto */}
        <ButtonCustom
          onPress={() => router.push('/drawer/tabs/characters')}
          color="primary"
        >
          Characteres
        </ButtonCustom>

        {/* Botón con imagen */}
        <ButtonCustom
          onPress={() => router.push('/drawer/tabs/personajes')}
        >
          <Image
            source={require('../../../../img/Pokédex_on.png')} // Ajusta la ruta si es necesario
            style={{ width: 80, height: 80, resizeMode: 'contain' }}
          />
        </ButtonCustom>

        {/* Otro botón con texto */}
        <ButtonCustom
          onPress={() => router.push('/drawer/tabs/profile')}
          color="primary"
        >
          Perfil
        </ButtonCustom>

        {/* Botón con variante "text-only" */}
        <ButtonCustom
          onPress={() => router.push('/drawer/tabs/profile')}
          color="primary"
          variant="text-only"
        >
          Profile
        </ButtonCustom>

        {/* Último botón con texto */}
        <ButtonCustom
          onPress={() => router.push('/drawer/tabs/holder')}
          color="primary"
        >
          Holder
        </ButtonCustom>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
