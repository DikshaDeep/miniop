import React from 'react';
import {View, TextInput,ScrollView,Modal, Alert, FlatList,Image,Text, StyleSheet,TouchableOpacity} from 'react-native';
import { inject, observer } from 'mobx-react';
import GlobalStyles from '../../../Utility/GlobalStyles';
import ImagePath from '../../../Utility/ImagePath';
import {SCREENS} from '../../../Utility/Constants';
import DatePicker from 'react-native-datepicker';

@inject("OrderStore", "ProductStore")
@observer
export default class CreateOrder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectProduct: 'Select Product',
      currentIndex:'0',
      modalVisible: false,
      customerName:'',
      lablearray: [{ lablename: ''}],
      countInput: [{product: 'Select Product',qty:0,size:0,value:1}],
      allProduct: [
        // {
        //   label: 'Mango',
        //   value: '1',
        // },
        // {label: 'Orange', value: '2'},
        // {label: 'Apple', value: '3'},
        // {label: 'Banana', value: '4'},
      ],
    };
  }

  async componentDidMount() {
    const response = await this.props.ProductStore.list();
    this.setState({ allProduct: response?.productList });
  }

  onPressGotoAction = () => {
    this.props.navigation.navigate(SCREENS.LISTORDER);
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
          <Text style={styles.centerHeaderText}>{"Create Order"}</Text>
        </View>
        <TouchableOpacity
          style={styles.addbtnView}
          onPress={() => this.onPressGotoAction()}
        >
          {/* <Text style={styles.addText}>
              {'List Order'}
            </Text> */}
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
      const {countInput} = this.state;
    let storedata = {
        product: 'Select Product',
        qty: 0,
        size:0,
        value: 1,
    };
    if(countInput.length >=1){
    countInput.push(storedata);
    }
    this.setState({countInput});
  }
  removeItems() {
    const {countInput} = this.state;
    let storedata = {
        product: 'Select Product',
        qty: 0,
        size:0,
        qty: 1,
      };
      if(countInput.length > 1){
      countInput.pop(storedata);
      }
      this.setState({countInput});

  }

  renderModelView = (index) => {
    this.setState({currentIndex:index});
    this.setModalVisible(true)

  }
  renderLableListView = ({item, index}) => {
    return (
      <View>
        {this.state.countInput.map((item,index) => {
          return (
            <View style={styles.labelInputStyle}>
                 <View style={styles.selectProductView}>
          <Text style={styles.selectheaderText}>
            {'Select Product'}
          </Text>
          <TouchableOpacity
            style={styles.textbox}
            value={item.product}
            placeholder={'Select Product'}
            onPress={() => this.renderModelView(index)}
            >
              <Text style={styles.selectproductText}>
            {item.product}
          </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:0.2,marginTop:26,marginLeft:10}}>
            <TextInput
              style={styles.inputTextStyle}
              value={item.size}
              keyboardType= {'numeric'}
              placeholder={'   Size   '}
              onChangeText={text => this.onChangeSizeText(text, index)}
            />
            </View>
        <View style={{flex:0.4,marginTop:26}}>
            <TextInput
              style={styles.inputTextStyle}
              value={item.qty}
              keyboardType= {'numeric'}
              placeholder={'Quantity in kg'}
              onChangeText={text => this.onChangeLablename(text, index)}
            />
            </View>
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
     qty: text,
   };
   this.setState({countInput});
  }

  onChangeSizeText(text, index) {
    const countInput = [...this.state.countInput];
    countInput[index] = {
   ...this.state.countInput[index],
  size: text,
 };
 this.setState({countInput});
}

  onChangeCustomerName(text) {
 this.setState({customerName:text});
}

  onSubmitAction = async () => {
    const {customerName, date, countInput } = this.state;
    
    const data = {
      date,
      priority: 1,
      customername: customerName,
      jobs: countInput
    }
    const {OrderStore} = this.props;
    const response = await OrderStore.create(data);
    if (response) {
      this.props.navigation.goBack();
    } else {
      Alert.alert('Something went wrong');
    }
   
   }
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  onPressModelSelectValue = (item,index) => {
       const {currentIndex} =this.state;
       const countInput = [...this.state.countInput];
       countInput[currentIndex] = {
      ...this.state.countInput[currentIndex],
      product: item.label,
      value: item.value,
    };
    this.setState({countInput});
    this.setModalVisible(false),
    this.setState({selectProduct: item.label})
  };

  renderLableListInModelAlert = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.openButton,
          backgroundColor: GlobalStyles.colorCodes.orange,
        }}
        onPress={() => this.onPressModelSelectValue(item,index)}>
        <Text style={styles.textStyle}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    // console.log('d', this.props);
    return (
        <View style={styles.container}>
            {this.header()}
        <ScrollView
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            keyboardShouldPersistTaps="handled">
             <Text style={styles.subtitle}>
              {'Create Orders'}
            </Text>
            
            <View style={styles.datepickerStyle}>
          <DatePicker
            style={{width:'90%',color: 'red'}}
            date={this.state.date}
            mode="date"
            placeholder="Select date"
            minDate="10-07-2020"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={date => {
              this.setState({date: date});
            }}
          />
          </View>
          <View style={styles.customerNameStyle}>
            <TextInput
              style={styles.customerInputTextStyle}
              value={this.state.customerName}
              placeholder={'Enter Customer Name'}
              onChangeText={text => this.onChangeCustomerName(text)}
            />
             </View>
           
      <View style={styles.flatlistView}>
        <FlatList
          data={this.state.lablearray}
          renderItem={this.renderLableListView}
          keyExtractor={item => item.id}
        />
        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
        
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
                style={GlobalStyles.defaultBtn}>
                <Text style={GlobalStyles.buttonTitle}>
                  {'Submit'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.centeredView}>
             
              <View style={styles.modalView}>
              <Text style={styles.modelheaderText}>Select Product</Text>
                <FlatList
                  data={this.state.allProduct}
                  renderItem={this.renderLableListInModelAlert}
                />
              </View>
            </View>
          </Modal>
        </View>
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
    alignSelf:'center',
    color:GlobalStyles.colorCodes.black,
    borderColor:GlobalStyles.colorCodes.darkLightGrey,
  },
  customerInputTextStyle: {
    backgroundColor: GlobalStyles.colorCodes.white,
    paddingLeft: 10,
    borderWidth:1,
    borderColor:GlobalStyles.colorCodes.darkLightGrey,
  },
  headerTextView: {
    flex: 0.5,
    },
    centerHeaderText: {
        fontSize: 16,
        color: GlobalStyles.colorCodes.charcoalGrey,
      },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: GlobalStyles.colorCodes.white,
  },
  back: {
    width: 25,
    height: 15,
  },
  backView: {
    flex:0.2,
    height: 44,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  openButton: {
    backgroundColor: GlobalStyles.colorCodes.orange,
    borderRadius: 5,
    padding: 10,
    marginHorizontal:30,
    marginVertical:10,
  },
  flatlistView:
  {
  flex:1,
  marginTop:20,
  },
  labelInputStyle:
  {
      //flex:1,
    flexDirection:'row',
    marginTop:20,
    textAlign:'center',
    justifyContent:"space-between",
    marginHorizontal:20,
  },
  
  backImg: {
    height: 20,
    width: 15,
  },
  subtitle: {
    marginTop: 40,
    fontSize: 26,
    color: GlobalStyles.colorCodes.blueGrey,
    textAlign: 'center',
  },
  labeltitle:
  {
    fontSize: 18,
    color: GlobalStyles.colorCodes.white,
    textAlign: 'center',
  },
  submitBtn: {
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:30,
  },
  newText:
  {
    fontSize: 14,
    color: GlobalStyles.colorCodes.white,
    alignSelf: 'center', 
  },
  addViewbtn:
  {
    marginTop: 10,
    marginHorizontal:40,
    height: 40,
    backgroundColor: GlobalStyles.colorCodes.orange,
    
    width: '20%',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    borderRadius: 20,
  },
  labelView:
  {
    marginTop: 30,
    marginHorizontal:40,
    height: 40,
    backgroundColor: GlobalStyles.colorCodes.orange,
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  selectProductView: {
      flex:0.4,
  },
  selectheaderText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: GlobalStyles.colorCodes.warmGrey,
  },
  selectproductText:
  {
    fontSize: 14,
    color: GlobalStyles.colorCodes.warmGrey,
    alignSelf:'center',
  },
  datepickerStyle:
  {
    marginTop:50,
    textAlign:'center',
    justifyContent:'center',
    marginHorizontal:50
  },
  customerNameStyle:
  {
    marginTop:20,
    textAlign:'center',
    justifyContent:'center',
    marginHorizontal:84
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
     margin: 20,
     backgroundColor: GlobalStyles.colorCodes.white,
     borderRadius: 20,
     marginVertical: 10,
     width:300,
     shadowColor: GlobalStyles.colorCodes.black,
     shadowOffset: {
       width: 0,
       height: 2,
     },
     shadowOpacity: 0.25,
     shadowRadius: 3.84,
     elevation: 5,
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
   modelheaderText:
  {
    padding:10,
    fontSize:18,
    color:GlobalStyles.colorCodes.black,
    alignSelf:'center',
  },
  textStyle: {
    color: GlobalStyles.colorCodes.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize:18,
  },
  textbox: {
    backgroundColor: GlobalStyles.colorCodes.white,
    height: 50,
    fontSize:16,
    marginTop:10,
    borderWidth:1,
    borderRadius:4,
    justifyContent:'center',
    borderColor:GlobalStyles.colorCodes.darkLightGrey,
  },
  addbtnView: {
    flex: 0.3,
    alignItems: 'flex-end',
    paddingVertical: 10,
    paddingRight: 16,
  },
  addText: {
    fontSize: 14,
    color: GlobalStyles.colorCodes.orange,
  },
});
