import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Navigator,
  TouchableOpacity
} from 'react-native';
import firebase from 'firebase';
import Splash from './splash.js';
import Login from './login.js';

  // Initialize Firebase
 firebase.initializeApp({
    apiKey: "AIzaSyAtgWdjEgbGSYTt5SCz2DNEMx6CLHg1pCo",
    authDomain: "lets-talk-e16c6.firebaseapp.com",
    databaseURL: "https://lets-talk-e16c6.firebaseio.com",
    storageBucket: "lets-talk-e16c6.appspot.com",
    messagingSenderId: "67803456662"
  });
  
var LoginPage = require('./login');
var TopicsPage = require('./topics');
var PostsPage = require('./posts');
var SplashPage = require('./splash');

export default class letstalk extends Component {
constructor () {
		super();
		}
  render() {
    return (
      //<View style={{flex:1}}>
			//<NavigatorIndex/>
      //</View>
       <Navigator
          initialRoute={{id: 'SplashPage', name: 'SplashPage'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} />
    );
  }

renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'SplashPage') {
      return (
        <Splash
          navigator={navigator} />
      );
    }
    if (routeId === 'LoginPage') {
      return (
        <Login
          navigator={navigator} />
      );
    }
    if (routeId === 'TopicsPage') {
      return (
        <Topics
          navigator={navigator} />
      );
    }
    if (routeId === 'PostsPage') {
      return (
        <Posts
            navigator={navigator} />
      );
    }
    
   return this.noRoute(navigator);

  }

  noRoute(navigator) {
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigator.pop()}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 30}}>Let's talk</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

var styles = StyleSheet.create({
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

const stylesSSSSSS = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    flexDirection: 'column',
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
