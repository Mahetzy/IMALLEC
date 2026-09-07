import { Text, View, Image, TextInput, Pressable, Alert, StyleSheet, useWindowDimensions } from "react-native";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { styles } from "../Styles/confirmacionBloqueo.style";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Welcome() {
    const router = useRouter();
    const { width: windowWidth } = useWindowDimensions();
    const isLargeScreen = windowWidth > 768;


    const circleRadius = 100;

    return (
        <View style={styles.mainContainer}>
            <View style={[styles.walletCard, { height: isLargeScreen ? '90%' : '80%' }]}>
                <Ionicons
                    name="warning-outline"
                    size={isLargeScreen ? 300 : 200 }
                    color="#000000"
                    style={[styles.icon, { marginLeft: isLargeScreen ? '30%' : '25%' }]}
                />
                <Text style={[styles.title,{fontSize: isLargeScreen ? 60 : 20 }]}>
                    Are you sure you want to lock the wallet?
                </Text>
                <Text style={[styles.subtitle, {fontSize: isLargeScreen ? 30 : 15 }]}>
                    This action will lock your wallet and you won’t be able to use it until you unlock it
                </Text>

                <Pressable
                    style={{
                        backgroundColor: "#003673",
                        paddingVertical: 45,
                        paddingHorizontal: 33,
                        borderRadius: 15,
                        margin: 10,
                        width: "38%",
                        height: "22%",
                        marginTop: isLargeScreen? 100: 30
                        
                        
                    }}
                >
                    <Text style={{ color: "white", fontSize: isLargeScreen? 60: 20, fontWeight: "bold", paddingHorizontal: isLargeScreen?  65: 20, }} onPress={() => router.push('/mainScreen')}>
                        No
                    </Text>
                </Pressable>

                <Pressable

                    style={{
                        backgroundColor: "#000000",
                        paddingVertical: 45,
                        paddingHorizontal: 33,
                        borderRadius: 15,
                        margin: 10,
                        width: "38%",
                        height: "22%",
                        marginLeft: "60%",
                        marginTop: isLargeScreen? -220: -130,
                    }}
                >
                    <Text style={{ color: "white", fontSize: isLargeScreen? 60: 20, fontWeight: "bold", paddingHorizontal: isLargeScreen?  60: 20, paddingVertical: isLargeScreen?  20: 4, }} onPress={() => router.push('/mainScreen')}>
                        Yes
                    </Text>
                </Pressable>
            </View>
        </View>

    );
};