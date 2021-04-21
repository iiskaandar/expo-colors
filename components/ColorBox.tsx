import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ColorBox = ({ text, color }: { text: string; color: string }) => {
  const boxColor = {
    backgroundColor: color,
  };
  const textColor = {
    color:
      parseInt(color.replace('#', ''), 16) > 0xffffff / 1.1 ? 'black' : 'white',
    fontWeight: 'bold',
  };
  return (
    <View style={[styles.box, boxColor]}>
      <Text style={textColor}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginVertical: 5,
    width: 320,
    borderRadius: 5,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default ColorBox;
