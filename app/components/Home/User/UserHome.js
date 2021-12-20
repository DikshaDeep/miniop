import React from "react";
import { Button, View } from "react-native";
import ImagePath from "../../../Utility/ImagePath";
import GlobalStyles from "../../../Utility/GlobalStyles";
import { SCREENS } from "../../../Utility/Constants";

export default class UserHome extends React.Component {
  constructor(props) {
    super(props);
  }

  GoToListBatch = () => {
    this.props.navigation.navigate(SCREENS.LISTBATCHID);
  };
  GoToLabelListId = () => {
    this.props.navigation.navigate(SCREENS.USERLABELLIST);
  };
  render() {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View style={{ flex: 0.4 }}>
            <Button
              title="Manage Batchid"
              onPress={() => this.GoToListBatch()}
            />
          </View>
          <View style={{ flex: 0.4 }}>
            <Button
              title="View Labels"
              onPress={() => this.GoToLabelListId()}
            />
          </View>
        </View>
      </View>
    );
  }
}
