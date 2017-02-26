import React, { Component } from 'react';
import firebase from 'firebase';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ListView,
  ScrollView,
  TouchableHighlight,
  Navigator,
  TouchableOpacity,
  BackAndroid
} from 'react-native';

class CreateTopic extends Component {
    
    constructor (props) 
    {
        super(props);
        this.state = {newTopic: '', inputValue: ''};
        
        BackAndroid.addEventListener('hardwareBackPress', function() {
            _this.props.navigator.pop();
            return true;
        });
    }
    
    saveBBDD (typeName)
    {
        const itemToSave = {userCreatorId: firebase.auth().currentUser.uid, userCreatorMail: firebase.auth().currentUser.email, title: this.state.newTopic};
        const dbRef = firebase.database().ref(typeName);
        const newItemToSave = dbRef.push();
        newItemToSave.set(itemToSave);
        this.state.newTopic = '';
    }
    render () 
    {
        return (
        <View style={{flex: 1}} >
            <Text style={styles.newTopicText}>New topic</Text>
            <TextInput 
            value={this.state.newTopic}
            id="inputNewTopic" onChangeText={(newTopic) => 
            this.setState({newTopic})}/>
            <Button onPress={() => this.saveBBDD('topics')} title="Create topic"/>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    newTopicBlock: {
        padding: 7,
        margin: 3,
        backgroundColor: '#FFFFFF'
    },
    newTopicText: {
        marginTop: 5,
    },
    text: {
        height: 40,
        padding: 7,
        margin: 3,
        backgroundColor: '#FFFFFF',
  } 
});


export default CreateTopic;