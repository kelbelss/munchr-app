import { Alert, Image, View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { supabase } from '../config/supabase';
import * as Font from 'expo-font';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Load custom font asynchronously
        async function loadCustomFont() {
            await Font.loadAsync({
                'irish_grover': require('../assets/fonts/irish_grover.ttf'),
                'imprima': require('../assets/fonts/imprima.ttf'),
            });
        }

        loadCustomFont();
    }, []);


    // sign in with email and password
    const onSignInPress = async () => {
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) Alert.alert(error.message);
        setLoading(false);
    };

    // Create a new user
    const onSignUpPress = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        else Alert.alert('Sign up successful');
        setLoading(false);
    };

    // google log in
    // const Google =



    // apple log in
    // const Apple =





    // create account page



    return (
        <View style={styles.container}>

            <StatusBar style="dark" />


            <Spinner visible={loading} />

            <Text style={styles.header}>MUNCHR</Text>

            <Image style={styles.logo} source={require('../assets/images/icon.png')} />

            <TextInput autoCapitalize="none" placeholder="gavin@hooli.com" value={email} onChangeText={setEmail} style={styles.inputField} />
            <TextInput autoCapitalize="none" placeholder="password" value={password} onChangeText={setPassword} secureTextEntry style={styles.inputField} />

            <TouchableOpacity onPress={onSignInPress} style={styles.button}>
                <Text style={{ color: '#363232', fontFamily: 'imprima', fontSize: 18 }}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onSignUpPress}>
                <Text style={styles.signBtn}>Create Account</Text>
            </TouchableOpacity>

            <Text style={styles.or}>or</Text>

            <View style={styles.logInLogos}>
                <Image style={styles.apple} source={require('../assets/images/apple.png')} />
                <Image style={styles.google} source={require('../assets/images/google.png')} />
            </View>
        </View >
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        padding: 20,
        backgroundColor: "#EDF0F6",
    },
    header: {
        fontSize: 70,
        textAlign: "center",
        fontFamily: "irish_grover",
        marginTop: 60,
        marginBottom: 12,
        color: "#E6DBC8",
    },
    logo: {
        height: 180,
        width: 180,
        alignSelf: 'center',
        marginBottom: 50,
    },
    inputField: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderColor: "#E6DBC8",
        borderRadius: 4,
        padding: 10,
        color: "#363232",
        backgroundColor: "#F3F2F0",
        fontFamily: 'imprima',
        fontSize: 18,
        marginHorizontal: 20,
    },
    button: {
        marginVertical: 15,
        alignItems: "center",
        backgroundColor: "#E6DBC8",
        padding: 12,
        borderRadius: 4,
        marginBottom: 15,
        marginHorizontal: 20,
    },
    signBtn: {
        fontFamily: 'imprima',
        textAlign: "center",
        color: '#363232',
        fontSize: 18,
    },
    or: {
        fontFamily: 'imprima',
        textAlign: "center",
        color: '#363232',
        fontSize: 18,
        marginTop: 32,
    },
    logInLogos: {
        flexDirection: 'row',
        alignSelf: 'center',
        margin: 16,
    },
    apple: {
        width: 50,
        height: 50,
    },
    google: {
        margin: 5,
        width: 42,
        height: 42,
    }
});

export default Login;
