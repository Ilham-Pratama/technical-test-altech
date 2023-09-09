import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {RootStackParamList} from '../utils/types';

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

function DetailScreen({route}: DetailsScreenProps) {
  const {title, body} = route.params;
  return (
    <View style={styles.viewContainer}>
      <Text variant="headlineMedium" style={styles.title}>
        {title}
      </Text>
      <Text variant="bodyLarge" style={styles.body}>
        {body}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    padding: 10,
  },
  title: {
    textAlign: 'center',
    marginBottom: 25,
    marginTop: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  body: {},
});

export default DetailScreen;
