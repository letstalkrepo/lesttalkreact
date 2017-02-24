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
  TouchableOpacity
} from 'react-native';
class Topics extends Component {
    constructor () 
    {
        super()
        this.state = {newTopic: ''};
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.topics = [];
        this.topics2 = [];
        this.dataSource = ds.cloneWithRows(this.topics);
        this.handleInputOnChange = this.handleInputOnChange.bind(this);
        this.getAllTopics((topicTitle, topicId) => {
                
                var topicItem = {};
                topicItem["topicTitle"] = topicTitle;
                topicItem["topicId"] = topicId;
                
                this.topics.push(topicItem);
                this.dataSource = ds.cloneWithRows(this.topics);
                this.handleInputOnChange = this.handleInputOnChange.bind(this);
                
                this.forceUpdate();
        });
    }

    saveBBDD (typeName)
    {
        const itemToSave = {userCreatorId: firebase.auth().currentUser.uid, userCreatorMail: firebase.auth().currentUser.email, title: this.state.newTopic};
        const dbRef = firebase.database().ref(typeName);
        const newItemToSave = dbRef.push();
        newItemToSave.set(itemToSave);
    }

    getAllTopics(callback)
    {
        firebase.database().ref('topics').on('child_added', function(data) {
            //callback(data.val().title, data.key);
            callback(data.val().title, data.key);
        });
    }

    handleInputOnChange (event){
        this.setState({
            newTopic: event.target.value
        });
    }


 goToPosts(_topicId) {
    this.props.navigator.push({
      id: 'posts',
       props: {
          topicId: _topicId
      }
    });
  }

 

    render () 
    {
        return (
          this.renderScene()
        )
    }

 renderScene()
  {
    return (
        <View style={styles.overallBlock}>
            <View  elevation={5} style={styles.newTopicBlock}>
                <Text style={styles.newTopicText}>New topic</Text>
                <TextInput id="inputNewTopic" onChangeText={(newTopic) => this.setState({newTopic})}/>
                <Button onPress={() => this.saveBBDD('topics')} title="Create topic"/>
            </View>
            <ScrollView>
                <ListView dataSource={this.dataSource} 
                renderRow={(rowData) =>
                 <TouchableHighlight onPress={this.goToPosts.bind(this, rowData["topicId"])}>
                    <View style={styles.text} elevation={5}>
                        <Text>{rowData["topicTitle"]}</Text>
                    </View>
                </TouchableHighlight>
                }/>
            </ScrollView>
        </View>
        );
  }

}

const styles = StyleSheet.create({
    overallBlock:{
        marginTop: 40
    },
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

export default Topics;
