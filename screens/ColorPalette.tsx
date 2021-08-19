import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ColorBox from '../components/ColorBox';
import { RootRouteProps } from '../App';

export interface IColorPaletteProps {
  colors: { colorName: string; hexCode: string }[];
  paletteName: string;
}
console.log('commit na main');
export const ColorPalette = () => {
  const route = useRoute<RootRouteProps<'ColorPalette'>>();
  console.log('new color palette');
  return (
    <FlatList
      data={route.params.colors}
      keyExtractor={(item) => item.hexCode}
      renderItem={({ item }) => (
        <ColorBox
          text={`${item.colorName} ${item.hexCode}`}
          color={item.hexCode}
        />
      )}
      contentContainerStyle={[styles.container]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
