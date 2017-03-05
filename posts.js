import React, { Component } from 'react';
import firebase from 'firebase';
import PostMessage from './postMessage.js';
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
 var PushNotification = require('react-native-push-notification');

class Posts extends Component {
    constructor (props) 
    {
        super(props)
        this.state = {
            postMessage: '',
        };
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.messages = [];
        this.dataSource = ds.cloneWithRows(this.messages);
        this.handleInputOnChange = this.handleInputOnChange.bind(this);
        this.postRef = firebase.database().ref('post').orderByChild("topicId").equalTo(this.props.topicId);
        this.getAllPosts(this.props.topicId, (postUserMail, postMessage, postId) => {
                var postItem = {};
                postItem["postUserMail"] = postUserMail;
                postItem["postMessage"] = postMessage;
                postItem["postId"] = postId;

                this.messages.push(postItem);
                this.dataSource = ds.cloneWithRows(this.messages);
                this.handleInputOnChange = this.handleInputOnChange.bind(this);
                
                this.forceUpdate();
        });
    }

    pocessGetAllPosts()
    {
        
    }

    saveBBDD (typeName)
    {
        if(this.state.postMessage != ""){
            const itemToSave = {userId: firebase.auth().currentUser.uid, userMail: firebase.auth().currentUser.email, postText: this.state.postMessage, topicId: this.props.topicId};
            const dbRef = firebase.database().ref(typeName);
            const newItemToSave = dbRef.push();
            newItemToSave.set(itemToSave);
            this.state.postMessage = "";
        }
    }

    getAllPosts(topicId, callback)
    {
        this.postRef.on('child_added', function(data) {
            callback(data.val().userMail, data.val().postText, data.key);
        });
        this.postRef.limitToLast(1).on('child_added', function(data) {
            if(firebase.auth().currentUser.email != data.val().userMail){
                PushNotification.localNotification({
                    message: data.val().userMail + " - " + data.val().postText
                });
            }
        });
       
    }

    handleInputOnChange (event){
        this.setState({
            postMessage: event.target.value
        });
    }

    renderPostButton(){
        return (
        <View style={{margin: 10}}>
            <Button
            onPress={() => this.saveBBDD('post')} 
            title="Post"/>
        </View>)
    }

  goToTopics() {
    this.props.navigator.pop();
  }

  removePost(_postId)
  {
        firebase.database().ref('post').child(_postId).remove();
        this.goToTopics();
  }

    render () 
    {
        return (
        <View style={{flex:1, backgroundColor: '#efefef'}}>
            <ScrollView style={{backgroundColor: '#efefef', flex:1}} >
                <ListView style={{flex: 1}}
                    dataSource={this.dataSource}
                    renderRow={(data) => <PostMessage {...data} />}
                />
            </ScrollView>
            <View style={{flexDirection: 'row'}} >
                <TextInput 
                style={{flex: 1, margin: 10}}
                id="inputMessage" 
                value={this.state.postMessage}
                onChangeText={(postMessage) => this.setState({postMessage})}/>
                {this.renderPostButton()}
            </View>
        </View>
        )
    }
}

export default Posts;
