import { Text, View, Image, TextInput, Pressable, Alert, StyleSheet, } from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { styles } from "../Styles/logIn.style";
import Svg, { Path } from 'react-native-svg';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Security() {

    const [selected, setSelected] = useState(null);
    const router = useRouter();

    const save = () => {

        if (selected === null) {
            Alert.alert("Error", "Select a security option");
            return;
        }

        if (selected === "pin") {
            Alert.alert("Security", "You have selected PIN code");
        }

        else if (selected === "fingerprint") {
            Alert.alert("Security", "You have selected fingerprint");
        }

        else if (selected === "pattern") {
            Alert.alert("Security", "You have selected security pattern");
        }

        router.push('/mainScreen')
    };



    return (
        <View style={styles.container}>

            <View
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
            >
                <Svg
                    height="2700"
                    width="150%"
                    viewBox="-4 -50 60 1050"
                    preserveAspectRatio="none"
                >
                    <Path
                        d="M -1,-100 C 0,350 200,110 -40,510 Z"
                        fill="#00162F"
                        opacity="1"
                    />
                </Svg>
            </View>

            <Image
                source={require("../assets/IMALLEC.png.png")}
                style={styles.logo}
            />

            <Text style={styles.title}>
                ACTIVATE YOUR WALLET SECURITY
            </Text>

        
            <Pressable
                style={[
                    styles.buttonTextSelection,
                    selected === "pin" && styles.selected
                ]}
                onPress={() => setSelected("pin")}
            >
                <Ionicons
                    name="key-outline"
                    size={25}
                    color="#A0A0A0"
                    style={styles.icon}
                />

                <Text style={styles.buttonText}>
                    PIN
                </Text>
            </Pressable>

    
            <Pressable
                style={[
                    styles.buttonTextSelection,
                    selected === "fingerprint" && styles.selected
                ]}
                onPress={() => setSelected("fingerprint")}
            >
                <Ionicons
                    name="finger-print-outline"
                    size={25}
                    color="#A0A0A0"
                    style={styles.icon}
                />

                <Text style={styles.buttonText}>
                    Fingerprint
                </Text>
            </Pressable>

            
            <Pressable
                style={[
                    styles.buttonTextSelection,
                    selected === "pattern" && styles.selected
                ]}
                onPress={() => setSelected("pattern")}
            >
                <Ionicons
                    name="grid-outline"
                    size={25}
                    color="#A0A0A0"
                    style={styles.icon}
                />

                <Text style={styles.buttonText}>
                    Pattern
                </Text>
            </Pressable>

    
            <Pressable
                style={styles.buttonTextSelection}
                onPress={save}
            >
                <Text style={styles.buttonText}>
                    Save
                </Text>
            </Pressable>

        </View>
    );
}