import React, { Component } from 'react';
import firebase from 'firebase';
import Splash from './splash.js';
import Login from './login.js';
import Topics from './topics.js';
import Posts from './posts.js';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ListView,
  Navigator,
} from 'react-native';


class Navigation extends Component {
    constructor () 
    {
      super()
    }

render() {
    return (<Navigator style={styles.container} initialRoute={{id: 'splash'}} renderScene={this.navigatorRenderScene}/>);
  }

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'splash':
        return (<Splash navigator={navigator} title="splash"/>);
      case 'login':
        return (<Login navigator={navigator} title="login" />);
      case 'topics':
        return (<Topics navigator={navigator} title="topics" />);
      case 'posts':
        return (<Posts navigator={navigator} title="posts" {... route.props} />);
    }
  }
}

var styles = StyleSheet.create({
  container: {
    //flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: '#F5FCFF',
    marginTop: 10,
  },
});


export default Navigation;
