import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import ColorSquare from '../components/ColorSquare';
import { IColorPaletteProps } from './ColorPalette';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [colorPalettes, setColorPalettes] = useState<IColorPaletteProps[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const navigation = useNavigation();

  const handleFetchColorPalettes = useCallback(async () => {
    const result = await fetch(
      'https://color-palette-api.kadikraman.now.sh/palettes',
    );
    const colorPalettesList = await result.json();
    if (result.ok) {
      setColorPalettes(colorPalettesList);
    }
  }, [setColorPalettes]);

  const updateData = (customPalette: IColorPaletteProps) => {
    if (colorPalettes) {
      setColorPalettes([customPalette, ...colorPalettes]);
    }
  };

  const updatePalette = (customPalette: IColorPaletteProps) => {
    let palettes = colorPalettes.map((palette) => {
      if (palette.paletteName === customPalette.paletteName) {
        return customPalette;
      }
      return palette;
    });
    console.log(palettes);
    setColorPalettes([...palettes]);
  };

  useEffect(() => {
    handleFetchColorPalettes();
  }, [handleFetchColorPalettes]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await handleFetchColorPalettes();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, [handleFetchColorPalettes]);

  return (
    <View style={[styles.container]}>
      <FlatList
        data={colorPalettes}
        keyExtractor={(item) => item.paletteName}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.box_container}
            onPress={() => {
              navigation.navigate('ColorPalette', {
                colors: item.colors,
                paletteName: item.paletteName,
                updatePalette: updatePalette,
              });
            }}
          >
            <Text style={styles.heading}>{item.paletteName}</Text>
            <FlatList
              data={item.colors}
              keyExtractor={(colors) => colors.colorName}
              renderItem={({ item }) => <ColorSquare color={item.hexCode} />}
              horizontal={true}
              initialNumToRender={5}
            />
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        ListHeaderComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ColorPaletteModal', {
                updateData,
              });
            }}
          >
            <Text style={styles.text}>Add a color scheme</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  container: {
    alignItems: 'flex-start',
    paddingVertical: 30,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3FB8AF',
    paddingBottom: 20,
  },
  box_container: {
    maxWidth: 170,
    marginBottom: 20,
  },
});

export default Home;
