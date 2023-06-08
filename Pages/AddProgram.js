
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Dimensions, Image, Button, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { I18n } from 'i18n-js';
import { db } from './config';
import { en, tr } from './Languages';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { getDatabase, ref, onValue, set } from 'firebase/database';
const { width, height } = Dimensions.get("window");

export default function App({ navigation,route }) {

    const i18n = new I18n()
    i18n.translations = { en, tr };
    i18n.locale = route.params.type;
    i18n.enableFallback = true;
    //console.log(route.params.type);

    const programAdd = () => {
        set(ref(db, 'SistemDemo/' + valve + "/" + program + "/"), {
            // program: program,
            day: day,
            start: start,
            controller: controller,
            stop: stop,
        });
        setController('')
        setDay('')
        setProgram('')
        setStart('')
        setStop('')
        setValve('')
    }

    const controlSchemma = Yup.object().shape({
        valve: Yup.string().min(2, 'Too short')
            .max(6, 'Too Long').required("Please write valve name with the number valve, like Valve1"),
        day: Yup.string().min(5, "Too short")
            .required("Write day name"),
        program: Yup.string().min(8, "Too Short")
            .required("Write program name like :program1"),
        start: Yup.string().min(5, "too short")
            .matches('^\d{2}:\d{2}$').required("Write start time"),
        stop: Yup.string().min(5, "too short")
            .matches('^\d{2}:\d{2}$').required("Write stop time"),

    })
    return (

        <Formik initialValues={{
            valve: '',
            program: '',
            day: "",
            start: "",
            stop: "",
            controller: "",

        }}
            validationSchema={controlSchemma}>

            {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (

                <View style={styles.container}>
                    <Text style={styles.title}>Add Program to System</Text>

                    <TextInput
                        placeholder={i18n.t("valf")} 
                        value={values.valve}
                        onChangeText={handleChange("valve")}
                        style={[styles.txtIn, {
                            left: 100, width: width / 2, top: 150
                        }]}
                    />
                    {errors.valve && (
                        <Text style={{ top: 170, color: "red", fontSize: 12 }}>{errors.valve}</Text>)}

                    <TextInput
                        placeholder={i18n.t("proName")} 
                        value={values.program}
                        onChangeText={handleChange("program")}
                        style={[styles.txtIn, {
                            left: 100, width: width / 2, top: 220
                        }]}
                    />
                    {errors.program && (
                        <Text style={{ top: 220, color: "red", fontSize: 12 }}>{errors.program}</Text>)}

                    <TextInput
                        placeholder={i18n.t("day")} 
                        value={values.day}
                        onChangeText={handleChange("day")}
                        style={[styles.txtIn, {
                            left: 100, width: width / 2, top: 290
                        }]}
                    />
                    {errors.day && (
                        <Text style={{ top: 270, color: "red", fontSize: 12 }}>{errors.day}</Text>)}

                    <TextInput
                        placeholder={i18n.t("start")} 
                        value={values.day}
                        onChangeText={handleChange("start")}
                        style={[styles.txtIn, {
                            left: 100, width: width / 2, top: 350
                        }]}
                    />
                    {errors.start && (
                        <Text style={{ top: 320, color: "red", fontSize: 12 }}>{errors.start}</Text>)}


                    <TextInput
                        placeholder={i18n.t("stop")} 
                        value={values.day}
                        onChangeText={handleChange("stop")}
                        style={[styles.txtIn, {
                            left: 100, width: width / 2, top: 420
                        }]}
                    />
                    {errors.stop && (
                        <Text style={{ top: 370, color: "red", fontSize: 12 }}>{errors.stop}</Text>)}

                    <TextInput
                        placeholder='Stop Time'
                        value={values.day}
                        onChangeText={handleChange("stop")}
                        style={[styles.txtIn, {
                            left: 100, width: width / 2, top: 490
                        }]}
                    />
                    {errors.stop && (
                        <Text style={{ top: 420, color: "red", fontSize: 12 }}>{errors.stop}</Text>)}



                    <TouchableOpacity style={[styles.Button, { top: 520, backgroundColor: "#D9E5F5" }]}
                        onPress={() => {
                            //  programAdd();
                        }}>
                        <Text>{i18n.t("addProgram")} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.Button, { top: 550, backgroundColor: "#408601" }]}
                        onPress={() => { navigation.goBack() }}>
                        <Text>{i18n.t("cancel")} </Text>
                    </TouchableOpacity>

                </View>
            )}
        </Formik>
    )
}


const styles = StyleSheet.create({

    container: {
        width,
        height,
        backgroundColor: "#ECF4FF",
        alignItems: "center"
    },
    txtIn: {
        position: "absolute",
        height: 40,
        backgroundColor: "#FCFDFF",
        borderWidth: 1,
        borderColor: "darkgreen"

    },
    title: {
        color: "#408601",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        top: 50,


    },
    Button: {
        justifyContent: "center",
        alignItems: "center",
        width: width / 1.33,
        height: 40,
    }
})