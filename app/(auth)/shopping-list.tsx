import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from "react";
import { useShoppingList } from "./shoppingListContext";
import Icon from 'react-native-vector-icons/Ionicons';
import Checkbox from 'expo-checkbox';



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
                            <Checkbox
                                style={styles.checkbox}
                                value={!!markedItems[item]}
                                onValueChange={() => markAsDone(item)}
                                color={!!markedItems[item] ? '#77dd77' : undefined}
                            />
                            <Text>{item}</Text>
                            {/* <Icon name="checkmark-circle" size={24} color={markedItems.includes(item) ? "green" : "grey"} onPress={() => markAsDone(item)} /> */}
                            <Icon name="trash-bin" size={24} color="red" onPress={() => removeFromList(item)} />
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
        width: '92%',
        height: 'auto',
        alignItems: 'center',
        marginHorizontal: '4%',
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
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonText: {
        color: '#363232',
        fontFamily: 'imprima',
        fontSize: 18,
    },
    checkbox: {
        margin: 8,
        color: "black",
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

})
