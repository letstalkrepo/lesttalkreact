import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Navigator,
  Image,
  DrawerLayoutAndroid,
  TouchableHighlight,
  Button,
  ToastAndroid
} from 'react-native';
import firebase from 'firebase';
import Topics from './topics.js';
import { Icon } from 'react-native-material-design';
import userData from './userData.js';
var ToolbarAndroid = require('ToolbarAndroid');
var nativeImageSource = require('nativeImageSource');
var PushNotification = require('react-native-push-notification');
class Login extends Component {
    constructor () {
		super();
        
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
        this.register = this.register.bind(this);
        this.renderError = this.renderError.bind(this);
		this.renderLoginButton = this.renderLoginButton.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
        _this = this;
        firebase.auth().onAuthStateChanged(function(user) {
                userData.state.user = user;
                _this.renderLoginButton();
                _this.forceUpdate();
                _this.props.navigator.forceUpdate();
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
                _this.renderError();
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
                _this.renderError();
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
                ToastAndroid.show(_this.state.errorMessage, ToastAndroid.LONG);
            }
        }
        
		renderLoginButton(){
			if(userData.state.user === null){
				//No esta logueado
				return (<View style={{backgroundColor: '#efefef'}}>
                    
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
    return (
        <View>
		    {this.renderLoginButton()}
            </View>
    );
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
  }
});

//'#4874a8' azul lila

export default Login;
