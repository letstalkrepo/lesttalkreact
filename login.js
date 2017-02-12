import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import firebase from 'firebase';
import Posts from './posts.js';

class Login extends Component {
    constructor () {
		super();
        this.state = {
            mail: '',
            password: '',
            user: null
        };
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
        this.register = this.register.bind(this);
		this.renderLoginButton = this.renderLoginButton.bind(this);
        
        _this = this;
        firebase.auth().onAuthStateChanged(function(user) {
                _this.state.user = user;
                _this.renderLoginButton();
                _this.forceUpdate();
            })
        
		}
		logIn() {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithEmailAndPassword(this.state.mail, this.state.password);
        }

        register(){
            if(this.state.mail != "" && this.state.password != ""){
                const provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().createUserWithEmailAndPassword(this.state.mail, this.state.password);
            }
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
			if(this.state.user === null){
				//No esta logueado
				return (<View><TextInput  id="mailInput" onChangeText={(mail) => this.setState({mail})} placeholder="Mail"/>
          <TextInput  id="passwordInput" 
          onChangeText={(password) => this.setState({password})} placeholder="Password"/><Button onPress={this.logIn} title="Login" />
          
            <View><Button onPress={this.register} title="Register" /></View></View>)
			}
			else{
				return (<Posts />)
			}
		}
  render() {
    return (
      <View>
          
		    {this.renderLoginButton()}
      </View>
    );
  }
}
export default Login;
