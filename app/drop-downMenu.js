import React from 'react';
import { View,Text, TouchableOpacity, StyleSheet } from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/linkCheck.style';

const LockScreen = () => (
    <View style = {styles.center}><Text>Lock Configuration</Text></View>
);
const GuideScreen = () => (
    <View style = {styles.center}><Text>Guide and Recommendations</Text></View>
);
const ConfigScreen = () => (
    <View style = {styles.center}><Text>Configuration</Text></View>
);
const TermsScreen = () => (
    <View style = {styles.center}><Text>Term and Conditions</Text></View>
);

const CustumDrawerContent = (props) => {
    const { navigation } = props;

    return (
        <DrawerContentScrollView {...props} style = {styles.drawerContainer}>
            <TouchableOpacity
            style = {styles.closeButton}
            onPress = {() => navigation.closeDrawer()}
            >
                <Ionicons name = "close" size = {28} color = "#000" />
            </TouchableOpacity>

            <TouchableOpacity
            style = {styles.menuItem}
            onPress = {() => navigation.naviate('Lock configuration')}
            >
                <Ionicons name = "lock-outline" size = {20} color = "#FFF" style = {styles.icon} />
                <Text style = {styles.menuText}>Lock configuration</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style = {styles.menuItem}
            onPress = {() => navigation.naviate('Guide')}
            >
                <Ionicons name = "book-outline" size = {20} color = "#FFF" style = {styles.icon} />
                <Text style = {styles.menuText}>Guide and Recommendations</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style = {styles.menuItem}
            onPress = {() => navigation.naviate('Configuration')}
            >
                <Ionicons name = "settings-outline" size = {20} color = "#FFF" style = {styles.icon} />
                <Text style = {styles.menuText}>Configuration</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style = {styles.menuItem}
            onPress = {() => navigation.naviate(Terms)}
            >
                <Ionicons name = "document-text-outline" size = {20} color = "#FFF" style = {styles.icon} />
                <Text style = {styles.menuText}>Terms and Conditions</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
};

const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
            drawerContent = {(props) => <CustumDrawerContent{...props} />}
            screenOptions = {{
                drawerStyle: {width: '80%', backgroundColor: '#FFF'},
                headerShown: true,
            }}
            >
                <Drawer.Screen name = "Lock Configuration" component = {LockScreen} />
                <Drawer.Screen name = "Guide" component = {GuideScreen} />
                <Drawer.Screen name = "Configuration" component = {ConfigScreen} />
                <Drawer.Screen name = "Terms" component = {TermsScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

