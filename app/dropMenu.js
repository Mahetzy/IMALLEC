import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/dropMenu.style';

const CustomDrawerContent = (props) => {
    return (
        <View style={styles.drawerContainer}>
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => props.navigation.closeDrawer()}
            >
                <Ionicons name="close" size={28} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                    props.navigation.closeDrawer();
                    router.push('/lock-config');
                }}
            >
                <Ionicons name="lock-closed-outline" size={20} color="#FFF" style={styles.icon} />
                <Text style={styles.menuText}>Lock configuration</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                    props.navigation.closeDrawer();
                    router.push('/guide');
                }}
            >
                <Ionicons name="book-outline" size={20} color="#FFF" style={styles.icon} />
                <Text style={styles.menuText}>Guide and Recommendations</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                    props.navigation.closeDrawer();
                    router.push('/configuration');
                }}
            >
                <Ionicons name="settings-outline" size={20} color="#FFF" style={styles.icon} />
                <Text style={styles.menuText}>Configuration</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                    props.navigation.closeDrawer();
                    router.push('/terminosAndConditions');
                }}
            >
                <Ionicons name="document-text-outline" size={20} color="#FFF" style={styles.icon} />
                <Text style={styles.menuText}>Terms and Conditions</Text>
            </TouchableOpacity>
        </View>
    );
};

export default function DropMenuLayout() {
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerStyle: { width: '80%', backgroundColor: '#FFF' },
                drawerPosition: 'left',
                headerShown: true,
            }}
        >
            <Drawer.Screen 
                name="lock-config" 
                options={{ title: 'Lock Configuration' }} 
            />
            <Drawer.Screen 
                name="guide" 
                options={{ title: 'Guide and Recommendations' }} 
            />
            <Drawer.Screen 
                name="configuration" 
                options={{ title: 'Configuration' }} 
            />
            <Drawer.Screen 
                name="terms" 
                options={{ title: 'Terms and Conditions' }} 
            />
        </Drawer>
    );
}