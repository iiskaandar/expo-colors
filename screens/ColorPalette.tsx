import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ColorBox from '../components/ColorBox';
import { RootRouteProps } from '../App';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export interface IColorPaletteProps {
  colors: { colorName: string; hexCode: string }[];
  paletteName: string;
  updatePalette?: (colorPalette: IColorPaletteProps) => void;
}

export const ColorPalette = () => {
  const route = useRoute<RootRouteProps<'ColorPalette'>>();
  const navigation = useNavigation();
  return (
    <>
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
      <Button
        mode="outlined"
        accessibilityLabel="Add additional color"
        onPress={() => {
          navigation.navigate('ColorPaletteModal', {
            updateData: route.params.updatePalette,
            paletteName: route.params.paletteName,
            colors: route.params.colors,
          });
        }}
      >
        Add additional colors
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
