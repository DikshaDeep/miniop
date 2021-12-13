import React from "react";
import { View, TextInput,SafeAreaView,StyleSheet,TouchableOpacity ,Text} from "react-native";
import { LabelList } from "../../components/Home/LabelList";
import GlobalStyles from '../../../Utility/GlobalStyles';
import { ScrollView } from "react-native-gesture-handler";
export default class TakeInputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      batchdata: [
        {
          lablename: "stock",
          data: [
            {
              productname: "Mango",
              data: [
                { key: "1", val: "101" },
                { key: "2", val: "201" },
                { key: "3", val: "301" },
                { key: "4", val: "401" },
              ],
            },
            {
              productname: "Apple",
              data: [
                { key: "1", val: "101" },
                { key: "2", val: "201" },
                { key: "3", val: "301" },
                { key: "4", val: "401" },
              ],
            },
          ],
        },
        {
          lablename: "Raghav",
          data: [
            {
              productname: "Pinapple",
              data: [
                { key: "1", val: "101" },
                { key: "2", val: "201" },
                { key: "3", val: "301" },
                { key: "4", val: "401" },
              ],
            },
            {
              productname: "Guava",
              data: [
                { key: "1", val: "101" },
                { key: "2", val: "201" },
                { key: "3", val: "301" },
                { key: "4", val: "401" },
              ],
            },
          ],
        },
      ],
    };
  }
  onChangeLableName = (value, index) =>{
    console.log("----label name  "+value+'----'+index);
    const batchdata = [...this.state.batchdata];
    batchdata[index] = {
      ...this.state.batchdata[index],
      lablename: value,
    };
    this.setState({ batchdata });
  }

  onChangeProductName(value, lableindex, productindex) {
    console.log("productname is called ", value, lableindex, productindex);
    const batchdata = [...this.state.batchdata];
    // newbatchdata[lableindex].data = [...this.state.batchdata[lableindex].data];
    // newbatchdata[lableindex].data[productindex] = {
    //   ...this.state.batchdata[lableindex].data[productindex],
    //   productname: value,
    // };
    // batchdata[lableindex] = {
    //   ...this.state.batchdata[lableindex],
    // };
    // batchdata[lableindex].data = [...this.state.batchdata[lableindex].data];
    // batchdata[lableindex].data[productindex] = {
    //   ...this.state.batchdata[lableindex].data[productindex],
    //   productname: value,
    // };

    //this.setState({ productname: batchdata[lableindex].data[productindex] });
    console.log(this.state.batchdata);
  }

  onChangeElement(value, lableindex, productindex, elementindex) {}

  onbtnPress = () => {
    console.log('---- add json value----');
    console.log(JSON.stringify(this.state.batchdata));
  };


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
        {this.state.batchdata.map((lableinfo, lableindex) => {
          return (
            <View style={{flex:1}} key={lableindex}>
              {/* <TextInput value={this.state.batchdata[0].lablename} onChangeText={(text)=>this.onChangeLableName(text,lableindex)}/> */}
              <LabelList
                lableinfo={lableinfo}
                lableindex={lableindex}
                onChangeLableName={ () => {
                  this.onChangeLableName()
                }}
                onChangeProductName={() => { this.onChangeProductName()}}
                onChangeElement={() => { this.onChangeElement()}}
              />
            </View>
          );
        })}
        <TouchableOpacity onPress={() => {this.onbtnPress()}} style={[GlobalStyles.defaultBtn,{marginTop:30,alignSelf:'center'}]}>
      
      <Text style={styles.textbox}>Save</Text>
  
    </TouchableOpacity>
    </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colorCodes.white,
  },
  textbox: {
    alignSelf:'center',
    fontSize:16,
    fontWeight:'bold',
    color:GlobalStyles.colorCodes.white,
  },
});