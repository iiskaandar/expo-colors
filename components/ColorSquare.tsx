import React from 'react';
import { View, StyleSheet } from 'react-native';

const ColorSquare = ({ color }: { color: string }) => {
  const boxColor = {
    backgroundColor: color,
  };
  return <View style={[styles.box, boxColor]} />;
};

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: 'rgba(120, 120, 120, 0.2)',
  },
});

export default ColorSquare;
