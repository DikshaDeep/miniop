import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const ElementList = props => {
  const [elementkey, setElementKey] = useState(props.elementobjects.key);
  const [elementvalue, setElementValue] = useState(props.elementobjects.val);
  var newelement = {key: elementkey, val: elementvalue};
  const [callstylestate, setCallStyleState] = useState(true);
  // const { updateElement } = useContext(Context);

  function LoadDifferentStyle(i, ele) {
    setCallStyleState(!callstylestate);
    props.elementobjects.isMarked = callstylestate;
  }

  // useEffect(() => {
  //   updateElement(
  //     newelement,
  //     props.elementarrayindex,
  //     props.productarrayindex,
  //     props.lablearrayindex
  //   );
  // }, []);

  return (
    <TouchableOpacity
      style={callstylestate == true ? styles.textbox : styles.textbox2}
      onLongPress={() => {
        LoadDifferentStyle(props.elementarrayindex, props.element);
      }}>
      <TextInput
        style={styles.item}
        value={elementkey}
        autoFocus={false}
        maxLength={10}
        keyboardType={'numeric'}
        placeholder="Enter Key"
        onChangeText={text => {
          return (
            setElementKey(text),
            props.elementfn(
              newelement,
              props.elementarrayindex,
              props.productarrayindex,
              props.lablearrayindex,
            )
            // updateElement(
            //   newelement,
            //   props.elementarrayindex,
            //   props.productarrayindex,
            //   props.lablearrayindex
            // )
          );
        }}
      />
      <TextInput
        style={styles.item}
        value={elementvalue}
        autoFocus={false}
        maxLength={10}
        keyboardType={'numeric'}
        placeholder="Enter Value"
        onChangeText={text => {
          return (
            setElementValue(text),
            props.elementfn(
              newelement,
              props.elementarrayindex,
              props.productarrayindex,
              props.lablearrayindex,
            )
          );
          // updateElement(
          //   newelement,
          //   props.elementarrayindex,
          //   props.productarrayindex,
          //   props.lablearrayindex
          // )
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textbox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  textbox2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    backgroundColor: 'green',
  },
  item: {
    backgroundColor: '#FFA07A',
    padding: 10,
    marginVertical: 8,
  },
});
