import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image, Button, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import {en,tr} from './Languages';


export default function App({ navigation }) {


    const [locale, setLocale] = useState(Localization.locale);
    
    const i18n = new I18n()
    i18n.translations={en,tr};
    i18n.locale=locale;
  

    return (
        <View>
            <Text style={{ marginTop: 200 }}>{i18n.t('welcome')}</Text>
            <TouchableOpacity onPress={() => {setLocale('tr') }}>
                <Text>Turkce</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setLocale('en') }}>
                <Text>İngilizce</Text>
            </TouchableOpacity>
        </View>
    )


}