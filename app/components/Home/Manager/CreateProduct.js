import React from "react";
import {
  View,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  Text,
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { initialWindowSafeAreaInsets } from "react-native-safe-area-context";
import GlobalStyles from "../../../Utility/GlobalStyles";
import CustomLoader from "../../../ReusableComponents/CustomLoader";
import CustomDropdownPicker from "../../../ReusableComponents/CustomDropdownPicker";
import ImagePath from "../../../Utility/ImagePath";
import { SCREENS } from "../../../Utility/Constants";

export default class ManagerCreateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lablearray: [{ lablename: "" }],
      countInput: [
        {
          product: "Enter Product Name",
          value: 1,
        },
      ],
      allLables: [
        {
          label: "Stock",
          value: "1",
          selected: true,
          disabled: false,
        },
        { label: "Stock Material", value: "2" },
        { label: "Material", value: "3" },
        { label: "Stock2", value: "4" },
      ],
    //   allProducts: [
    //     {
    //       label: "Mango  12*8",
    //       value: "1",
    //       selected: true,
    //       disabled: false,
    //     },
    //     { label: "Orange  10*6", value: "2" },
    //     { label: "Pinapple  5*7", value: "3" },
    //     { label: "Guava  6*9", value: "4" },
    //   ],
    };
  }

  onPressGotoAction = () => {
    this.props.navigation.navigate(SCREENS.LISTPRODUCT);
  };

  header = () => {
    return (
      <View style={[styles.header, styles.shadow]}>
        <TouchableOpacity
          style={styles.backView}
          onPress={() => this.props.navigation.goBack()}
        >
          <Image
            resizeMode={"contain"}
            style={styles.back}
            source={ImagePath.BACK_ARROW}
          />
        </TouchableOpacity>
        <View style={styles.headerTextView}>
          <Text style={styles.centerHeaderText}>{"Create Product"}</Text>
        </View>
        <TouchableOpacity
          style={styles.addbtnView}
          onPress={() => this.onPressGotoAction()}
        >
          {/* <Text style={styles.addText}>{"List Product"}</Text> */}
          <Image
            resizeMode={"contain"}
            style={styles.back}
            source={ImagePath.HAMBURGER_LIST}
          />
        </TouchableOpacity>
      </View>
    );
  };
  addItems() {
    const { countInput } = this.state;
    let storedata = {
      product: "Enter Product Name",
      value: 1,
    };
    if (countInput.length >= 1) {
      countInput.push(storedata);
    }
    this.setState({ countInput });
  }
  removeItems() {
    const { countInput } = this.state;
    let storedata = {
      product: "Enter Product Name",
      value: 1,
    };
    if (countInput.length > 1) {
      countInput.pop(storedata);
    }
    this.setState({ countInput });
  }
  renderLableListView = ({ item, index }) => {
    return (
      <View>
        {this.state.countInput.map((item, index) => {
          return (
            <View style={styles.labelInputStyle}>
              <TextInput
                style={styles.inputTextStyle}
                value={item.lablename}
                placeholder={"Enter Product Name"}
                onChangeText={(text) => this.onChangeLablename(text, index)}
              />
            </View>
          );
        })}
      </View>
    );
  };
  onChangeLablename(text, index) {
    const countInput = [...this.state.countInput];
    countInput[index] = {
      ...this.state.countInput[index],
      product: text,
    };
    this.setState({ countInput });
  }

  onSubmitAction = () => {
    // this.props.navigation.navigate('CreateProduct', {
    //     lablearray: this.state.lablearray,
    //   });
  };
  changeProduct = (item) => {
    // alert(item.label)
  };
  changeLabel = (item) => {
    // alert(item.label)
  };

  render() {
    console.log("d", this.state.countInput);
    return (
      <View style={styles.container}>
        {this.header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}

          <Text style={styles.subtitle}>{"Create Product"}</Text>
          <View style={styles.selectissueView}>
            <Text style={styles.selectheaderText}>{"Select Label Name"}</Text>
            <CustomDropdownPicker
              items={this.state.allLables}
              defaultNull
              containerStyle={styles.datepickerStyle}
              onChangeItem={(item) => this.changeLabel(item)}
              labelStyle={{
                color: GlobalStyles.colorCodes.black,
              }}
            />
          </View>
          
          <View style={styles.flatlistView}>
        <FlatList
          data={this.state.lablearray}
          renderItem={this.renderLableListView}
          keyExtractor={item => item.id}
        />
        <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:10}}>
        
            <TouchableOpacity style={styles.addViewbtn} onPress={() => this.removeItems()}>
        <Text style={styles.newText}>
              {'Remove'}
            </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addViewbtn} onPress={() => this.addItems()}>
        <Text style={styles.newText}>
              {'+Add'}
            </Text>
            </TouchableOpacity>
            </View>
      </View>
          <View style={styles.submitBtn}>
            <TouchableOpacity
              onPress={this.onSubmitAction}
              style={GlobalStyles.defaultBtn}
            >
              <Text style={GlobalStyles.buttonTitle}>{"Submit"}</Text>
            </TouchableOpacity>
          </View>
          {/* </KeyboardAvoidingView> */}
        </ScrollView>

        {/* {LoginStore.showLoader && <CustomLoader />} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colorCodes.white,
  },
  inputTextStyle: {
    backgroundColor: GlobalStyles.colorCodes.white,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: GlobalStyles.colorCodes.lightGrey,
  },
  headerTextView: {
    flex: 0.5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: GlobalStyles.colorCodes.white,
  },
  back: {
    width: 25,
    height: 15,
  },
  backView: {
    flex: 0.2,
    height: 44,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: GlobalStyles.colorCodes.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.1,
    elevation: 3,
    zIndex: 1000,
  },
  addbtnView: {
    flex: 0.3,
    alignItems: "flex-end",
    paddingVertical: 10,
    paddingRight: 16,
  },
  addText: {
    fontSize: 14,
    color: GlobalStyles.colorCodes.orange,
  },
  flatlistView: {
    //  flex:1,
    marginTop: 20,
  },
  labelInputStyle: {
    marginTop: 20,
    textAlign: "center",
    justifyContent: "center",
    marginHorizontal: 50,
  },

  backImg: {
    height: 20,
    width: 15,
  },
  subtitle: {
    marginTop: 40,
    fontSize: 26,
    color: GlobalStyles.colorCodes.blueGrey,
    textAlign: "center",
  },
  submitBtn: {
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  newText: {
    fontSize: 14,
    color: GlobalStyles.colorCodes.white,
    alignSelf: "center",
  },
  addViewbtn: {
    marginTop: 10,
    marginHorizontal: 40,
    height: 40,
    backgroundColor: GlobalStyles.colorCodes.orange,

    width: "20%",
    alignSelf: "flex-end",
    justifyContent: "center",
    borderRadius: 20,
  },
  selectissueView: {
    marginTop: 60,
    marginHorizontal: 50,
  },
  selectheaderText: {
    fontSize: 12,
    fontWeight: "bold",
    color: GlobalStyles.colorCodes.warmGrey,
  },
  datepickerStyle: {
    height: 50,
    marginTop: 10,
  },
});
