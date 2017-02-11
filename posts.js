import React, { Component } from 'react';
import firebase from 'firebase';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ListView
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
        this.getAllPosts();
    }

    saveBBDD (typeName)
    {
        const itemToSave = {userId: 1, postText: this.state.postMessage};
        const dbRef = firebase.database().ref(typeName);
        const newItemToSave = dbRef.push();
        newItemToSave.set(itemToSave);
        this.messages.push(this.state.postMessage);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.dataSource = ds.cloneWithRows(this.messages);
    }

    createPostNode(text)
    {
        var pNode = document.createElement('p');
        pNode.innerHTML = text;
        return pNode;
    }

    getAllPosts()
    {
        firebase.database().ref('post').on('child_added', function(data) {
            /*
            var containerElement = document.getElementsByClassName('posts-container')[0];
            var pNode = document.createElement('p');
            pNode.innerHTML = data.val().postText;
            containerElement.insertBefore(pNode, containerElement.firstChild);
            */
            //messages.push(data.val().postText);
            //this.dataSource = ds.cloneWithRows(this.messages);
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
        <TextInput id="inputMessage" onChangeText={(postMessage) => this.setState({postMessage})}/>
        {this.renderPostButton()}
        <ListView
        dataSource={this.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
        />

        </View>
        )
    }
}
export default Posts;
