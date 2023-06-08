import React, { useState, useRef } from 'react';
import { View,StyleSheet, TouchableOpacity,Text, Animated,Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { set,ref} from "firebase/database";
import { db } from './config';
const { width, height } = Dimensions.get("window");
const App = ({navigation}) => {
  const [isAnimationStarted, setAnimationStarted] = useState(false);
  const animatedValues = useRef(Array(5).fill().map(() => new Animated.Value(0))).current;

  const startAnimation = () => {
    setAnimationStarted(true);

    animatedValues.reduce((acc, value) => {
      return acc.then(() => {
        return new Promise(resolve => {
          Animated.sequence([
            Animated.timing(value, {
              toValue: 1,
              duration: 100,
              useNativeDriver: false
            }),
            Animated.timing(value, {
              toValue: 0,
              duration: 500,
              useNativeDriver: false
            })
          ]).start(resolve);
        });
      });
    }, Promise.resolve());
  };
//test mode
  const writeData=()=>{
    startAnimation()
    console.log("writedaat");
    set(ref(db, 'command/'),{
      command:"test"//delay için ms
      // program: program,
      
   });  
    }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Test Mode</Text>
      <Text style={styles.desc}>Sistemdeki kayıtlı vanaların 2dk süre ile
       ardışık olarak çalışmasını sağlar.</Text>

      {animatedValues.map((value, index) => (
        <View style={{flexDirection: 'row',}}>
        <Animated.View
          key={index}
          style={[styles.container,
            {
              backgroundColor: value.interpolate({
              inputRange: [0, 1],
              outputRange: ['#A8C6AA', 'green']
            }),
            
          }]}
        />
        <Text style={{top:110,left:190,color:"darkgray"}} >Valve {index+1}</Text>
    </View>  ))
      }      
      <TouchableOpacity onPress={
        writeData
        } >
        <View style={[styles.button,{left:100}]}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Başlat</Text>
        </View>
      </TouchableOpacity>
    <View style={{top:-30,left:20,width:30}}>
      <TouchableOpacity  onPress={()=>{navigation.goBack()}}>
      
      <FontAwesome name="backward"  size={20} color="green" />
  
      </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer:{
    backgroundColor: "#ECF4FF",
    width,
    height,

  },
  button:{
    backgroundColor: '#D9E5F5', 
    padding: 10, 
    marginTop: 90 ,
    borderRadius:20,
    width:width/1.5,
    alignItems:"center",


  },
  container:{
  width: 80,
  height: 80,
  borderRadius:30,
  right:-width/1.3,
  marginBottom: 10,

 top:70
},
view:{

},
title:{
  justifyContent:"center",
  left:150,
  top:50,
  alignItems:"center",
  fontSize:24,
  fontStyle:"italic",
  color:"black"

},
desc:{
  top:60,
  alignItems:"center",
  fontSize:14,
  color:"black",
  fontWeight:"300",
  left:10,
}

}

);

export default App;
