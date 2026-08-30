import { Text, View, Image, TextInput, Pressable, Alert, StyleSheet, useWindowDimensions } from "react-native";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { styles } from "../Styles/confirmacionBloqueo.style";
import Svg, { Circle, Path } from 'react-native-svg';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Welcome() {
    const router = useRouter();
    const { width } = useWindowDimensions();


    const circleRadius = 100;

    return (
        <View style={styles.mainContainer}>
            <View style={styles.walletCard}>
                <Ionicons
                    name="warning-outline"
                    size={200}
                    color="#000000"
                    style={styles.icon}
                />
                <Text style={styles.title}>
                    Are you sure you want to lock the wallet?
                </Text>;
                <Text style={styles.subtitle}>
                    This action will lock your wallet and you won’t be able to use it until you unlock it
                </Text>;

                <Pressable
                    style={{
                        backgroundColor: "#003673",
                        paddingVertical: 45,
                        paddingHorizontal: 33,
                        borderRadius: 15,
                        margin: 10,
                        width: 140,
                        height: 120,
                        marginTop: 30
                        
                    }}
                >
                    <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", paddingHorizontal: 20 }} onPress={() => router.push('/mainScreen')}>
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
                        height: 120,
                        width: 140,
                        marginLeft: 220,
                        marginTop: -130,
                    }}
                >
                    <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", paddingHorizontal: 20}} onPress={() => router.push('/mainScreen')}>
                        Yes
                    </Text>
                </Pressable>
            </View>
        </View>

    );
};