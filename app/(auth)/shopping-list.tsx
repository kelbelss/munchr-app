import { ScrollView, StyleSheet, Text, View, Modal, Button, Alert, Pressable } from "react-native";
import { useState } from "react";
import { useShoppingList } from "./shoppingListContext";
import Checkbox from 'expo-checkbox';
import { Entypo, Feather } from '@expo/vector-icons';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";



const ShoppingList = () => {

    // Modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentInput, setCurrentInput] = useState("");

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

    const addItemToList = () => {
        setIsModalVisible(true);
    };

    const markAsDone = (item: string) => {
        setMarkedItems(prevMarkedItems => ({ ...prevMarkedItems, [item]: !prevMarkedItems[item] }));
    };

    const submitItem = (item: string) => {
        if (item.trim() !== "") {
            setShoppingList(prevList => [...prevList, item]);
            setMarkedItems(prevMarkedItems => ({ ...prevMarkedItems, [item]: false }));
            setIsModalVisible(false);
            setCurrentInput("");
        }
    };

    return (

        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.outputContainer}>
                    {shoppingList.length === 0 && <Text style={styles.buttonText}>Add Items From Munchr Recipe</Text>}

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
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={addItemToList}>
                            <Text style={{ color: '#363232', fontFamily: 'imprima', fontSize: 18 }}>Add New Items</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.modalCenteredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalHeader}>

                            <Pressable
                                onPress={() => {
                                    setIsModalVisible(!isModalVisible);
                                    setCurrentInput("");
                                }}
                            >
                                <Feather name="arrow-left" size={28} color="black" />
                            </Pressable>

                            <Text style={styles.modalHeaderText}>Enter Ingredients</Text>
                        </View>

                        <View
                            style={{
                                borderBottomColor: '#585555',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.modalInput} placeholder="Add to Shopping List" value={currentInput} onChangeText={setCurrentInput} />

                            <TouchableOpacity style={styles.button} onPress={() => submitItem(currentInput)}>
                                <Text style={{ color: '#363232', fontFamily: 'imprima', fontSize: 18 }}>Add</Text>
                            </TouchableOpacity></View>
                    </View>

                </View>
            </Modal>

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
        maxHeight: '100%',
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
        fontSize: 20,
        paddingTop: "3%",
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
    buttonAdd: {
        backgroundColor: "#E6DBC8",
        padding: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#E6DBC8",
        fontFamily: 'imprima',
        fontSize: 18,
        alignItems: 'center',
        marginHorizontal: "30%",
        marginBottom: "2%",
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalCenteredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        width: '92%',
        height: '88%',
        margin: 20,
        backgroundColor: "#F3F2F0",
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
    modalHeader: {
        flexDirection: 'row',
        padding: 25,
    },
    modalHeaderText: {
        color: '#000000',
        fontFamily: 'imprima',
        fontSize: 26,
        marginLeft: 54,
    },
    inputContainer: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalInput: {
        borderWidth: 1,
        borderColor: "#E6DBC8",
        borderRadius: 4,
        padding: 12,
        color: "#363232",
        backgroundColor: "#F3F2F0",
        fontFamily: 'imprima',
        fontSize: 18,
        marginHorizontal: 5,
        width: '65%',
        marginLeft: 10,
    },
    button: {
        backgroundColor: "#E6DBC8",
        padding: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#E6DBC8",
        fontFamily: 'imprima',
        fontSize: 18,
        alignItems: 'center',
        width: '100%',
    },

})
