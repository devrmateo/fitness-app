import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
FontAwesome } from '@expo/vector-icons'

export default class App extends React.Component {

  componentDidMount() {
    console.log('before')
    debugger
    console.log('after')
  }

  render() {
    return (
      <View style={styles.container}>
        <FontAwesome name='soccer-ball-o' size={40} color='maroon'/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
