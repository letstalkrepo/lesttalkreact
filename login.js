import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Navigator,
  Image,
  DrawerLayoutAndroid,
  TouchableHighlight
} from 'react-native';
import firebase from 'firebase';
import Topics from './topics.js';
import { Icon } from 'react-native-material-design';
var ToolbarAndroid = require('ToolbarAndroid');
var nativeImageSource = require('nativeImageSource');
var PushNotification = require('react-native-push-notification');
class Login extends Component {
    constructor () {
		super();
        this.state = {
            mail: '',
            password: '',
            user: null,
            errorMessage: ''
        };
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
        this.register = this.register.bind(this);
        this.renderError = this.renderError.bind(this);
		this.renderLoginButton = this.renderLoginButton.bind(this);
        
        this.openDrawer = this.openDrawer.bind(this);
        _this = this;
        firebase.auth().onAuthStateChanged(function(user) {
                _this.state.user = user;
                _this.renderLoginButton();
                _this.forceUpdate();
            })
        PushNotification.configure({
            onRegister: function(token) {
                alert( 'TOKEN:' + token );
            },
            onNotification: function(notification) {
                alert( 'NOTIFICATION:' + notification.message);
            },
            popInitialNotification: true,
            requestPermissions: true,
        });
        
		}
		logIn() {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithEmailAndPassword(this.state.mail, this.state.password).catch(function(error) {
                var errorCode = error.code;
                if (errorCode === 'auth/wrong-password') {
                    _this.state.errorMessage = 'Wrong password.';
                } else if(errorCode === 'auth/invalid-email'){
                    _this.state.errorMessage = 'Wrong mail.';
                }else if(errorCode === 'auth/user-not-found'){
                    _this.state.errorMessage = 'Email not found.';
                }
                else{
                    _this.state.errorMessage = 'Error. Try again';
                }
                _this.forceUpdate();
            });
        }

        register(){
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().createUserWithEmailAndPassword(this.state.mail, this.state.password).catch(function(error) {
                var errorCode = error.code;
                if (errorCode === 'auth/email-already-in-use') {
                    _this.state.errorMessage = 'Email already in use.';
                } else if(errorCode === 'auth/invalid-email'){
                    _this.state.errorMessage = 'Invalid email.';
                }else if(errorCode === 'auth/weak-password'){
                    _this.state.errorMessage = 'Password too wek..';
                }
                else{
                    _this.state.errorMessage = 'Error. Try again';
                }
                _this.forceUpdate();
            });
        }

		logOut(){
			firebase.auth().signOut()
            .then(function() {
                console.log('Signed Out');
            }, function(error) {
                console.error('Sign Out Error', error);
            });
             _this.state.user = null;
            _this.renderLoginButton();
            _this.forceUpdate();
		}
		
        renderError(){
            if(_this.state.errorMessage != ""){
                return(<Text style={{color: 'red'}}>{_this.state.errorMessage}</Text>);
            }
            else return(<Text />);
        }
        
		renderLoginButton(){
			if(this.state.user === null){
				//No esta logueado
				return (<View>
                    
          <View style={styles.imageLogo}>
                <Image 
                source={{uri: 'http://oi63.tinypic.com/2sai1aq.jpg'}}
            style={{width: 71, height: 57}} />
            </View>
                    <TextInput  id="mailInput" 
                onChangeText={(mail) => this.setState({mail})} 
                placeholder="Mail"/>
                <TextInput  id="passwordInput" 
                onChangeText={(password) => this.setState({password})} 
                placeholder="Password"/>
                
                {this.renderError()}
                
                
                <Button onPress={this.logIn} title="Login" />
                <Text/>
                <View><Button onPress={this.register} title="Register" /></View></View>)
			}
			else{
				return (<View>
                    <Topics navigator={this.props.navigator} title="topics"/>
                    </View>)
			}
		}
    goToTopics()
    {
        this.props.navigator.push({
            id: 'topics',
        });
    }
onActionSelected(position) {
  if (position === 0) {
    }
}
  openDrawer() {
        this.drawer.openDrawer();
  }
  goTo(page){
    this.props.navigator.push({
      id: page
    });
  }
  render() {
      var navigationView = '';
	  if(this.state.user === null){
      navigationView = (
            <View style={{flex: 1, flexDirection: 'row'}} >
                <View>
                    <Text onPress={this.goTo.bind(this, 'createTopic')}>Trending Topics</Text>
                    <Text>Search Topics</Text>
                    <Text>My Topics</Text>
                    <Text>About</Text>
                </View>
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
                        <Text style={{fontSize: 16, color: '#ffffff'}}>{this.state.user.email}</Text>
                    </View>
                </View>
                    <View style={{flex: 9}}>
                        <View style={styles.rowMenu}>
                         <Icon name="whatshot" style={styles.menuIcon} />
                             <Text style={styles.textMenu} onPress={this.goTo.bind(this, 'createTopic')}>Trending Topics</Text>
                        </View>
                        <View style={styles.rowMenu}>
                         <Icon name="create" style={styles.menuIcon} />
                             <Text style={styles.textMenu} onPress={this.goTo.bind(this, 'createTopic')}>Create Topic</Text>
                        </View>
                        <View style={[styles.rowMenu, styles.selected]}>
                            <Icon name="list" style={styles.menuIcon} />
                             <Text style={styles.textMenu} onPress={this.goTo.bind(this, 'createTopic')}>Categories</Text>
                        </View>
                        <View style={styles.rowMenu}>
                         <Icon name="search" style={styles.menuIcon} />
                             <Text style={styles.textMenu} onPress={this.goTo.bind(this, 'createTopic')}>Search Topic</Text>
                        </View>
                        <View style={styles.rowMenu}>
                         <Icon name="favorite" style={styles.menuIcon} />
                             <Text style={styles.textMenu} onPress={this.goToTopics.bind(this)}>My Topics</Text>
                        </View>
                        <View style={styles.rowMenu}>
                                <Icon name="people" style={styles.menuIcon} />
                             <Text style={styles.textMenu} onPress={this.goTo.bind(this, 'createTopic')}>About</Text>
                        </View>
                    </View>
                    
            </View>
        );
    }
    return (
        <DrawerLayoutAndroid style={styles.landing}
            drawerWidth={300}
            ref={(_drawer) => this.drawer = _drawer}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => navigationView}>
            <View style={styles.header}>
                <TouchableHighlight onPress={this.openDrawer} style={styles.barMenuIcon}>
                    <View style={{flexDirection: 'row'}}>
                         <Icon name="menu" color="rgba(255,255,255,.9)" />
                        <Text style={styles.textBar}>Trending Topics</Text>
                    </View>
                </TouchableHighlight>
            </View>
		    {this.renderLoginButton()}
          </DrawerLayoutAndroid>
    );
  }

}


const styles= StyleSheet.create({
    userUtilsView:{
        height: 50
    },
    landing:{
        backgroundColor: 'grey',
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
    }
    
});

//'#4874a8' azul lila

export default Login;
