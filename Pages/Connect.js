import { StyleSheet, Text, View, Dimensions, Alert, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useState } from 'react';
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { en, tr } from './Languages';

const plant = require("./images/Resim2.png");
const tc = require("./images/tr.png");
const uk = require("./images/en.jpg");

const { width, height } = Dimensions.get("window");
//Şifre en az 4 karakter olmalı ve boş geçilemez
const loginValidationSchema = yup.object().shape({
    password: yup
        .string()
        .min(4, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
})


export default function App({ navigation }) {

    const [locale, setLocale] = useState(Localization.locale);

    const i18n = new I18n()
    i18n.translations = { en, tr };
    i18n.locale = locale;
    i18n.enableFallback = true;
    //Şifre doğru mu girildi
    function validatepassw(value) {
        let error;
        if (value == "1234") {
            navigation.navigate("Connect",{
                type:locale,
            });
        }
        else {
            Alert.alert("", "you wrote a false password or you didn't write password .Please try again", [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
    }
    //Uygulama başlarken kullanım dili ing veya türkçe olarak seçilebilir
    const [src, setSrc] = useState(tc);
    function choiceLang(src) {
        if (src == uk) {
            setSrc(tc);
            console.log({ src });
            setLocale("tr");
        }
        else {
            setSrc(uk);
            console.log({ src });
            setLocale("en");
        }

    }

    return (
        <Formik
            initialValues={{ password: '' }}
            onSubmit={values => console.log(values)}
            validationSchema={loginValidationSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={styles.container}>
                    <Text style={styles.title}>{i18n.t('welcome')}</Text>
                    <TouchableOpacity style={styles.choice} onPress={() => { choiceLang(src) }}>
                        <Image style={{ height: 15, width: 15 }} source={src} />
                    </TouchableOpacity>

                    <Text style={styles.titleTwo}>{i18n.t("connect")}</Text>
                    <Image style={styles.backgroundImage} source={plant} />
                    <Text style={styles.titlethree}>{i18n.t("descOne")}</Text>
                    <TextInput
                        name="password"
                        placeholder="Password"
                        style={styles.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        //validationSchema={validatepassw(values.password)}
                        secureTextEntry
                    />
                    {errors.password &&
                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                    }
                    <TouchableOpacity style={styles.connect} onPress={() => {

                        validatepassw(values.password)

                    }}>
                        <Text style={styles.textconnect}>{i18n.t("connectButton")}</Text>
                    </TouchableOpacity>

                </View>
            )}
        </Formik>

    )
}

const styles = StyleSheet.create({
    choice: {
        marginTop: 110,
        right: 100,
        width: 15,
        height: 15,
        backgroundColor: "pink",

    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        fontFamily: "sans-serif-medium",
        color: "darkgreen",
        top: 80,
        position: "absolute"
    },
    titleTwo: {
        fontSize: 16,
        fontWeight: "normal",
        fontFamily: "sans-serif-thin",
        color: "darkgreen",
        top: 110,
        position: "absolute"
    },
    titlethree: {
        fontSize: 14,
        fontWeight: "normal",
        fontFamily: "sans-serif-medium",
        color: "darkgreen",
        top: 320,
        position: "absolute"
    },
    container: {
        width,
        height,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
    },
    backgroundImage: {
        position: "absolute",
        width: 340,
        height: 500,
        top: 200,
        opacity: 0.5
    },
    userıd: {
        fontStyle: "italic",
        fontFamily: "sans-serif-medium",
        textAlign: "center",
        color: "black",
        fontSize: 15,
        position: "absolute",
        backgroundColor: "white",
        width: 342,
        height: 50,
        padding: 10,
        bottom: 327,
    },
    password: {
        fontStyle: "italic",
        fontFamily: "sans-serif-medium",
        textAlign: "center",
        color: "black",
        fontSize: 15,
        position: "absolute",
        backgroundColor: "white",
        width: 342,
        height: 50,
        padding: 10,
        bottom: 270,
    },
    connect: {
        position: "absolute",
        bottom: 180,
        width: 250,
        height: 50,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 25,
        opacity: 0.7
    },
    textconnect: {
        textAlign: "center",
        fontSize: 15,
        fontFamily: "sans-serif-medium",
        color: "darkgreen",

    }

})