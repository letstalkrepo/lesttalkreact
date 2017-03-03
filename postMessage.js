import React, { Component } from 'react';
import firebase from 'firebase';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  BackAndroid
} from 'react-native';

class PostMessage extends Component {
    constructor (props) 
    {
        super(props)
        _this = this;
    }

    render() {
        if(this.props.postUserMail == firebase.auth().currentUser.email)
        {
            return(
            <TouchableHighlight style={styles.thPostRight}>
                    <View style={[styles.text, styles.textRight]} elevation={5}>
                        <Text style={{fontWeight: "bold", color: '#ffffff'}}>{this.props.postUserMail}</Text>
                        <Text style={{color: '#ffffff'}}>{this.props.postMessage}</Text>
                        </View>
                </TouchableHighlight>
            );
        }
        else
        {
            return(
            <TouchableHighlight style={styles.thPostLeft}>
                    <View style={[styles.text, styles.textLeft]} elevation={5}>
                        <Text style={{fontWeight: "bold", color: '#ffffff'}}>{this.props.postUserMail}</Text>
                        <Text style={{color: '#ffffff'}}>{this.props.postMessage}</Text>
                        </View>
                </TouchableHighlight>
            );
        }
    }
}

const styles = StyleSheet.create({
    thPostLeft: {
        flexDirection: 'row',
        flex: 0.8,
        justifyContent: 'flex-start',
        
    },
    thPostRight: {
        flexDirection: 'row',
        flex: 0.8,
        justifyContent: 'flex-end',
    },
    textLeft: {
        backgroundColor: '#9eb6c1',
        maxWidth: 300,
    },
    textRight:{
        backgroundColor: '#73d99c',
        maxWidth: 300,
    },
  text: {
    padding: 7,
    margin: 3,
    borderRadius: 3,
  },
});

export default PostMessage;
