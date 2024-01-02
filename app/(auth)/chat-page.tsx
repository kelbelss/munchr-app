import { Button, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';

// const onInput (() => {
//     input: value={input}
// })

const filterImage = require('/Users/kellysmulian/GitHub/munchr-app/assets/images/filter.png');

export default function TabOneScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.outputContainer}>
                <Text style={styles.outputHeading}>Grilled Lemon Herb Chicken</Text>
                <Text style={styles.outputSummary}>This Grilled Lemon Herb Chicken is not only gluten-free but also low in fat high in protein.</Text>
                <TouchableOpacity style={styles.fullRecipeBlock}>
                    <Text style={{ color: '#363232', fontFamily: 'imprima', fontSize: 18, marginRight: 20 }}>Full Recipe</Text>
                    <AntDesign name="down" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.shoppingListBlock}>
                    <Text style={{ color: '#363232', fontFamily: 'imprima', fontSize: 18, marginRight: 20 }}>Shopping List</Text>
                    <AntDesign name="down" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <Pressable>
                    {({ pressed }) => (
                        <Image style={{ opacity: pressed ? 0.5 : 1, height: 45, width: 40 }} source={filterImage} />
                    )}
                </Pressable>
                <TextInput autoCapitalize="none" placeholder="Ask Munchr" style={styles.userInput} />
                <TouchableOpacity style={styles.button}>
                    <Text style={{ color: '#363232', fontFamily: 'imprima', fontSize: 18 }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF0F6',
    },
    outputContainer: {
        backgroundColor: '#F3F2F0',
        width: '92%',
        height: '28%',
        alignItems: 'center',
        marginHorizontal: '4%',
        marginVertical: '5%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        borderRadius: 6,
    },
    outputHeading: {
        fontSize: 22,
        marginTop: 10,
        fontFamily: 'imprima',
    },
    outputSummary: {
        fontSize: 16,
        marginHorizontal: 20,
        marginVertical: 16,
        textAlign: 'center',
        color: '#585555',
        fontFamily: 'imprima',
    },
    fullRecipeBlock: {
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E6DBC8",
        padding: 8,
        borderRadius: 4,
        marginBottom: 5,
        marginTop: 10,
        width: '90%',
        flexDirection: "row",
        // justifyContent: 'center',
    },
    shoppingListBlock: {
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E6DBC8",
        padding: 8,
        borderRadius: 4,
        marginBottom: 5,
        width: '90%',
        flexDirection: "row",
        // justifyContent: 'center',
    },
    inputContainer: {
        position: 'absolute',
        bottom: 0,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    userInput: {
        // height: 50,
        borderWidth: 1,
        borderColor: "#E6DBC8",
        borderRadius: 4,
        padding: 12,
        color: "#363232",
        backgroundColor: "#F3F2F0",
        fontFamily: 'imprima',
        fontSize: 18,
        marginHorizontal: 5,
        width: 265,
        marginLeft: 10,

    },
    button: {
        backgroundColor: "#E6DBC8",
        padding: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#E6DBC8",
        // height: 50,
        fontFamily: 'imprima',
        fontSize: 18,
    },

    // separator: {
    //     marginVertical: 30,
    //     height: 1,
    //     width: "80%",
    // },
});