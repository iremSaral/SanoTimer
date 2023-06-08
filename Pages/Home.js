import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image, Button, TouchableOpacity, Alert } from 'react-native';
import { I18n } from 'i18n-js';
import { en, tr } from './Languages';
const plant = require("./images/Resim2.png");
const { width, height } = Dimensions.get("window");



export default function App({navigation,route}) {


   const i18n = new I18n()
    i18n.translations = { en, tr };
    i18n.locale = route.params.type;
    i18n.enableFallback = true;

  //console.log(route.params.type);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("SanoTimer")}</Text>
      <Text style={styles.text}>{i18n.t("explanation")}</Text>
      <View style={styles.elips}>
        <Image style={styles.ımagePlant} source={plant} />
      </View>
      <TouchableOpacity style={styles.ButtonApp} onPress={() => {
        navigation.navigate("AppMode",{type:route.params.type});
       
      }}>
        <Text style={styles.textButton}>{i18n.t("appMode")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.ButtonRes} onPress={() => {
        Alert.alert("Reset", "The application will be reset. Do you confirm?", [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);

      }}>
        <Text style={styles.textButton}>{i18n.t("reset")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  elips: {
    position: "absolute",
    width: width / 1,
    height: height / 1.7,
    left: height / 4,
    top: height / 5,
    backgroundColor: "#D4E5F9",
    borderRadius: 500,
  },
  ımagePlant: {
    position: "absolute",
    left: 0,
    top: 5,
    width: width / 1,
    height: height / 1.7,
  },
  title: {
    position: "absolute",
    width: 294,
    height: 49,
    left: 20,
    top: 90,
    fontSize: 40,
    fontWeight: "normal",
    fontFamily: "sans-serif-medium",
  },
  text: {
    position: "absolute",
    width: 203,
    height: 31,
    left: 46,
    top: 150,
    fontSize: 15,
    fontFamily: 'sans-serif-thin',
  },
  ButtonApp: {
    position: "absolute",
    width: 195,
    height: 90,
    left: 210,
    top: 580,
    backgroundColor: "#FCFDFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  ButtonRes: {
    position: "absolute",
    width: 195,
    height: 90,
    left: 5,
    top: 580,
    backgroundColor: "#D4E5F9",
    borderRadius: 20
  },
  textButton: {
    position: "absolute",
    width: 108,
    top: 25,
    left: 50,
    fontFamily: 'sans-serif-thin',
    fontSize: 20,


  }

});
