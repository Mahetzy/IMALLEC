import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView
} from 'react-native';
import { styles } from '../Styles/forgotPassword.style';

export default function WalletVinculation() {
    return (
        <SafeAreaView style={styles.container}>

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

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>
                        Link Wallet
                    </Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    );
}