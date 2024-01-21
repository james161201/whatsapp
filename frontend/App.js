import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Homescreen from './screens/Homescreen';
import Chatscreen from './screens/Chatscreen';
import Messagescreen from './screens/Messagescreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GlobalState from './context';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <GlobalState>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Homepage'
        component={Homescreen}
        options={{headerShown : false}} />
         <Stack.Screen name='Chat'
        component={Chatscreen}
        options={{headerShown : false}}  />
        <Stack.Screen name='Message'
        component={Messagescreen} 
        ooptions={{headerShown : false}} />
       
      </Stack.Navigator>

    </NavigationContainer>
    <StatusBar hidden={true}  />
    </GlobalState>
  );
}

const styles = StyleSheet.create({

  
});
