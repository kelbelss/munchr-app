import React, { useState } from 'react'
import { Modal, Pressable, ScrollView, StyleSheet, Text, View, Switch } from "react-native";
import { Feather } from '@expo/vector-icons';
import Diet from './dietSelect';


interface ModalComponentProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

export default function ModalComponent({ modalVisible, setModalVisible }: ModalComponentProps) {

    const [isVitality, setIsVitality] = useState(false);


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.modalCenteredView}>

                <View style={styles.modalView}>

                    <View style={styles.modalHeader}>

                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Feather name="arrow-left" size={28} color="black" />
                        </Pressable>

                        <Text style={styles.modalHeaderText}>Filter Preferences</Text>
                    </View>
                    <View
                        style={{
                            borderBottomColor: '#585555',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />
                    <ScrollView style={styles.filterContainer}>
                        <View style={styles.diet}>
                            <Text style={styles.modalText}>Dietary Requirements:</Text>
                            {/* <Text style={styles.dietText}>Gluten Free, Vegan</Text> */}
                            <Diet />
                        </View>

                        <View
                            style={{
                                borderBottomColor: '#585555',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />

                        <View style={styles.vitality}>

                            <Text style={styles.modalText}>Are you a Vitality Member?</Text>
                            <Switch value={isVitality} onValueChange={() => setIsVitality((previousState) => !previousState)} trackColor={{ false: "", true: "#E6DBC8" }} />

                        </View>

                        <View
                            style={{
                                borderBottomColor: '#585555',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />

                    </ScrollView>

                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
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
    modalText: {
        color: '#363232',
        fontFamily: 'imprima',
        fontSize: 22,
    },
    filterContainer: {
        paddingHorizontal: 25,
    },
    diet: {
        paddingVertical: 25,
    },
    // dietText: {
    //     paddingHorizontal: 15,
    //     paddingTop: 20,
    //     fontFamily: 'imprima',
    //     fontSize: 18,
    //     color: '#363232',
    // },
    vitality: {
        paddingVertical: 25,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: "space-between",
    }
});