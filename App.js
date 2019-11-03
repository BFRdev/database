import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ListView } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem } from 'native-base'

import firebase from './firebase';

var data = []

export default class App extends React.Component {

  constructor(props) {
    super(props);

    //list view data source 
    this.ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2})

    this.state = {
      listViewData: data, 
      newContact: ""
    }
  }


  render() {
    return (

      <Container style={styles.container}>
        <Header>
          <Content>
            <Item>
              <Input placeholder="Add toDo"></Input>
              <Button>
                <Icon name="add"/>
              </Button>
            </Item>
          </Content>
        </Header>

        <Content>
          <List 
          dataSource={this.ds.cloneWithRows(this.state.listViewData)}
          renderRow={data => 
          <ListItem>
            <Text> {data} </Text>
          </ListItem>
          }
          renderLeftHiddenRow={data =>
          <Button full>
            <Icon name='information-circle'/>
          </Button>
          }
          renderRightHiddenRow={data =>
            <Button full danger>
              <Icon name='trash'/>
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

