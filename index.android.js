import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Navigator,
  TouchableOpacity,
  BackAndroid
} from 'react-native';
import firebase from 'firebase';
import Splash from './splash.js';
import Login from './login.js';
import Topics from './topics.js';
import Posts from './posts.js';
import Navigation from './navigation.js'

  // Initialize Firebase
 firebase.initializeApp({
    apiKey: "AIzaSyAtgWdjEgbGSYTt5SCz2DNEMx6CLHg1pCo",
    authDomain: "lets-talk-e16c6.firebaseapp.com",
    databaseURL: "https://lets-talk-e16c6.firebaseio.com",
    storageBucket: "lets-talk-e16c6.appspot.com",
    messagingSenderId: "67803456662"
  });
  
BackAndroid.addEventListener('hardwareBackPress', function() {
    _this.props.navigator.pop();
    return true;
});
export default class letstalk extends Component {
constructor () {
		super();
    this.state = {
        mail: '',
        password: '',
        user: null,
        errorMessage: ''
    };
  }
  
  render() {
    return (<Navigation />);
  }
}

AppRegistry.registerComponent('letstalk', () => letstalk);
