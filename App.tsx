import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import { ColorPalette, IColorPaletteProps } from './screens/ColorPalette';
import { RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ColorPaletteModal, ModalProps } from './screens/ColorPaletteModal';

const RootStack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  ColorPalette: IColorPaletteProps;
  ColorPaletteModal: ModalProps;
};

export type RootRouteProps<
  RouteName extends keyof RootStackParamList
> = RouteProp<RootStackParamList, RouteName>;

const MainStack = createStackNavigator<RootStackParamList>();

const MainStackScreen = () => {
  console.log('new app');
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen
        name="ColorPalette"
        component={ColorPalette}
        options={({ route }) => ({ title: route.params.paletteName })}
      />
    </MainStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="ColorPaletteModal"
          component={ColorPaletteModal}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
