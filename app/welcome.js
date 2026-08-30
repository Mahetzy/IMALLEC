import { Text, View, Image, TextInput, Pressable, Alert, StyleSheet, useWindowDimensions } from "react-native";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { styles } from "../Styles/welcome.style";
import Svg, { Circle, Path } from 'react-native-svg';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Welcome() {
    const router = useRouter();
    const { width } = useWindowDimensions();


    const circleRadius = 100;

    return (
        <View style={styles.mainContainer}>
            <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} pointerEvents="none">
                <Svg height="400" width="150%" viewBox="30 0 550 200" preserveAspectRatio="none">
                    <Path
                        d="M -200,200 L 50,90 Q 330,0 560,200 L 50,200 Z"
                        fill="#003673"
                        opacity="1"
                    />
                </Svg>
            </View>
            <Svg width={width} height={circleRadius * 2}>
                <Circle
                    cx={width / 2}
                    cy={circleRadius}
                    r={circleRadius}
                    fill="#003673"
                />
                <Image
                    source={require("../assets/walletLogo.png")}
                    style={{
                        position: "relative",
                        top: circleRadius - 50,
                        left: width / 2 - 87.5,
                        resizeMode: "contain",
                        width: 175,
                        height: 100,
                    }}
                />
            </Svg>

            {/* Hey Bonilla! Desde aqui son en su mayoria estilos placeholder, los de arriba estan ya mas o menos 
                hechos; crea e importa los finales desde welcome.style.js y cambialos para reemplazar los placeholders.
                PD: Los botones de despues de "continue with" buscale las imagenes tambien */}

            {/* Va yo lo hago :)*/}

            <Image
                source={require("../assets/IMALLEC.png.png")}
                style={styles.logo}
            />

            <Text style={{ color: "white", fontSize: 18 }}>
                Your wallet, always safe!
            </Text>;

            <Pressable
                style={{
                    backgroundColor: "#003673",
                    paddingVertical: 15,
                    paddingHorizontal: 50,
                    borderRadius: 75,
                    margin: 10,
                    width: 300,
                }}
            >
                <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", paddingHorizontal: 60 }} onPress={() => router.push('/signUp')}>
                    Sign Up
                </Text>
            </Pressable>

            <Pressable

                style={{
                    backgroundColor: "#000000",
                    paddingVertical: 15,
                    paddingHorizontal: 50,
                    borderRadius: 75,
                    margin: 10,
                    width: 300,
                }}
            >
                <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", paddingHorizontal: 60 }} onPress={() => router.push('/logIn')}>
                    Log In
                </Text>
            </Pressable>

            <Text style={{ color: "white", fontSize: 18, marginTop: 30 }}>
                --------------- or continue with ---------------
            </Text>

            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
                <Pressable
                    style={{
                        marginRight: 100,
                        marginTop: 70,
                        backgroundColor: "#ffffff",
                        paddingVertical: 20,
                        paddingHorizontal: 0,
                        borderRadius: 210,
                        margin: 10,
                        height: 70,
                        width: 70,
                    }}
                    onPress={() => router.push('/mainScreen')}
                >
                    <Image
                        source={require("../assets/Microsoft_Logo.png")}
                        style={styles.logoM}
                    />
                </Pressable>

                <Pressable
                    style={{
                        marginTop: 70,
                        backgroundColor: "#ffffff",
                        paddingVertical: 20,
                        paddingHorizontal: 0,
                        borderRadius: 210,
                        margin: 10,
                        height: 70,
                        width: 70,
                    }}
                    onPress={() => router.push('/mainScreen')}
                >
                    <Image
                        source={require("../assets/GoogleLogo.png")}
                        style={styles.logoG}
                    />
                    
                </Pressable>
            </View>

        </View>

    );
};