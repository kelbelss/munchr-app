import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from "react";
import { useShoppingList } from "./shoppingListContext";
import Icon from 'react-native-vector-icons/Ionicons';
import Checkbox from 'expo-checkbox';
import { Entypo } from '@expo/vector-icons';



const ShoppingList = () => {

    const { shoppingList, setShoppingList } = useShoppingList();
    const [markedItems, setMarkedItems] = useState<Record<string, boolean>>({});

    const removeFromList = (item: string) => {
        setShoppingList(prevList => prevList.filter(i => i !== item));
        setMarkedItems(prevMarkedItems => {
            const newMarkedItems: Partial<typeof prevMarkedItems> = { ...prevMarkedItems };
            delete newMarkedItems[item];
            return newMarkedItems as typeof prevMarkedItems;
        });
    };

    const addItemToList = (item: string) => {
        setShoppingList(prevList => [...prevList, item]);
        setMarkedItems(prevMarkedItems => ({ ...prevMarkedItems, [item]: false }));
    };

    const markAsDone = (item: string) => {
        setMarkedItems(prevMarkedItems => ({ ...prevMarkedItems, [item]: !prevMarkedItems[item] }));
    };

    return (

        // <Text>Shopping List</Text>
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.outputContainer}>
                    {shoppingList.length === 0 && <Text style={styles.buttonText}>Add Items to your Shopping List</Text>}
                    {shoppingList.map((item, index) => (
                        <View key={index} style={styles.itemContainer}>
                            <View style={styles.checkText}>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={!!markedItems[item]}
                                    onValueChange={() => markAsDone(item)}
                                    color={!!markedItems[item] ? '#77dd77' : undefined}
                                />
                                <Text style={styles.shoppingList}>{item}</Text>
                            </View>
                            <Entypo name="cross" size={26} color="grey" onPress={() => removeFromList(item)} />
                        </View>
                    ))}
                </View>
            </ScrollView>

        </View>

    );

}

export default ShoppingList


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF0F6',
    },
    scrollView: {
        flex: 1,
        maxHeight: '90%',
    },
    outputContainer: {
        flex: 1,
        backgroundColor: '#F3F2F0',
        width: '96%',
        height: 'auto',
        marginHorizontal: '2%',
        marginVertical: '5%',
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding: '2%',
    },
    buttonText: {
        color: '#363232',
        fontFamily: 'imprima',
        fontSize: 18,
        paddingTop: 20,
        paddingBottom: 20,
        textAlign: 'center',
    },
    shoppingList: {
        color: '#363232',
        fontFamily: 'imprima',
        fontSize: 18,
        paddingTop: 10,
        paddingBottom: 10,
    },
    checkbox: {
        margin: 8,
        color: "black",
    },
    checkText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },

})
