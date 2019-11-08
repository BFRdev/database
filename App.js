
import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, SafeAreaView } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, ListItem } from 'native-base'

import firebase from './firebase'

var data = []



export default class App extends React.Component {



  constructor(props) {
    super(props);

    // this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.state = {
      listViewData: data,
      newContact: ""
    }



  }
  test = firebase.database().ref('/contacts');
  componentDidMount() {

    var that = this
    //add to child 
    this.test.on('value', snapshot => {
      const value = snapshot.val();

      var newData = [...that.state.listViewData]
      console.log(newData)
      //push data to database 
      // newData.push(data)
      this.setState({ listViewData: value })

      //convert object into array 
      const result = Object.keys(value).map((key) => value[key]);
      this.setState({ result })

    })

  }

  //create row for data to display 
  addRow(data) {

    var key = firebase.database().ref('/contacts').push().key
    // firebase.database().ref('/contacts').child().set({ name: data })
  }

  //delete data 
  async deleteRow(secId, rowId, rowMap, data) {
    //wait for function to exitute 
    await firebase.database().ref('contacts/' + data.key).set(null)

    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...this.state.listViewData];
    newData.splice(rowId, 1)
    this.setState({ listViewData: newData });

  }

  //show info not needed 
  showInformation() {

  }





  render() {
    return (

        <SafeAreaView>
          
          <Container style={styles.container}>
          
          {/* using native Base to build UI, StatusBar is for android */}
        <Header style={{ marginTop: StatusBar.currentHeight }}>
          <Content>
            <Item>
              <Input
                //input add items to list 
                onChangeText={(newContact) => this.setState({ newContact })}
                placeholder="Add list item"
              />
              {/* add item to list */}
              <Button onPress={() => this.addRow(this.state.newContact)} >
                <Icon name="add" />
              </Button>
            </Item>
          </Content>
        </Header>

          <FlatList>
        {/* display number of data */}
          <Text style={styles.text}>
            {this.state.result && this.state.result.length ? this.state.result.length : `nothing ${JSON.stringify(this.state.result)}`}
          </Text>

          </FlatList>
        </Container>
          
        </SafeAreaView>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6ccca2',

  },
  addBtn: {
    backgroundColor: '#6cc5cc',
  },
  text: {
    color: 'black', 
    fontSize: 30, 
  },
});

