// AppNameComponent.js

import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AppNameComponent = ({ appName }) => {
  const navigation = useNavigation();

  const handleAppNameClick = () => {
    navigation.navigate('MapScreen');
  };

  return (
    <TouchableOpacity onPress={handleAppNameClick}>
      <Text style={styles.appName}>{appName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default AppNameComponent;
