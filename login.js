import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image
} from 'react-native';
import firebase from 'firebase';
import Posts from './posts.js';
import Topics from './topics.js';
import FireAuth from 'react-native-firebase-auth';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
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

            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
                alert( 'NOTIFICATION:' + notification.message);
            },
            popInitialNotification: true,
            requestPermissions: true,
        });
         GoogleSignin.hasPlayServices({autoResolve: true}).then(() => {
            GoogleSignin.configure({
                scopes: [
                    'email', 'profile', 'https://www.googleapis.com/auth/plus.profile.emails.read', 'https://www.googleapis.com/auth/plus.login'
                ],
                webClientId: "67803456662-37a33lqirl0qe12vn7tr78jpqv01418c.apps.googleusercontent.com",
                offlineAccess: true
            })
            .then(() => {
                GoogleSignin.currentUserAsync().then((user) => {
                    console.log('USER', user);
                    _this.state.user = user;
                    _this.renderLoginButton();
                    _this.forceUpdate();
                }).done()
            });
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
            GoogleSignin.signOut()
            .then(() => {
            console.log('out');
            })
            .catch((err) => {

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
        _signIn(){
            GoogleSignin.signIn()
                .then((user) => {
                    _this.state.user = user;
                    _this.renderLoginButton();
                    _this.forceUpdate();
                })
                .catch((err) => {
                })
            .done();
        }
        /*
        <GoogleSigninButton
                style={{width: 312, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={this._signIn.bind(this)}/>
                */
        
		renderLoginButton(){
			if(this.state.user === null){
				//No esta logueado
				return (<View>
                    <TextInput  id="mailInput" 
                onChangeText={(mail) => this.setState({mail})} 
                placeholder="Mail"/>
                <TextInput  id="passwordInput" 
                //onSubmitEditing={this.logIn}
                onChangeText={(password) => this.setState({password})} 
                placeholder="Password"/>
                
                {this.renderError()}
                
                
                <Button onPress={this.logIn} title="Login" />
                <Text/>
                <View><Button onPress={this.register} title="Register" /></View></View>)
			}
			else{
				return (<View>
                    <View style={{flex: 1, flexDirection: 'row'}} >
                        <View style={{width: 150, height: 50}}>
                            <Text>{this.state.user.email}</Text>
                        </View>
                        <View style={{width: 200, height: 50}}>
                            <Button onPress={this.logOut} title="Logout" />
                        </View>
                    </View>
                    <Topics/></View>)
			}
		}
  render() {
    return (
      <View style={styles.landing}>
          <View style={styles.imageLogo}>
          <Image 
           source={{uri: 'http://fpscny.org/wordpress2/wp-content/uploads/Lets-Talk-Final-Logo.png'}}
       style={{width: 50, height: 50}} />
       </View>
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
        backgroundColor: 'aqua',
        flex: 1,
        padding: 10
    },
    imageLogo:{
        flexDirection: 'column',
        alignItems:'center'
    }
    
});

export default Login;
