import React, { Component } from 'react';
import firebase from 'firebase';
import {
  StyleSheet,
  View,
  Text,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

class Splash extends Component {
    constructor () 
    {
        super()
    }

    componentWillMount() {
      setTimeout(() => {
        this.props.navigator.push({
          id: 'login',
        });
      }, 1500);
  }

render() {
    return (this.renderScene());
  }

  renderScene() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ed4f3e'}}>
          <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 30}}>Let's Talk</Text>
      </View>
    );
  }

  


}

export default Splash;
