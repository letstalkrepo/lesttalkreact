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
                    <TextInput style={styles.inputText} id="mailInput" 
                onChangeText={(mail) => this.setState({mail})} 
                placeholder="Mail"/>
                <TextInput  id="passwordInput" 
                onChangeText={(password) => this.setState({password})} 
                placeholder="Password"/>
                
                {this.renderError()}
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Button style={styles.buttonInput} onPress={this.logIn} title="Login" />
                        <Button style={styles.buttonInput} onPress={this.register} title="Register" />
                    </View>
                </View>)
			}
			else{
				return (<View>
                    <Button onPress={this.logOut} title="Logout" />
                    <Posts /></View>)
			}
		}
  render() {
    return (
      <View style={styles.container}>
		    {this.renderLoginButton()}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#00BFFF',
    flexDirection: 'column',
    flex:1
  },
  inputText:{
  },
  buttonInput:{
      margin:5,
      flex:1 
  }
});

export default Login;
