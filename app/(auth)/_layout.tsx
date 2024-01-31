import { Tabs } from 'expo-router';
import { useAuth } from '../../provider/AuthProvider';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';


const TabLayout = () => {

    const { signOut, session } = useAuth();

    return (
        <Tabs
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#EDF0F6',
                    borderBottomWidth: 0,
                },
                tabBarStyle: {
                    backgroundColor: '#EDF0F6',
                },
                tabBarActiveTintColor: '#000', // Active tab text color
                tabBarInactiveTintColor: '#848484',
            }}
        >
            <Tabs.Screen
                name="chat-page"
                options={{
                    title: "Munchr",
                    tabBarLabelStyle: {
                        fontSize: 12,
                    },
                    headerTitleStyle: {
                        fontSize: 40,
                        color: '#E6DBC8',
                        fontFamily: "irish_grover",
                        textShadowColor: '#baa582',
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 0.5,
                        textTransform: 'uppercase',
                    },
                    tabBarIcon: ({ focused }) => (
                        <Entypo name="bowl" color={focused ? '#000' : '#848484'} size={24} />
                    ),
                }}
            />
            <Tabs.Screen
                name="shopping-list"
                options={{
                    title: "Shopping List",
                    tabBarLabelStyle: {
                        fontSize: 12,
                        marginBottom: -3,
                    },
                    headerTitleStyle: {
                        fontFamily: 'imprima',
                        fontSize: 30,
                        color: '#E6DBC8',
                        textShadowColor: '#baa582',
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 0.5,
                    },
                    tabBarIcon: ({ focused }) => (
                        <Octicons name="checklist" size={22} color={focused ? '#000' : '#848484'} />
                    ),
                }}
            />


            <Tabs.Screen
                name="account"
                options={{
                    title: "My Account",
                    tabBarLabelStyle: {
                        fontSize: 12,
                        marginBottom: -2,
                    },
                    headerTitleStyle: {
                        fontFamily: 'imprima',
                        fontSize: 30,
                        color: '#E6DBC8',
                        textShadowColor: '#baa582',
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 0.5,
                    },
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons name="account" color={focused ? '#000' : '#848484'} size={32} />
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={signOut}>
                            <Ionicons name="log-out-outline" size={30} color={'#363232'} marginRight={20} />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Tabs>
    );
}

export default TabLayout;
