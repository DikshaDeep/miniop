import React from 'react';
import {FlatList, TouchableHighlight} from 'react-native-gesture-handler';
import {ProductList} from '../../Product/ProductList';
import {View, StyleSheet, TextInput, Button, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Entypo';
// import { Context } from "../context/statesProvider";
export const LabelList = props => {
  const arraylabledata = props.lableinfo.data;
  const labledataindex = props.lableindex;
  const lablename = props.lableinfo.lablename;

  //const { updateLable } = useContext(Context);
  return (
    <SafeAreaView style={styles.safeareaview}>
      <View style={styles.buttonView}>
        <TextInput
          style={styles.itemText}
          value={lablename}
          placeholder="Enter Lable Name"
          onChangeText={text => {
            return props.onChangeLableName(text, labledataindex);
          }}
        />
        {/* <TouchableHighlight
          style={styles.button}
          onPress={() => {
            addlabel();
          }}
        >
          <Icon name="add-to-list">Add Label</Icon>
        </TouchableHighlight> */}
      </View>

      <View style={{marginTop:10}}>
        <FlatList
          data={arraylabledata}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, index}) => {
            return (
              <View>
                <ProductList
                  productarray={item}
                  labledataindex={labledataindex}
                  productdataindex={index}
                  onChangeProductNamefn={props.onChangeProductName}
                  onChangeElementfn={props.onChangeElement}
                />
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemText: {
    backgroundColor: '#add8e6',
    padding: 10,
    marginTop: 10,
    alignSelf:'center',

  },
  buttonView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
  },
  safeareaview: {
    flex:1,
    marginBottom: 40,
  },
});
