
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Pages/Home';
import AppMod from './Pages/AppModes';
import MannualMode from './Pages/MannualMode';
import Connect from './Pages/Connect';
import  demo from './Pages/demo';
import ProgramSettings from './Pages/ProgramSettings';
import DetailProgram from './Pages/DetailProgram';
import AddProgram from './Pages/AddProgram';
import TestMode from './Pages/TestMode';
const Stack = createNativeStackNavigator();


const Bottom = createMaterialBottomTabNavigator();
export default function App() {
  //

  function MyStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Connect} />
        <Stack.Screen name='Connect' component={Home}/>
        <Stack.Screen name="AppMode" component={AppMod} />
        <Stack.Screen name='MannualMode' component={MannualMode} />
        <Stack.Screen name='ProgramSettings' component={ProgramSettings} />
        <Stack.Screen name='DetailProgram' component={DetailProgram}/>
        <Stack.Screen name='AddProgram' component={AddProgram}/>
        <Stack.Screen name='TestMode' component={TestMode}/>
      </Stack.Navigator>

    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Mainstack" component={MyStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


