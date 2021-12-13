import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {ElementList} from '../../components/Home/ElementList';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {TouchableHighlight, TouchableOpacity} from 'react-native-gesture-handler';

export const ProductList = props => {
  let arrayproductdata = props.productarray.data;
  const [productname, setProductName] = useState(
    props.productarray.productname,
  );

  function takeElementObject(
    newElement,
    labledataindex,
    productdataindex,
    elementindex,
  ) {
    console.log('data coming from elementlist is ', newElement, elementindex);
    // var newProduct = { productname: productname, data: [newElement] };
    props.onChangeElementfn(
      newElement,
      labledataindex,
      productdataindex,
      elementindex,
    );
  }

  function addproduct() {}
  function addNewElement() {}
  function deleteButton() {}

  return (
    <View>
      <View style={styles.buttonView}>
        <TextInput
          style={styles.item}
          value={productname}
          autoFocus={false}
          maxLength={10}
          keyboardType={'ascii-capable'}
          placeholder="Enter product Name"
          onChangeText={text => {
            return props.onChangeProductNamefn(
              text,
              props.labledataindex,
              props.productdataindex,
            );
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addproduct();
          }}>
          <Icon name="add-to-list">Add Product</Icon>
        </TouchableOpacity>
      </View>
      <View>
        {arrayproductdata.map((elementobjects, elementarrayindex) => {
          return (
            <View key={elementobjects.key}>
              <ElementList
                elementobjects={elementobjects}
                elementarrayindex={elementarrayindex}
                lablearrayindex={props.labledataindex}
                productarrayindex={props.productdataindex}
                elementfn={takeElementObject}
              />
            </View>
          );
        })}
        <View style={styles.lowerbuttonView}>
          <TouchableOpacity
            // style={styles.icon}
            onPress={() => {
              addNewElement();
            }}>
            <Icon name="add-to-list">Add Element</Icon>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteButton();
            }}>
            <Icon1 name="delete">Delete Element</Icon1>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#90ee90',
    padding: 10,
    marginVertical: 8,
  },
  buttonView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    marginTop: 5,
  },
  button: {
    marginTop: 20,
  },
  lowerbuttonView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    marginTop: 5,
  },
});
