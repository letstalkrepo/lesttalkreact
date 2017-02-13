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
  ScrollView
} from 'react-native';
class Posts extends Component {
    constructor () 
    {
        super()
        this.state = {
            postMessage: ''
        };
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.messages = [];
        this.dataSource = ds.cloneWithRows(this.messages);
        this.handleInputOnChange = this.handleInputOnChange.bind(this);
        this.getAllPosts((message) => {
                this.messages.push(message);
                this.dataSource = ds.cloneWithRows(this.messages);
                this.handleInputOnChange = this.handleInputOnChange.bind(this);
                
                this.forceUpdate();
        });
    }

    saveBBDD (typeName)
    {
        const itemToSave = {userId: 1, postText: this.state.postMessage};
        const dbRef = firebase.database().ref(typeName);
        const newItemToSave = dbRef.push();
        newItemToSave.set(itemToSave);
    }

    getAllPosts(callback)
    {
        firebase.database().ref('post').on('child_added', function(data) {
            callback(data.val().postText);
        });
    }

    handleInputOnChange (event){
        this.setState({
            postMessage: event.target.value
        });
    }

    renderPostButton(){
        return (<Button onPress={() => this.saveBBDD('post')} title="Post message"/>)
    }

    render () 
    {
        return (
        <View>
            <View>
                <TextInput id="inputMessage" onChangeText={(postMessage) => this.setState({postMessage})}/>
                {this.renderPostButton()}
            </View>
            <ListView 
            dataSource={this.dataSource}
            renderRow={(rowData) => <Text>{rowData}</Text>}
            />
        </View>
        )
    }
}
export default Posts;
