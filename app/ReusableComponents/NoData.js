import React from 'react';
import {View, StyleSheet,Text,Image} from 'react-native';
import GlobalStyles from '../Utility/GlobalStyles';
const NoData = ({image, header, text, imageStyle, headerStyle}) => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode={'contain'}
        style={[styles.image, imageStyle && imageStyle]}
        source={image}
      />
      <Text style={[styles.header, headerStyle && headerStyle]}>
        {header}
      </Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: GlobalStyles.colorCodes.white,
  },
  image: {
    width: 150,
    height: 132,
  },
  header: {
    fontSize: 24,
    color: GlobalStyles.colorCodes.black,
    marginTop: 45,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    color: GlobalStyles.colorCodes.charcoalGrey,
    marginTop: 10,
  },
});
export default NoData;
