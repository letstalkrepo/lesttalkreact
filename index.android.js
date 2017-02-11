import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import firebase from 'firebase';

  // Initialize Firebase
 firebase.initializeApp({
    apiKey: "AIzaSyAtgWdjEgbGSYTt5SCz2DNEMx6CLHg1pCo",
    authDomain: "lets-talk-e16c6.firebaseapp.com",
    databaseURL: "https://lets-talk-e16c6.firebaseio.com",
    storageBucket: "lets-talk-e16c6.appspot.com",
    messagingSenderId: "67803456662"
  });
export default class letstalk extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native! test
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('letstalk', () => letstalk);
