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

    renderMyRow(rowData) {
        //console.log(this); // Output: null
        //var price = rowData.price_formatted.split(' ')[0];
        if(rowData["postUserMail"] == firebase.auth().currentUser.email)
        {
            return(
            <TouchableHighlight style={styles.thPostRight}>
                    <View style={[styles.text, styles.textRight]} elevation={5}>
                        <Text style={{fontWeight: "bold", color: '#ffffff'}}>{rowData["postUserMail"]}</Text>
                        <Text style={{color: '#ffffff'}}>{rowData["postMessage"]}</Text>
                        </View>
                </TouchableHighlight>
            );
        }
        else
        {
            return(
            <TouchableHighlight style={styles.thPostLeft}>
                    <View style={[styles.text, styles.textLeft]} elevation={5}>
                        <Text style={{fontWeight: "bold", color: '#ffffff'}}>{rowData["postUserMail"]}</Text>
                        <Text style={{color: '#ffffff'}}>{rowData["postMessage"]}</Text>
                        </View>
                </TouchableHighlight>
            );
        }
        
    }

    render () 
    {
        return (
        <View style={{flex:1}}>
            <ScrollView style={{backgroundColor: '#efefef', flex:0.6}} >
            <ListView style={{flex: 1}}
            dataSource={this.dataSource}
            renderRow={this.renderMyRow}
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
