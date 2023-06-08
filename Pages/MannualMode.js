import { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Button, TouchableOpacity, Alert } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import DropDownPicker from 'react-native-dropdown-picker';
import { I18n } from 'i18n-js';
import { en, tr } from './Languages';
const { width, height } = Dimensions.get("window");
import { set,ref} from "firebase/database";
import { db } from './config';

export default function MannualMode({ route }) {
    const i18n = new I18n()
    i18n.translations = { en, tr };
    i18n.locale = route.params.type;
    i18n.enableFallback = true;
    //console.log(route.params.type);

    const [items, setItems] = useState([
        {label: '1', value: 'Vana1'},
        {label: '2', value: 'Vana2'},
        {label: '3', value: 'Vana3'},
        {label: '4', value: 'Vana4'},
        {label: '5', value: 'Vana5'}
      ]);
    
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);//valve
    const [second, setSecond] = useState(0);//duration


    const getSecond = () => {
        if (second * (60 / 100) < 60) {
            console.log(second * (60 / 100));
            setSecond(second + 10);
        }

    }

    const writeCommand=()=>{
   
        console.log("writecom");
        set(ref(db, 'command/'),{
          command:"mannual"//delay için ms
          // program: program,
          
       });  
        }
const writeData=()=>{
    writeCommand()
    console.log("writedaat")
    set(ref(db, 'mannual/'), {
        valve:value,
       duration:second*1000//delay için ms
        // program: program,
        
     });
     setValue(null);
    }

    return (
        <View style={styles.container}>
            <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styles.combobox}
            textStyle={styles.comboText}
            containerStyle={styles.comboContainer}
            placeholder='Valve'
            
            />
           
            <Text style={styles.title}>{i18n.t("mannual")}</Text>
            <AnimatedCircularProgress
                size={200}
                width={30}
                fill={second}
                style={{ marginTop: 200, position: "absolute" }}
                tintColor="#408601"
                backgroundColor="#D9E5F5"
                duration={500}
                maxValue={60}
                rotation={0}
            >
            </AnimatedCircularProgress>
            <Text style={styles.secondText}>{second * (60 / 100)}sc</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.startButton} onPress={getSecond}>
                    <Text style={{ textAlign: "center", marginLeft: 80 }}>{i18n.t("inc")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.resetButton} onPress={() => { setSecond(0) }}>
                    <Text style={{ textAlign: "center", marginTop: 10 }}>{i18n.t("reset")}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={writeData}>
                <Text style={{ textAlign: "center", marginTop: 10 }}>{i18n.t("save")}</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({

    combobox:{
        top:130,
        height:5,
        borderWidth:0,
        width:60,
        left:0,
        opacity:0.7,
        borderColor:"#408601",
        borderWidth:1,  
        backgroundColor: "#EFF6FF",  
        
    },
    comboContainer:{
        maxWidth:90,
        right:130,
    
    
    },
    comboText:{
    fontSize:10,

    },
    container: {
        backgroundColor: "#EFF6FF",
        width,
        height,
        alignItems: "center",

    },
    startButton: {
        backgroundColor: "#D9E5F5",
        height: 40,
        width: width / 2,
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 16,


    },
    resetButton: {
        backgroundColor: "#408601",
        height: 40,
        width: width / 4,
        borderRadius: 16

    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 420,
        position: "absolute"
    },
    title: {
        height: 45,
        width: 305,
        position: "absolute",
        marginTop: 90,
        textAlign: "center",
        fontFamily: 'sans-serif-thin',
        fontSize: 25,
        fontWeight: 300
    },
    secondText: {
        fontSize: 20,
        marginTop: 290,
        fontFamily: 'sans-serif-thin',
    },
    saveButton: {
        marginTop: 180,
        width: (3 * width) / 4,
        backgroundColor: 'pink',
        height: 40
    }
})