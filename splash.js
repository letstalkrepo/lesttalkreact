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
    var navigator = this.props.navigator;
    setTimeout(() => {
      this.gotoNext(this)
    }, 1500);
  }

render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          />
    );
  }
  renderScene(route, navigator) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableHighlight
            onPress={this.gotoNext.bind(this)}>
            <View>
          <Text style={{color: 'gray', fontWeight: 'bold', fontSize: 30}}>Let's Talk</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
  gotoNext() {
    this.props.navigator.push({
      id: 'LoginPage',
      name: 'LoginPage',
    });
  }
}

export default Splash;
