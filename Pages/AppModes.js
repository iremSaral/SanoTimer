
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { I18n } from 'i18n-js';
import { en, tr } from './Languages';
const plant = require("./images/Resim3.png")
const { width, height } = Dimensions.get("window");
import MannualMode from './MannualMode';
import ProgramSettings from './ProgramSettings';
import TestMode from './TestMode';

export default function App({ navigation, route }) {


    const i18n = new I18n()
    i18n.translations = { en, tr };
    i18n.locale = route.params.type;
    i18n.enableFallback = true;
    console.log(route.params.type);
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>{i18n.t("SanoTimer")}</Text>
                <Text style={styles.Text}>{i18n.t("appMode")}</Text>
                <View style={{ justifyContent: "space-between" }}>
                    <Image style={styles.plantImg} source={plant} />
                    <View style={styles.containerButton}>
                        <TouchableOpacity style={styles.MannualMode} onPress={() => {
                            navigation.navigate("MannualMode", {
                                type:route.params.type}); }}>
                            <Text style={styles.ButtonText}>{i18n.t("mannual")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.MannualMode} onPress={()=>{
                            navigation.navigate("TestMode")
                        }} >
                            <Text style={styles.ButtonText}>{i18n.t("test")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.MannualMode}
                        onPress={()=>{navigation.navigate("ProgramSettings", {
                            type:route.params.type})}}>
                       
                            <Text style={styles.ButtonText}>{i18n.t("Settings")}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.goBack} onPress={() => { navigation.goBack() }}>
                        <Text style={styles.goBackText}>{i18n.t("goBack")}</Text>
                    </TouchableOpacity>

                </View>


            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: "#ECF4FF",
        alignItems: "center",

    },
    title: {
        position: "absolute",
        fontSize: 30,
        fontWeight: "normal",
        fontFamily: "sans-serif-medium",
        marginTop: 20,
        textAlign: "center"
    },
    Text: {
        position: "absolute",
        fontSize: 15,
        fontWeight: "normal",
        fontFamily: "sans-serif-thin",
        marginTop: 60,
        textAlign: "center"
    },
    plantImg: {
        position: "absolute",
        width: width / 1,
        height: height / 1.4,//294
        marginLeft: -215,
        marginTop: 108,
        marginRight: 0,
        marginBottom: 500,

    },
    //
    containerButton: {
        flexDirection: "column",
        justifyContent: "space-evenly",
        position: "absolute",
        width: 150,
        marginTop: 120,
        marginLeft: 220,
        marginRight: 100,
        height: height - 200,

    },
    MannualMode: {
        width: 120,
        height: 80,
        backgroundColor: "#FCFDFF",
        borderRadius: 20,

    },
    ButtonText: {
        position: "absolute",
        fontSize: 20,
        left: 20,
        marginTop: 20,
        fontWeight: "normal",
        fontFamily: "sans-serif-thin",

    },
    TestMode: {

    },

    goBack: {
        marginTop: 600,
        width: 310,
        height: 50,
        backgroundColor: "#D4E5F9",
        borderRadius: 20,
        alignItems: "center",
    },
    goBackText: {
        position: "absolute",
        fontSize: 16,
        textAlign: "center",
        marginTop: 10,
    }
})