import React from 'react';
import {
  FlatList,
  Alert,
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {initialWindowSafeAreaInsets} from 'react-native-safe-area-context';
import GlobalStyles from '../../../Utility/GlobalStyles';
import CustomLoader from '../../../ReusableComponents/CustomLoader';
import ImagePath from '../../../Utility/ImagePath';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      batchid: '',
      date: '',
      modalVisible: false,
      batchidData: [
        {id: '1', batchid: 'BFG343'},
        {id: '2', batchid: 'SDFS34'},
        {id: '3', batchid: 'SDF32'},
        {id: '4', batchid: 'FSDF343'},
        {id: '5', batchid: '334SDFDS'},
        {id: '6', batchid: 'SF343DF'},
        
      ],
  
    };
   // this.params = this.props.navigation.getParam('lablelist');
  }
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  renderLableListInModelAlert = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.openButton,
          backgroundColor: GlobalStyles.colorCodes.orange,
        }}
        onPress={() => {
          return (
            this.setModalVisible(false),
            this.setState({batchid: item.batchid})
          );
        }}>
        <Text style={styles.textStyle}>{item.batchid}</Text>
      </TouchableOpacity>
    );
  };


  onCreateAction = () => {
   if (this.state.date && !this.state.batchid) {
      this.setModalVisible(true);
    }

    // if (this.state.batchid && this.state.date) {
    //   this.props.navigation.navigate('CreateLable', {
    //     batchid: this.state.batchid,
    //   });
    // }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={styles.backView}>
          <Image
            resizeMode={'contain'}
            style={styles.backImg}
            source={ImagePath.BACK_ARROW}
          />
        </TouchableOpacity>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
             <Text style={styles.subtitle}>
              {'Create Batch ID'}
            </Text>
            <View style={styles.datepickerStyle}>
          <DatePicker
            style={{width:'90%',color: 'red'}}
            date={this.state.date}
            mode="date"
            placeholder="Select date"
            minDate="10-07-2020"
            format="DD-MM-YYYY"
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
          <View style={styles.batchInputStyle}>
          <TextInput
            style={styles.textbox}
            value={this.state.batchid}
            placeholder={'Enter Batch Id'}
            onChangeText={text => this.setState({batchid: text})}
          />
          </View>
          <View style={styles.loginBtn}>
              <TouchableOpacity
                onPress={this.onCreateAction}
                style={GlobalStyles.defaultBtn}>
                <Text style={GlobalStyles.buttonTitle}>
                  {'Create'}
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
              <Text style={styles.modelheaderText}>Select Batch ID</Text>
                <FlatList
                  data={this.state.batchidData}
                  renderItem={this.renderLableListInModelAlert}
                />
              </View>
            </View>
          </Modal>
        </View>
        </KeyboardAvoidingView>
        {/* {LoginStore.showLoader && <CustomLoader />} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colorCodes.white,
    paddingTop: initialWindowSafeAreaInsets.top,
  },
  backView: {
    height: 44,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
mainView:
{
  flexDirection: 'row',
  flex: 1,
  marginTop: 10,
  justifyContent: 'space-around',
},
  textbox: {
    backgroundColor: GlobalStyles.colorCodes.white,
    height: 40,
    marginBottom: 10,
    paddingLeft:15,
    fontSize:16,
    borderWidth:1,
    borderColor:GlobalStyles.colorCodes.darkLightGrey,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
   // flex:1,
    margin: 20,
    backgroundColor: GlobalStyles.colorCodes.white,
    borderRadius: 20,
    marginVertical: 10,
    width:300,
    
    //alignItems: 'center',
    shadowColor: GlobalStyles.colorCodes.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: GlobalStyles.colorCodes.orange,
    borderRadius: 5,
    padding: 10,
    marginHorizontal:30,
    marginVertical:10,
  },
  textStyle: {
    color: GlobalStyles.colorCodes.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize:18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modelheaderText:
  {
    padding:10,
    fontSize:18,
    color:GlobalStyles.colorCodes.black,
    alignSelf:'center',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 26,
    color: GlobalStyles.colorCodes.blueGrey,
    textAlign: 'center',
  },
  datepickerStyle:
  {
    marginTop:50,
    textAlign:'center',
    justifyContent:'center',
    marginHorizontal:50
  },
  batchInputStyle:
  {
    marginTop:50,
    textAlign:'center',
    justifyContent:'center',
    marginLeft:87,
    marginRight:78,
  },
  backImg: {
    height: 20,
    width: 15,
  },
  loginBtn: {
    marginTop: 53,
    justifyContent: 'center',
    alignItems: 'center',
  },
});