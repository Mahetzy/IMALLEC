import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Pressable
} from 'react-native';
import { styles } from '../Styles/walletVinculation.style.js';
import { useRouter } from "expo-router";

export default function WalletVinculation() {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require("../assets/IMALLEC.png.png")}
                style={styles.logo}
            />

            <Text style={styles.title}>
                Wallet Vinculation
            </Text>

            <Image
                source={require('../assets/WalletVinculation.png')}
                style={styles.image}
            />

            <Text style={styles.description}>
                Enter your wallet code or token to link it.
            </Text>

            <View style={styles.form}>

                <Text style={styles.label}>
                    Linking Token
                </Text>

                <View style={styles.inputContainer}>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter your linking token"
                        placeholderTextColor="#999999"
                    />

                </View>

                <Pressable
                    style={styles.button}
                    onPress={() => router.push('/walletActivation')}
                >

                    <Text style={styles.buttonText}>
                        Link Wallet
                    </Text>

                </Pressable>

            </View>

        </SafeAreaView>
    );
}