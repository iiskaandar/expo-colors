import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import { Button, TextInput, Switch } from 'react-native-paper';
import { IColorPaletteProps } from './ColorPalette';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootRouteProps } from '../App';
import { COLORS } from '../globals/colors';

export interface ModalProps {
  updateData: (colorPalette: IColorPaletteProps) => void;
  paletteName?: string;
  colors?: { colorName: string; hexCode: string }[];
  updatePalette?: (colorPalette: IColorPaletteProps) => void;
}

const showAlert = () =>
  Alert.alert(
    'Wrong color list',
    'Wrong name or to little added colors. You need to add minimum 3.',
    [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'This alert was dismissed by tapping outside of the alert dialog.',
        ),
    },
  );

export const ColorPaletteModal = () => {
  const route = useRoute<RootRouteProps<'ColorPaletteModal'>>();
  const [name, setName] = useState(route.params.paletteName || '');
  const [checkedColors, setCheckedColorsList] = useState<
    { colorName: string; hexCode: string }[]
  >(route.params.colors || []);
  const navigation = useNavigation();

  const checkValidity = () => {
    if (name !== '' && checkedColors.length > 2) {
      if (route.params.updatePalette) {
        route.params.updatePalette({
          colors: checkedColors,
          paletteName: name,
        });
      } else {
        route.params.updateData({
          colors: checkedColors,
          paletteName: name,
        });
      }
      navigation.goBack();
    } else {
      showAlert();
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode={'outlined'}
        placeholder="Palette name"
      />
      <ScrollView style={styles.scrollView}>
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
              <View style={styles.viewContainer}>
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
      </ScrollView>
      <Button
        onPress={checkValidity}
        mode="contained"
        accessibilityLabel="Submit form"
        disabled={!(name !== '' && checkedColors.length > 2)}
      >
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
  container: {
    marginTop: 60,
    marginHorizontal: 10,
  },
  scrollView: {
    maxHeight: 520,
    paddingBottom: 20,
  },
  viewContainer: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});
