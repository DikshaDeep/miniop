import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";

export default class CustomTabItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
  }
  handleClick = () => {
    this.setState({
      isClicked: !this.state.isClicked
    });
    this.props.handleNaviagation();
  };
  render() {
    var image_url =this.props.image;
    return (
      <TouchableOpacity onPress={this.handleClick}>
        <View
          style={{
            marginHorizontal: 24,
            marginVertical: 8,
            borderRadius: 6,
            height: 160,
          }}
        >
          <Image
            style={{
              backgroundColor: "#ccc",
              flex: 1,
              position: "absolute",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              borderRadius: 6
            }}
            source={this.props.image}
          />
         

          <View
            style={{
              padding: 50,
              position: "absolute",
              width: "100%",
              height: "100%",
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.44)",
              borderRadius: 6
            }}
          >
            <Text
              style={{
                fontSize: 40,
                fontWeight: "700",
                color: "#ffffff"
              }}
            >
              {this.props.name}
            </Text>
          
           
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});