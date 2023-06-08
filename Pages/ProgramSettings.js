import { Alert, ScrollView } from 'react-native';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { I18n } from 'i18n-js';
import { en, tr } from './Languages';
const { width, height } = Dimensions.get("window");
import { db } from './config';
import { ref, remove } from 'firebase/database';
export default function App({navigation,route }) {
    const i18n = new I18n()
    i18n.translations = { en, tr };
    i18n.locale = route.params.type;
    i18n.enableFallback = true;
    //console.log(route.params.type);

    //Resetleme fonksiyonu veri tabanındaki tüm program kayıtlarını siler.
    const DeleteAllDataFirebase = () => {

        Alert.alert(i18n.t("reset"), "Are you sure you want to delete the programs that have been saved in the system? ",
            [
                {
                    text:"yes",
                    onPress: () => {

                        remove(ref(db, 'Command/')).then(() => {
                            console.log("Remove success");
                        }).catch((er) => { console.log(er) });
                    },
                },
                {
                    text:"cancel",
                    onPress: () => console.log('Cancel Pressed'),

                }

            ])

    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.touch, { marginTop: height / 5 }]}
                onPress={() => { navigation.navigate("DetailProgram", {
                    type:route.params.type});}}>
                <Text>{i18n.t("detail")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.touch, { marginTop: height / 2.6, left: width / 2, }]}
                onPress={() => { DeleteAllDataFirebase() }}>
                <Text>{i18n.t("reset")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.touch, { marginTop: height / 1.6, }]}
                onPress={() => { navigation.navigate("AddProgram", {
                    type:route.params.type}); }}>
                <Text>{i18n.t("addProgram")}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        width,
        height,
        backgroundColor: "#ECF4FF"
    },
    touch: {
        backgroundColor: "#CEDFF7",

        height: height / 12,
        width: width / 2,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        position: "absolute"
    },
})