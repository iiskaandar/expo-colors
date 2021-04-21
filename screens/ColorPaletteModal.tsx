import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  Switch,
  Button,
} from 'react-native';
import { IColorPaletteProps } from './ColorPalette';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootRouteProps } from '../App';

export interface ModalProps {
  updateData: (colorPalette: IColorPaletteProps) => void;
}

const COLORS = [
  { colorName: 'AliceBlue', hexCode: '#F0F8FF' },
  { colorName: 'AntiqueWhite', hexCode: '#FAEBD7' },
  { colorName: 'Aqua', hexCode: '#00FFFF' },
];

export const ColorPaletteModal = () => {
  const [name, setName] = useState('');
  const [checkedColors, setCheckedColorsList] = useState<
    { colorName: string; hexCode: string }[]
  >([]);
  const navigation = useNavigation();
  const route = useRoute<RootRouteProps<'ColorPaletteModal'>>();
  return (
    <View style={styles.container}>
      <Text>Name of your palette</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Palette name"
      />
      <FlatList
        data={COLORS}
        keyExtractor={(colors) => colors.colorName}
        renderItem={({ item }) => {
          let isChecked = false;
          checkedColors.forEach((checkedColor) => {
            if (checkedColor === item) {
              isChecked = true;
            }
          });
          return (
            <View>
              <Text>{item.colorName}</Text>
              <Switch
                value={isChecked}
                onValueChange={() => {
                  const newList = checkedColors.includes(item)
                    ? checkedColors.filter((color) => color !== item)
                    : [item, ...checkedColors];
                  setCheckedColorsList(newList);
                }}
              />
            </View>
          );
        }}
      />
      <Button
        onPress={() => {
          route.params.updateData({
            colors: checkedColors,
            paletteName: name,
          });
          navigation.goBack();
        }}
        title="Submit"
        color="#841584"
        accessibilityLabel="Submit form"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  container: {
    marginTop: 60,
    marginHorizontal: 10,
  },
});
