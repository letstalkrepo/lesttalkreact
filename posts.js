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
        _this = this;
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
        const itemToSave = {userId: firebase.auth().currentUser.uid, userMail: firebase.auth().currentUser.email, postText: this.state.postMessage, topicId: this.props.topicId};
        const dbRef = firebase.database().ref(typeName);
        const newItemToSave = dbRef.push();
        newItemToSave.set(itemToSave);
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
        return (<Button onPress={() => this.saveBBDD('post')} 
        title="Post message"/>)
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
        <View style={{flex:1}}>

            <Button onPress={this.goToTopics.bind(this)}  title="Back to Topics" color="#841584"/>

            
            <ScrollView style={{backgroundColor: '#efefef', height: 800, flex:1}} >
            <ListView dataSource={this.dataSource}
            
            renderRow={(rowData) => 
                <TouchableHighlight onPress={this.removePost.bind(this, rowData["postId"])}>
                    <View style={styles.text} elevation={5}>
                        <Text style={{fontWeight: "bold"}}>{rowData["postUserMail"]}</Text>
                        <Text>{rowData["postMessage"]}</Text>
                        </View>
                </TouchableHighlight>}/>

            </ScrollView>
            <TextInput 
            id="inputMessage" onChangeText={(postMessage) => this.setState({postMessage})}/>
            {this.renderPostButton()}
            
        </View>
        )
    }
}

const styles = StyleSheet.create({
  text: {
    padding: 7,
    margin: 3,
    backgroundColor: '#FFFFFF',
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
