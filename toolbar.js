import React, { Component } from 'react';
import firebase from 'firebase';
import {
  StyleSheet,
  View,
  Text,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
    DrawerLayoutAndroid
} from 'react-native';

class Toolbar extends Component {
    constructor () 
    {
        super()
    }


render() {
    return (this.renderScene());
  }

  renderScene() {
          var navigationView = '';
      navigationView = (
            <View style={{flex: 1, flexDirection: 'row'}} >
                <View>
                    <Text >Trending Topics</Text>
                    <Text>Search Topics</Text>
                    <Text>My Topics</Text>
                    <Text>About</Text>
                </View>
            </View>
        );
    
    return (
      <DrawerLayoutAndroid style={styles.landing}
            drawerWidth={300}
            ref={(_drawer) => this.drawer = _drawer}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => navigationView}>
            <TouchableHighlight onPress={this.openDrawer}>
                <Text>{'Open Drawer'}</Text>
              </TouchableHighlight>
          </DrawerLayoutAndroid>
    );
  }

}

const styles= StyleSheet.create({
    userUtilsView:{
        height: 50
    },
    landing:{
        backgroundColor: 'aqua',
        flex: 1,
        padding: 10
    },
    imageLogo:{
        flexDirection: 'column',
        alignItems:'center'
    },
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 56,
  },
    
});

export default Toolbar;
