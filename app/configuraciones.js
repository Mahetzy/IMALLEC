import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    Pressable,
    Alert,
    useWindowDimensions
} from "react-native";

import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "../Styles/configuraciones.style";
import { getUser, removeUser } from "../utils/storage";

export default function Settings() {
    const { width: windowWidth } = useWindowDimensions();
    const isLargeScreen = windowWidth > 768;
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const savedUser = await getUser();
            setUser(savedUser);
        } catch (error) {
            console.error("Error loading user:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerificationMethod = () => {
        router.push("/verificationMethod");
    };

    const handleNotifications = () => {
        router.push("/notifications");
    };

    const handleLogout = () => {
        Alert.alert(
            "Cerrar sesión",
            "¿Deseas cerrar sesión?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Aceptar",
                    onPress: async () => {
                        try {
                            await removeUser();

                            router.replace("/logIn");
                        } catch (error) {
                            console.error(
                                "Error al cerrar sesión:",
                                error
                            );

                            Alert.alert(
                                "Error",
                                "No fue posible cerrar sesión"
                            );
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={[styles.title, { fontSize: isLargeScreen? 85 : 50 }]}>
                Configuración
            </Text>

            <Image
                source={require("../assets/settings.png")}
                style={styles.image}
            />




            <View style={styles.optionsContainer}>

                <Pressable
                    style={[styles.optionButton, { height: isLargeScreen? '20%' : '20%'  }]}
                    onPress={handleVerificationMethod}
                >
                    <MaterialIcons
                        name="lock"
                        size={30}
                        color="#001B44"
                    />

                    <Text style={styles.optionText}>
                        Método de verificación
                    </Text>

                </Pressable>

                <Pressable
                    style={[styles.optionButton, { height: isLargeScreen? '20%' : '20%'  }]}
                    onPress={handleNotifications}
                >
                    <MaterialIcons
                        name="notifications-none"
                        size={30}
                        color="#001B44"
                    />

                    <Text style={styles.optionText}>
                        Notificaciones
                    </Text>

                </Pressable>

            </View>

            <Pressable
                style={[styles.logoutButton , { height: isLargeScreen? '10%' : '6%' , width: isLargeScreen? '50%' : '50%' , marginTop: isLargeScreen? '-33%' : '-48%' ,  }]}
                onPress={handleLogout}
            >
                <Text style={[styles.logoutText, { fontSize: isLargeScreen? 40 : 20 }]}>
                    Cerrar sesión
                </Text>
            </Pressable>

        </SafeAreaView>
    );
}