import { ScrollView } from 'react-native';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { I18n } from 'i18n-js';
import { en, tr } from './Languages';
const plant = require("./images/Resim3.png")
const { width, height } = Dimensions.get("window");
import MannualMode from './MannualMode';
import { use } from 'i18next';
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { db } from './config';



export default  function App({ navigation, route }) {

    const i18n = new I18n()
    i18n.translations = { en, tr };
    i18n.locale = route.params.type;
    i18n.enableFallback = true;
    //console.log(route.params.type);

    const [data, setData] = useState([]);


    const [valve, setValve] = useState("");

    function  Read(valve) {
    
        const starCountRef = ref(db, 'Sistem/' + valve);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const newData = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            console.log("new data:"+newData);
            setData(newData);      
          
        })
    }
 
    useEffect(() => {

    }, [])


    const [isPress, setİsPress] = useState(false);
    return (
        <View style={styles.container}>
            <Image source={plant} style={styles.plant} />
            <View style={styles.info}>
                <Text style={{ color: "#408601", fontWeight: "bold", fontSize: 16, textAlign: "center" }}>Program Bilgileri</Text>
                <Text style={{ color: "#408601", fontWeight: "bold", fontSize: 16, textAlign: "center" }}> {valve}</Text>
                {
                    data.map((item, index) => {
                        return (
                            <View key={index} style={{ top: 50, alignItems: "center" }}>
                                <Text> {item.id}</Text>

                                <Text>{i18n.t("day")} : {item.day}</Text>
                                <Text>{i18n.t("controller")} :  {item.controller}</Text>
                                <Text>{i18n.t("start")} : {item.start}</Text>
                                <Text>{i18n.t("stop")} : {item.stop}</Text>
                            </View>
                        )
                  })
                   }
            </View>
            <View style={styles.window}>
                <Text style={{ marginTop: 15 }}> {i18n.t("valf")}</Text>
                <TouchableOpacity style={[styles.touch, { top: 50 }]} onPress={() => {
                    setValve("Vana");
                    Read("Vana");
                }} >
                    <Text>1</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.touch, { top: 180 }]} onPress={() => {
                    setValve("Vana2");
                    Read("Vana2")
                }}>
                    <Text>2</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.touch, { top: 310 }]}>
                    <Text>3</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.touch, { top: 440 }]}>
                    <Text>4</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.touch, { top: 570 }]}>
                    <Text>5</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        width,
        height,
        backgroundColor: "#ECF4FF"
    },
    info: {
        top: 20,
        backgroundColor: "#ECF4FF",
        width: 300,
        height: 400,
        left: 100,

    },
    window: {
        position: "absolute",
        width: width / 5,
        backgroundColor: "#A8C6AA",
        height,
        borderRadius: 20,
        alignItems: "center",
    },
    touch: {
        backgroundColor: "#ECF4FF",
        position: "absolute",
        width: width / 5,
        height: height / 8,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },

    plant: {
        width: width / 3,
        height: height / 3,
        left: 300
    }
})