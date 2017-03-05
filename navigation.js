import React, { Component } from 'react';
import firebase from 'firebase';
import Splash from './splash.js';
import Login from './login.js';
import Topics from './topics.js';
import Posts from './posts.js';
import userData from './userData.js';
import CreateTopic from './createTopic.js';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ListView,
  Navigator,
  DrawerLayoutAndroid,
  TouchableHighlight
} from 'react-native';
import { Icon } from 'react-native-material-design';


class Navigation extends Component {
    constructor () 
    {
      super();
      this.styleMenu = this.styleMenu.bind(this);
      this.actualMenu = "trendingTopics";
      this.openDrawer = this.openDrawer.bind(this);
      __this = this;
      _navigator = null;
    }

  openDrawer() {
        __this.drawer.openDrawer();
  }
  goTo(page){
    _navigator.push({
      id: page
    });
  }
  styleMenu(menu){
      if(menu == __this.actualMenu){
          return [styles.rowMenu, styles.selected];
      }
      else return styles.rowMenu;
  }
render() {
    return (<Navigator 
    initialRoute={{id: 'splash'}} 
    renderScene={this.navigatorRenderScene} 
    configureScene={(route, routeStack) =>
    Navigator.SceneConfigs.FloatFromRight}/>);
  }

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    var navigationView = '';
    var menuOptions =  <View style={{flex: 9}}>
                        <View style={__this.styleMenu('trendingTopics')}>
                         <Icon name="whatshot" style={styles.menuIcon} />
                             <Text style={styles.textMenu} onPress={__this.goTo.bind(__this, 'createTopic')}>Trending Topics</Text>
                        </View>
                        <View style={__this.styleMenu('createTopic')}>
                         <Icon name="create" style={styles.menuIcon} />
                             <Text style={styles.textMenu} onPress={__this.goTo.bind(__this, 'createTopic')}>Create Topic</Text>
                        </View>
                        <View style={__this.styleMenu('categories')}>
                            <Icon name="list" style={styles.menuIcon} />
                             <Text style={styles.textMenu} onPress={__this.goTo.bind(__this, 'createTopic')}>Categories</Text>
                        </View>
                        <View style={__this.styleMenu('search')}>
                         <Icon name="search" style={styles.menuIcon} />
                             <Text style={styles.textMenu} onPress={__this.goTo.bind(__this, 'createTopic')}>Search Topic</Text>
                        </View>
                        <View style={__this.styleMenu('myTopics')}>
                         <Icon name="favorite" style={styles.menuIcon} />
                             <Text style={styles.textMenu} onPress={__this.goTo.bind(__this, 'topics')}>My Topics</Text>
                        </View>
                        <View style={__this.styleMenu('about')}>
                                <Icon name="people" style={styles.menuIcon} />
                             <Text style={styles.textMenu} onPress={__this.goTo.bind(__this, 'createTopic')}>About</Text>
                        </View>
                    </View>;
	  if(userData.state.user === null){
      navigationView = (
           <View  style={{flex: 1}}>
                <View style={{flex: 3,backgroundColor: '#ed4f3e',flexDirection: 'column',        justifyContent: 'space-between', }} >
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex:1}}>
                            <View style={styles.circle}>
                                <Icon name="person" />
                            </View>
                        </View>
                        <View style={{ marginTop: 10, alignItems:'flex-end' }}>
                            <View style={{width: 100, height: 50, marginRight: 10}}>
                                <Button onPress={this.logIn} title="Login" />
                                    
                            </View>
                        </View>
                    </View>
                </View>
                {menuOptions}
            </View>
        );
    }
    else{
        navigationView = (
            <View  style={{flex: 1}}>
                <View style={{flex: 3,backgroundColor: '#ed4f3e',flexDirection: 'column',        justifyContent: 'space-between', }} >
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex:1}}>
                            <View style={styles.circle}>
                                <Icon name="person" />
                            </View>
                        </View>
                        <View style={{ marginTop: 10, alignItems:'flex-end' }}>
                            <View style={{width: 100, height: 50, marginRight: 10}}>
                                <Button onPress={this.logOut} title="Logout" />
                                    
                            </View>
                        </View>
                    </View>
                    <View  style={{marginBottom: 10, marginLeft:20}}>
                        <Text style={{fontSize: 16, color: '#ffffff'}}>{userData.state.user.email}</Text>
                    </View>
                </View>
                {menuOptions}
            </View>
        );
    }
    switch (route.id) {
      case 'splash':
        return (<Splash navigator={navigator} title="splash"/>);
      case 'login':
        return (
        <DrawerLayoutAndroid style={styles.landing}
            drawerWidth={300}
            ref={(_drawer) => __this.drawer = _drawer}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => navigationView}>
            <View style={styles.header}>
                <TouchableHighlight onPress={__this.openDrawer} style={styles.barMenuIcon}>
                    <View style={{flexDirection: 'row'}}>
                         <Icon name="menu" color="rgba(255,255,255,.9)" />
                        <Text style={styles.textBar}>Trending Topics</Text>
                    </View>
                </TouchableHighlight>
                <Login navigator={navigator} title="login" />
            </View>
            </DrawerLayoutAndroid>);
      case 'topics':
        return (<Topics navigator={navigator} title="topics" />);
      case 'posts':
        return (
        <DrawerLayoutAndroid style={styles.landing}
            drawerWidth={300}
            ref={(_drawer) => __this.drawer = _drawer}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => navigationView} style={{flex:1}}>
            <View style={[styles.header, styles.flex1]}>
                <TouchableHighlight onPress={__this.openDrawer} style={styles.barMenuIcon}>
                    <View style={{flexDirection: 'row'}}>
                         <Icon name="menu" color="rgba(255,255,255,.9)" />
                        <Text style={styles.textBar}>Posts</Text>
                    </View>
                </TouchableHighlight>
                <Posts navigator={navigator} title="posts" {... route.props} />
            </View>
            </DrawerLayoutAndroid>);
      case 'createTopic':
        return (<DrawerLayoutAndroid style={styles.landing}
            drawerWidth={300}
            ref={(_drawer) => __this.drawer = _drawer}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => navigationView}>
            <View style={styles.header}>
                <TouchableHighlight onPress={__this.openDrawer} style={styles.barMenuIcon}>
                    <View style={{flexDirection: 'row'}}>
                         <Icon name="menu" color="rgba(255,255,255,.9)" />
                        <Text style={styles.textBar}>Create Topic</Text>
                    </View>
                </TouchableHighlight>
                <CreateTopic navigator={navigator} title="createTopic" />
            </View>
            </DrawerLayoutAndroid>);
    }
  }
}


const styles= StyleSheet.create({
    userUtilsView:{
        height: 50
    },
    landing:{
        flex: 1,
        padding: 10
    },
    imageLogo:{
        marginTop: 15,
        flexDirection: 'column',
        alignItems:'center'
    },
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 56,
  },
  rowMenu:{
      flexDirection: 'row', 
      paddingTop: 10, 
      paddingLeft: 20,
      paddingBottom: 10
  },
  textBar:{
      marginLeft:20,
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'roboto',
      color: '#ffffff'
  },
  textMenu:{
      marginLeft:20,
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: 'roboto'
  },
  selected:{
      backgroundColor: '#e9eaed',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 100/2,
    backgroundColor: 'white',
    marginLeft:20,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header:{
    backgroundColor: '#ed4f3e'
  },
  barMenuIcon:{
    padding: 10
  },
  menuIcon:{
    fontSize: 20
  },
  logInButton:{
    backgroundColor: '#ed4f3e',
    color: '#000000',
    width: 5,
    marginTop: 50
  },
  flex1:{
    flex:1
  }
});

export default Navigation;
