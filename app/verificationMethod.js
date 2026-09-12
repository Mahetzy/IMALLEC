import { Text, View, Image, Pressable, Alert, useWindowDimensions } from "react-native";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { styles } from "../Styles/walletActivation.style";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getUser } from "../utils/storage.js";
import { useEffect } from "react";

export default function Security() {

    const [selected, setSelected] = useState(null);
    const router = useRouter();
    const { width: windowWidth } = useWindowDimensions();
    const isLargeScreen = windowWidth > 768;
    const isMediunScreen = windowWidth > 600 && windowWidth < 768;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const savedUser = await getUser();
                if (!savedUser || savedUser === null) {
                    router.push('/logIn');
                    return;
                }
                setUser(savedUser);
            } catch (error) {
                console.error("Error loading user:", error);
            }
        };

        loadUser();
    }, []);

    const save = async () => {
        if (!user?.walletId) {
            Alert.alert("Error", "User or wallet information is unavailable");
            return;
        }

        const walletRef = doc(db, "Billeteras", user.walletId);

        try {
            if (!selected || selected === null) {
                Alert.alert("Error", "Select a security option");
                return;
            } else {
                await updateDoc(walletRef, {
                    verificationMethod: selected
                });

                Alert.alert("Security", "You have selected " + selected.charAt(0).toUpperCase() + selected.slice(1) + " as your security method.");
            }

            router.push('/configuraciones')
        } catch (error) {
            console.error("Error updating wallet security:", error);
            Alert.alert("Error", "Could not save your security preference.");
        }
    };

    return (
        <View style={styles.container}>

            <Image
                source={require("../assets/IMALLEC.png.png")}
                style={[styles.logo, { marginLeft: isLargeScreen ? '75%' : '75%' }]}
            />

            <Text style={[styles.title, { fontSize: isLargeScreen ? 55 : isMediunScreen ? 45 : 35, height: isLargeScreen ? 150 : isMediunScreen ? 120 : 100 }]}>
                Verification method
            </Text>
            <Text style={[styles.subtitle, {color: "white" , fontSize: isLargeScreen ? 39 : isMediunScreen ? 28 : 16, marginTop: isLargeScreen ? -20 : isMediunScreen ? -55 : -18 }]}>
                Choose the verification method you prefer.
            </Text>


            <Pressable
                style={[
                    styles.buttonTextSelection,
                    selected === "pin" && styles.selected, { marginTop: isLargeScreen ? '10%' : isMediunScreen ? "10%" : "10%", height: isLargeScreen ? 150 : isMediunScreen ? 110 : 80, }
                ]}
                onPress={() => setSelected("pin")}
            >
                <Ionicons
                    name="key-outline"
                    size={35}
                    color="#A0A0A0"
                    style={[styles.icon, { marginTop: isLargeScreen ? '15%' : isMediunScreen ? "15%" : "15%", height: isLargeScreen ? 140 : isMediunScreen ? 110 : 80, }]}
                />

                <Text style={styles.buttonText}>
                    PIN
                </Text>
            </Pressable>


            <Pressable
                style={[
                    styles.buttonTextSelection,
                    selected === "fingerprint" && styles.selected, { height: isLargeScreen ? 150 : isMediunScreen ? 110 : 80, }
                ]}
                onPress={() => setSelected("fingerprint")}
            >
                <Ionicons
                    name="finger-print-outline"
                    size={35}
                    color="#A0A0A0"
                    style={[styles.icon, { marginTop: isLargeScreen ? '15%' : isMediunScreen ? "15%" : "15%", height: isLargeScreen ? 140 : isMediunScreen ? 110 : 80, }]}
                />

                <Text style={styles.buttonText}>
                    Fingerprint
                </Text>
            </Pressable>


            <Pressable
                style={[
                    styles.buttonTextSelection,
                    selected === "pattern" && styles.selected, { marginBottom: isLargeScreen ? '10%' : isMediunScreen ? "5%" : "10%", height: isLargeScreen ? 150 : isMediunScreen ? 110 : 80, }
                ]}
                onPress={() => setSelected("pattern")}
            >
                <Ionicons
                    name="grid-outline"
                    size={35}
                    color="#A0A0A0"
                    style={[styles.icon, { marginTop: isLargeScreen ? '15%' : isMediunScreen ? "15%" : "15%", height: isLargeScreen ? 140 : isMediunScreen ? 110 : 80, }]}
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
                <Text style={{ color: '#00162F', fontSize: 26, }}>
                    Save
                </Text>
            </Pressable>

        </View>
    );
}