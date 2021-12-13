import React from "react";
import {
  View,
  TextInput,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import GlobalStyles from "../../../Utility/GlobalStyles";
import ImagePath from "../../../Utility/ImagePath";
import { SCREENS } from "../../../Utility/Constants";

@inject("LoginStore", "OrderJobStore")
@observer
export default class UpdatePriorityQuantity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      priority: '',
      Qty: ''
    };
  }

  componentDidMount() {
    console.log('props---', this.props.route.params)
    this.setState({
      priority: this.props.route.params.data.priority,
      Qty: this.props.route.params.data.quantityReady,
    })
  }
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
          <Text style={styles.centerHeaderText}>{"Update Quantity Ready"}</Text>
        </View>
        <View
          style={styles.addbtnView}
          //   onPress={() => this.onPressGotoAction()}
        >
          {/* <Image
            resizeMode={"contain"}
            style={styles.back}
            source={ImagePath.HAMBURGER_LIST}
          /> */}
        </View>
      </View>
    );
  };

  onChangeQuantity(text) {
    this.setState({ Qty: text });
  }
  
  onChangePriority(text) {
    this.setState({ priority: text });
  }

  onSubmitAction = async () => {
    const {orderId, _id, product, size} = this.props.route.params.data;
    const response = await this.props.OrderJobStore.update({
      order:{
        "_id": orderId
      },
      "updateJob":{
                          "_id": _id,
                          "product" : product,
                          "qty" : this.state.Qty,
                          "size" : size
                      }
    })
    console.log('response OrderJobStore', response)
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        {this.header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          // keyboardShouldPersistTaps="handled"
        >
          {/* <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}

          <Text style={styles.subtitle}>{"Edit Qty Ready"}</Text>
          <View style={styles.labelInputStyle}>
            <TextInput
                // keyboardType="numeric"
              style={styles.inputTextStyle}
              value={this.state.priority.toString()}
              editable={false}
              placeholder={"Enter Priority"}
              onChangeText={(text) => this.onChangePriority(text)}
            />
            
          </View>

          <View style={styles.labelInputStyle}>
            <TextInput
              style={styles.inputTextStyle}
              value={this.state.Qty.toString()}
              placeholder={"Enter Quantity Ready"}
              onChangeText={(text) => this.onChangeQuantity(text)}
            />
          </View>
          <View style={styles.submitBtn}>
            <TouchableOpacity
              onPress={this.onSubmitAction}
              style={GlobalStyles.defaultBtn}
            >
              <Text style={GlobalStyles.buttonTitle}>{"Save"}</Text>
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
