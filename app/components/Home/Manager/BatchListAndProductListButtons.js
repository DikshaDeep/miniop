import React from "react";
import { Button, View } from "react-native";
import ImagePath from "../../../Utility/ImagePath";
import GlobalStyles from "../../../Utility/GlobalStyles";
import { SCREENS } from "../../../Utility/Constants";

export default class UserButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  GoToBatchList = () => {
    this.props.navigation.navigate(SCREENS.MANAGERBATCHIDLIST, {
      type: "Managerlabellist",
      labelname: this.props.route.params.labelname,
    });
  };
  GoToProductList = () => {
    this.props.navigation.navigate(SCREENS.MANAGERPRODUCTLIST, {
      type: "Managerlabellist",
      batchid: this.props.route.params.batchid,
      labelname: this.props.route.params.labelname,
    });
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View style={{ flex: 0.4 }}>
            <Button title="Batch List" onPress={() => this.GoToBatchList()} />
          </View>
          <View style={{ flex: 0.4 }}>
            <Button
              title="Product List"
              onPress={() => this.GoToProductList()}
            />
          </View>
        </View>
      </View>
    );
  }
}
