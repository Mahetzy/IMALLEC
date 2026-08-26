import { Text, View, Image, TextInput, Pressable, Alert, StyleSheet, } from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { styles } from "../Styles/walletActivation.style";
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
                    size={35}
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
                    size={35}
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
                    size={35}
                    color="#A0A0A0"
                    style={styles.icon}
                />

                <Text style={styles.buttonText}>
                    Pattern
                </Text>
            </Pressable>


            <Pressable
                style={{
                    backgroundColor: '#ffffff',
                    borderRadius: 75,
                    paddingVertical: 26,
                    alignItems: 'center',
                    marginTop: 30,
                    marginRight: 70,
                    marginLeft: 70,
                }}
                onPress={save}
            >
                <Text style={{ color: '#00162F', fontSize: 26,  }}>
                    Save
                </Text>
            </Pressable>

        </View>
    );
}