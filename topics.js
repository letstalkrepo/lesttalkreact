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
class Topics extends Component {
    constructor () 
    {
        super()
        this.state = {newTopic: ''};
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.topics = [];
        this.dataSource = ds.cloneWithRows(this.topics);
        this.handleInputOnChange = this.handleInputOnChange.bind(this);
        this.getAllTopics((topic) => {
                this.topics.push(topic);
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
            callback(data.val().title);
        });
    }

    handleInputOnChange (event){
        this.setState({
            newTopic: event.target.value
        });
    }

    renderAllTopics()
    {
        return (
            <ScrollView>
                <ListView dataSource={this.dataSource} 
                renderRow={(rowData) => <View style={styles.text} elevation={5}>
                    <Text>{rowData}</Text>
                </View>}/>
            </ScrollView>
        )
    }

    renderPostButton()
    {
        return (<Button onPress={() => this.saveBBDD('topics')} title="Create topic"/>)
    }

    render () 
    {
        return (
        <View style={styles.overallBlock}>
            <View  elevation={5} style={styles.newTopicBlock}>
                <Text style={styles.newTopicText}>New topic</Text>
                <TextInput id="inputNewTopic" onChangeText={(newTopic) => this.setState({newTopic})}/>
                {this.renderPostButton()}
            </View>
            {this.renderAllTopics()}
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
