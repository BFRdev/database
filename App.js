import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ListView } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem } from 'native-base'

import firebase from './firebase';

var data = []

export default class App extends React.Component {

  constructor(props) {
    super(props);

    //list view data source 
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.state = {
      listViewData: data,
      newContact: ""
    }
  }

  componentDidMount() {
    var that = this

    firebase.database().ref('/toDo').on('child_added', function (data) {
      var newData = [...that.state.listViewData]
      newData.push(data)
      that.setState({ listViewData: newData })
    })
  }

  addRow(data) {
    var key = firebase.database().ref('/toDo').push.key
    firebase.database().ref('/toDo').child(key).set({ name: data })
  }

  async deleteRow(data, secId, rowId, rowMap) {
    await firebase.database().ref('toDo' + data).set(null)
    rowMap[`${secId} ${rowId}`].props.closeRow();
    var newData = [... this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  showInformation() {

  }


  render() {
    return (

      <Container style={styles.container}>
        <Header>
          <Content>
            <Item>
              <Input onChangeText={(newContact) => this.setState({ newContact })}
                placeholder="Add toDo"
              />
              <Button onPress={() => this.addRow(this.state.newContact)}>
                <Icon name="add" />
              </Button>
            </Item>
          </Content>
        </Header>

        <Content>
          <List enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem>
                <Text> {data.val().name} </Text>
              </ListItem>
            }
            renderLeftHiddenRow={data =>
              <Button full onPress={() => this.addRow(data)}>
                <Icon name='information-circle' />
              </Button>
            }
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={() => this.deleteRow(secId, rowId, rowMap, data)}>
                <Icon name='trash' />
              </Button>
            }

            leftOpenValue={-75}
            rightOpenValue={-75}

          />
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});

