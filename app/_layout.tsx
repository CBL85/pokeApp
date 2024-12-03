import { Slot, SplashScreen, Stack } from 'expo-router';
import './global.css';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();
const RootLayout = () => {

  const [fontsLoaded, error] = useFonts({
  'rale-black': require('../assets/fonts/Raleway-Black.ttf'),
  'rale-light': require('../assets/fonts/Raleway-Light.ttf'),
  'rale-medium':require('../assets/fonts/Raleway-Medium.ttf') ,
  });
  
  useEffect(( ) => {
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  },[fontsLoaded, error]);

  if(!fontsLoaded && !error) return null;
  return <GestureHandlerRootView style={{ flex: 1 }}><Slot/></GestureHandlerRootView>
  // return 
}

export default RootLayout;