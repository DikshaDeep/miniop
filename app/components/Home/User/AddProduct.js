import React from "react";
import {
  View,
  TextInput,
  ScrollView,
  Alert,
  Image,
  Text,
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { inject, observer } from "mobx-react";
import { toJS } from 'mobx'

import GlobalStyles from "../../../Utility/GlobalStyles";
import CustomLoader from "../../../ReusableComponents/CustomLoader";
import CustomDropdownPicker from "../../../ReusableComponents/CustomDropdownPicker";
import ImagePath from "../../../Utility/ImagePath";
import { SCREENS } from "../../../Utility/Constants";

@inject("LoginStore", "ProductStore", "BatchMachineProductStore")
@observer
export default class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelname: "",
      size: "",
      productDetail: null,
      productname: "",
      labelarray: [{ labelname: "" }],
      allLables: [
        {
          label: "Choose Label",
          value: "1",
          selected: true,
          disabled: false,
        },
        { label: "Stock Material", value: "2" },
        { label: "Material", value: "3" },
        { label: "Stock2", value: "4" },
      ],
      allProducts: null
    };
  }

  async componentDidMount() {
    await this.props.ProductStore.list();
    if (this.props.route.params.type == "edit") {
      const id = this.props.route.params.id;
      await this.props.ProductStore.details({productId: id});
    }
    if (this.props.route.params.type === "ManagerProductListEdit") {
      const {batchid, machineOutputId, productId} = this.props.route.params;
      const response = await this.props.BatchMachineProductStore.details({
        "batch":{
          "_id": batchid,
          "machineoutput": {
              "_id": machineOutputId,
              "products": {
                  "_id": productId
              }
          }
        }
      });
      this.setState({ productname: response.machineoutput.products.productname, size: response.machineoutput.products.productsize });
    }
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   let details;
  //   if (nextProps.ProductStore.productDetail !== prevState.productDetail) {
  //     details = toJS(nextProps.ProductStore.productDetail);
  //     // return {productDetail: details, size: details.size}
  //   }
  //   return null
  // }

  onPressGotoAction = () => {
    this.props.navigation.navigate(SCREENS.LISTPRODUCT);
  };
  // onPressGotoManagerProductList = () => {
  //   this.props.navigation.navigate(SCREENS.MANAGERPRODUCTLIST);
  // };
  // onPressGotoUserProductList = () => {
  //   this.props.navigation.navigate(SCREENS.USERPRODUCTLIST);
  // };

  header = () => {
    if (this.props.route.params) {
      if (
        this.props.route.params.type == "edit" ||
        this.props.route.params.type == "UserProductListEditWithoutBatchid" ||
        this.props.route.params.type == "ManagerProductListEdit"
      ) {
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
              <Text style={styles.centerHeaderText}>{"Edit Product"}</Text>
            </View>
            <View
              style={styles.addbtnView}
              // onPress={() => this.onPressGotoAction()}
            />
          </View>
        );
      }
    }
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
          <Image
            resizeMode={"contain"}
            style={styles.back}
            source={ImagePath.HAMBURGER_LIST}
          />
        </TouchableOpacity>
      </View>
    );
  };

  onSubmitAction = async () => {

    const data = {
      "size" : this.state.size,
      "name" : this.state.productname,
    }
    if (this.props.route.params.type == "edit") {
      data.name = toJS(this.props.ProductStore.productDetail.name);
      data.productId = this.props.route.params.id;
      await this.props.ProductStore.update(data)
      this.props.navigation.goBack();
    } else if (this.props.route.params.type === "ManagerProductListEdit") {
      const {batchid, machineOutputId, productId} = this.props.route.params;
      const updateData = {
        "batch":{
          "_id": batchid,
          "machineoutput": {
            "_id": machineOutputId
          }
        },
        "updateProducts": {
          "_id": productId,
          "productname" : data.name,
          "productsize" : data.size
        }
      }
      const response = await this.props.BatchMachineProductStore.update(updateData);
      if (response) {
        this.props.navigation.navigate(SCREENS.MANAGERELEMENTSLIST, {
          type: "Managerproductlist",
          batchid: batchid,
          machineOutputId,
          productId,
          labelname: this.props.route.params.labelname,
          productname: data.name,
          size: data.size,
        });
      }
    } else if (this.props.route.params.type === "ManagerListProduct") {
      const {batchid, machineOutputId} = this.props.route.params;
      const updateData = {
        "batch":{
          "_id": batchid,
          "machineoutput": {
            "_id": machineOutputId
          }
        },
        "products": [{
          "productname" : data.name,
          "productsize" : `${data.size} Kg`
        }]
      }
      const response = await this.props.BatchMachineProductStore.create(updateData);
      const products = response.batch.machineoutput.find(item => item._id === machineOutputId).products;
      const productId = products[products.length - 1]._id;
      if (response) {
        this.props.navigation.navigate(SCREENS.MANAGERELEMENTSLIST, {
          type: "Managerproductlist",
          batchid: batchid,
          machineOutputId,
          productId,
          labelname: this.props.route.params.labelname,
          productname: data.name,
          size: data.size,
        });
      } else {
        Alert.alert('Error', 'Something went wrong!')
      }
    } else {
      await this.props.ProductStore.create(data);
      this.props.navigation.goBack();
    }
    // if (this.state.labelname && this.state.productname) {
    //   this.props.navigation.navigate(SCREENS.LISTELEMENT, {
    //     productname: this.state.productname,
    //     labelname: this.state.labelname,
    //   });
    // }
  };
  changeProduct = (item) => {
    this.setState({ productname: item.name });
  };
  changeLabel = (item) => {
    this.setState({ labelname: item });
  };

  onChangeSizeText = (size) => {
    console.log('inside chage size', size)
    this.setState({size: size});
  }

  render() {
    if (this.props.route.params) {
      if (
        this.props.route.params.type == "edit" ||
        this.props.route.params.type == "UserProductListEditWithoutBatchid"
      ) {
        console.log('this.props.ProductStore.productDetail',this.props.ProductStore.productDetail)
        const defaultId = toJS(this.props.ProductStore.productDetail) && toJS(this.props.ProductStore.productDetail._id)
        const defaultSize = toJS(this.props.ProductStore.productDetail) && toJS(this.props.ProductStore.productDetail.size)
        const defaultProduct = toJS(this.props.ProductStore.productDetail) && toJS(this.props.ProductStore.productDetail.name)
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

              <Text style={styles.subtitle}>{"Edit Product"}</Text>
              <View style={styles.selectissueView}>
                {/* <Text style={styles.selectheaderText}>{"Select Product"}</Text> */}
                {/* <CustomDropdownPicker
                  items={toJS(this.props.ProductStore.productList).length > 0 ? toJS(this.props.ProductStore.productList) : []}
                  defaultValue={defaultId}
                  containerStyle={styles.datepickerStyle}
                  onChangeItem={(item) => this.changeProduct(item)}
                  labelStyle={{
                    color: GlobalStyles.colorCodes.black,
                  }}
                /> */}
                <View style={[{marginTop:26,marginLeft:50, marginHorizontal: 50}]}>
                <TextInput
                  style={styles.inputTextStyle}
                  defaultValue={defaultProduct}
                  keyboardType= {'default'}
                  placeholder={'Name'}
                  onChangeText={text => this.changeProduct(text)}
                />
              </View>
              </View>
              <View style={[{marginTop:26,marginLeft:50, marginHorizontal: 50}]}>
                <TextInput
                  style={styles.inputTextStyle}
                  defaultValue={defaultSize}
                  keyboardType= {'numeric'}
                  placeholder={'   Size   '}
                  onChangeText={text => this.onChangeSizeText(text)}
                />
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
    if (this.props.route.params) {
      if (this.props.route.params.type == "ManagerListProduct") {
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
                <Text style={styles.selectheaderText}>{"Select Product"}</Text>
                <CustomDropdownPicker
                  items={toJS(this.props.ProductStore.productList)}
                  placeholder={'Select a product'}
                  defaultNull
                  containerStyle={styles.datepickerStyle}
                  onChangeItem={(item) => this.changeProduct(item)}
                  labelStyle={{
                    color: GlobalStyles.colorCodes.black,
                  }}
                />
              </View>
               {/* <View style={[{marginTop:26,marginLeft:50, marginHorizontal: 50}]}>
                <TextInput
                  style={styles.inputTextStyle}
                  keyboardType= {'default'}
                  placeholder={'Name'}
                  onChangeText={text => this.changeProduct(text)}
                />
              </View> */}
              <View style={[{marginTop:26,marginLeft:50, marginHorizontal: 50}]}>
                <TextInput
                  style={styles.inputTextStyle}
                  defaultValue={this.state.size}
                  keyboardType= {'numeric'}
                  placeholder={'   Size in Kg '}
                  onChangeText={text => this.onChangeSizeText(text)}
                />
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
    if (this.props.route.params) {
      if (this.props.route.params.type == "ManagerProductListEdit" && toJS(this.props.BatchMachineProductStore.batchOrderProductDetails)) {
        // const defaultId = this.state.productDetail && this.state.productDetail.orderdata.products._id
        const defaultId = toJS(this.props.ProductStore.productList).find(item => item._id === this.props.route.params.productId);
        const defaultSize = toJS(this.props.BatchMachineProductStore.batchOrderProductDetails)?.machineoutput?.products?.productsize || null
        console.log('defaultId', defaultId)
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

              <Text style={styles.subtitle}>{"Edit Product"}</Text>
              {/* <View style={styles.selectissueView}>
                <Text style={styles.selectheaderText}>
                  {"Select Label Name"}
                </Text>
                <CustomDropdownPicker
                  items={this.state.allLables}
                  defaultNull
                  containerStyle={styles.datepickerStyle}
                  onChangeItem={(item) => this.changeLabel(item)}
                  labelStyle={{
                    color: GlobalStyles.colorCodes.black,
                  }}
                />
              </View> */}
              <View style={styles.selectissueView}>
                <Text style={styles.selectheaderText}>{"Select Product"}</Text>
                <CustomDropdownPicker
                  items={toJS(this.props.ProductStore.productList).length > 0 ? toJS(this.props.ProductStore.productList) : []}
                  placeholder={'Select a product'}
                  defaultValue={defaultId}
                  containerStyle={styles.datepickerStyle}
                  onChangeItem={(item) => this.changeProduct(item)}
                  labelStyle={{
                    color: GlobalStyles.colorCodes.black,
                  }}
                />
              </View>
              <View style={[{marginTop:26,marginLeft:50, marginHorizontal: 50}]}>
                <TextInput
                  style={styles.inputTextStyle}
                  defaultValue={defaultSize}
                  keyboardType= {'numeric'}
                  placeholder={'   Size in Kg  '}
                  onChangeText={text => this.onChangeSizeText(text)}
                />
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
         
          <View style={styles.selectissueView}>
            <Text style={styles.selectheaderText}>{"Select Product"}</Text>
            <CustomDropdownPicker
              items={toJS(this.props.ProductStore.productList)}
              defaultNull
              containerStyle={styles.datepickerStyle}
              onChangeItem={(item) => this.changeProduct(item)}
              labelStyle={{
                color: GlobalStyles.colorCodes.black,
              }}
            />
          </View>
          <View style={[{marginTop:26,marginLeft:50, marginHorizontal: 50}]}>
                <TextInput
                  style={styles.inputTextStyle}
                  defaultValue={this.state.size}
                  keyboardType= {'numeric'}
                  placeholder={'   Size   '}
                  onChangeText={text => this.onChangeSizeText(text)}
                />
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
    borderWidth:1,
    borderRadius:5,
    height:50,
    // alignSelf:'center',
    color:GlobalStyles.colorCodes.black,
    borderColor:GlobalStyles.colorCodes.darkLightGrey,
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
