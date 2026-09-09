import { Text, View, Image, Pressable, Alert, useWindowDimensions } from "react-native";
import { useState } from "react";
import { styles } from "../Styles/verificationMethod.style.";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Security() {

    const [selected, setSelected] = useState(null);
    const router = useRouter();
    const { width: windowWidth } = useWindowDimensions();
    const isLargeScreen = windowWidth > 768;

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

        router.push('/configuraciones')
    };



    return (
        <View style={styles.container}>

            <Image
                source={require("../assets/IMALLEC.png.png")}
                style={[styles.logo, {marginLeft: isLargeScreen ? '75%' : '75%' , marginTop: isLargeScreen ? "-5%" : "-10%" }]}
            />

            <Text style={[styles.title, { fontSize: isLargeScreen ? 60 : 30, height: isLargeScreen ? 150 : 100, marginLeft: isLargeScreen ? 45 : 0,}]}>
                VERIFICATION METHOD
            </Text>
            <Text style={[styles.subtitle, {color: "white" , fontSize: isLargeScreen ? 39 : 18, marginTop: isLargeScreen ? 0 : -18, }]}>
                Choose the verification method you prefer.
            </Text>


            <Pressable
                style={[
                    styles.buttonTextSelection,
                    selected === "pin" && styles.selected,{ marginTop: isLargeScreen ? '10%' : '10%' , height: isLargeScreen ? 150 : 80, }
                ]}
                onPress={() => setSelected("pin")}
            >
                <Ionicons
                    name="key-outline"
                    size={35}
                    color="#A0A0A0"
                    style={[styles.icon, { marginTop: isLargeScreen ? '15%' : '15%', height: isLargeScreen ? 140 : 80,  }]}
                />

                <Text style={styles.buttonText}>
                    PIN
                </Text>
            </Pressable>


            <Pressable
                style={[
                    styles.buttonTextSelection,
                    selected === "fingerprint" && styles.selected,{height: isLargeScreen ? 150 : 80, }
                ]}
                onPress={() => setSelected("fingerprint")}
            >
                <Ionicons
                    name="finger-print-outline"
                    size={35}
                    color="#A0A0A0"
                    style={[styles.icon, {marginTop: isLargeScreen ? '15%' : '15%' , height: isLargeScreen ? 140 : 80, }]}
                />

                <Text style={styles.buttonText}>
                    Fingerprint
                </Text>
            </Pressable>


            <Pressable
                style={[
                    styles.buttonTextSelection,
                    selected === "pattern" && styles.selected,{ marginBottom: isLargeScreen ? '10%' : '10%' , height: isLargeScreen ? 150 : 80, }
                ]}
                onPress={() => setSelected("pattern")}
            >
                <Ionicons
                    name="grid-outline"
                    size={35}
                    color="#A0A0A0"
                    style={[styles.icon,{ marginTop: isLargeScreen ? '15%' : '15%' , height: isLargeScreen ? 140 : 80, }]}
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