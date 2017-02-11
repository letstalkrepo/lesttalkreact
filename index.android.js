import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import firebase from 'firebase';
import Posts from './posts.js';

  // Initialize Firebase
 firebase.initializeApp({
    apiKey: "AIzaSyAtgWdjEgbGSYTt5SCz2DNEMx6CLHg1pCo",
    authDomain: "lets-talk-e16c6.firebaseapp.com",
    databaseURL: "https://lets-talk-e16c6.firebaseio.com",
    storageBucket: "lets-talk-e16c6.appspot.com",
    messagingSenderId: "67803456662"
  });
  
export default class letstalk extends Component {
constructor () {
		super();
		this.state = { pictures: [], user: null };
		
		this.handleAuth = this.handleAuth.bind(this);
		this.renderLoginButton = this.renderLoginButton.bind(this);
		}
		handleAuth () {
			const provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithEmailAndPassword("rath1212@gmail.com", "testtest");
    }

		logOut(){
			firebase.auth().signOut()
				.then(function() {
					console.log('Signed Out');
				}, function(error) {
					console.error('Sign Out Error', error);
				});
		}
		
		renderLoginButton(){
			if(this.state.user !== null){
				//Esta logueado
				return (<View><p>Hola {this.state.user.displayName} !</p>
				<Image width="48px" source={this.state.user.photoURL} alt={this.state.user.displayName}></Image>
				<Button onPress={this.logOut} title="Cerrar sesión" /></View>)
			}
			else{
				//No esta logueado
				return (<Button onPress={this.handleAuth} title="Login con Google" />)
			}
		}
  render() {
    return (
      <View>
		    {this.renderLoginButton()}
			<Posts/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

AppRegistry.registerComponent('letstalk', () => letstalk);
