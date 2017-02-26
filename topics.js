import React, { Component } from 'react';
import firebase from 'firebase';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView,
  ScrollView,
  TouchableHighlight,
  Navigator,
  TouchableOpacity,
  Image
} from 'react-native';
import { Button, Card } from 'react-native-material-design';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

class Topics extends Component {
    constructor () 
    {
        super()
        this.state = {newTopic: '', inputValue: ''};
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


    getAllTopics(callback)
    {
        firebase.database().ref('topics').on('child_added', function(data) {
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
        <View>
            <ScrollView>
                <ListView dataSource={this.dataSource} 
                renderRow={(rowData) =>
                    <Card onPress={this.goToPosts.bind(this, rowData["topicId"])}>
                        <Card.Body>
                            <Text>{rowData["topicTitle"]}</Text>
                        </Card.Body>
                    </Card>
                }/>
            </ScrollView>
            <ActionButton  buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#9b59b6' title="New Topic" onPress={() => console.log("notes tapped!")}>
                    <Icon name="md-create" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
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
    } ,
    actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default Topics;
