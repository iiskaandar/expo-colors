import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  Switch,
  Button,
  ScrollView,
  Alert,
} from 'react-native';
import { IColorPaletteProps } from './ColorPalette';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootRouteProps } from '../App';
import { COLORS } from '../globals/colors';

export interface ModalProps {
  updateData: (colorPalette: IColorPaletteProps) => void;
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
  const [name, setName] = useState('');
  const [checkedColors, setCheckedColorsList] = useState<
    { colorName: string; hexCode: string }[]
  >([]);
  const navigation = useNavigation();
  const route = useRoute<RootRouteProps<'ColorPaletteModal'>>();

  const checkValidity = () => {
    if (name !== '' && checkedColors.length > 2) {
      route.params.updateData({
        colors: checkedColors,
        paletteName: name,
      });
      navigation.goBack();
    } else {
      showAlert();
    }
  };
  return (
    <View style={styles.container}>
      <Text>Name of your palette</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
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
        title="Submit"
        color="#3FB8AF"
        accessibilityLabel="Submit form"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  container: {
    marginTop: 60,
    marginHorizontal: 10,
  },
  scrollView: {
    maxHeight: 530,
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
