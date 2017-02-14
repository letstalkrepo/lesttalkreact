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
        const itemToSave = {userId: firebase.auth().currentUser.uid, userMail: firebase.auth().currentUser.email, postText: this.state.postMessage};
        const dbRef = firebase.database().ref(typeName);
        const newItemToSave = dbRef.push();
        newItemToSave.set(itemToSave);
    }

    getAllPosts(callback)
    {
        firebase.database().ref('post').on('child_added', function(data) {
            callback('- ' + data.val().userMail + ':\n    '+ data.val().postText);
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
        <ScrollView>
        <TextInput id="inputMessage" onChangeText={(postMessage) => this.setState({postMessage})}/>
        {this.renderPostButton()}
        <ListView 
        dataSource={this.dataSource}
        
        renderRow={(rowData) => <View style={styles.text}><Text>{rowData}</Text></View>}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />

        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 12,
    fontSize: 16,
    padding: 5,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

export default Posts;
