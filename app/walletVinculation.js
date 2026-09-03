import { useState } from 'react';
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
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config.js";
import { getUser, saveWallet } from "../utils/storage.js"

export default function WalletVinculation() {
    const router = useRouter();

    const [walletId, setWalletId] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
            const loadUser = async () => {
                try {
                    const savedUser = await getUser();
                    setUser(savedUser);
                } catch (error) {
                    console.error("Error loading user:", error);
                }
            };
    
            loadUser();
        }, []);

    const handleLinkWallet = async () => {
        if (!walletId) {
            Alert.alert("Error", "Please enter a wallet ID");
            return;
        }

        try {
            const userRef = doc(db, "Usuarios", user.uid);
            const walletRef = doc(db, "Billeteras", walletId);

            await updateDoc(userRef, { 
                walletId: walletId,
            });
            await updateDoc(walletRef, { 
                userId: user.uid,
                walletLinked: true,
            });

            const walletSnap = await getDoc(walletRef);
            const walletData = walletSnap.exists() ? walletSnap.data() : null;
            await saveWallet(walletData);

            Alert.alert("Success", "Wallet linked successfully");
        } catch (error) {
            console.error("Error linking wallet:", error);
        }

        router.push('/walletActivation');
    }
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
                Enter your wallet ID to link it.
            </Text>

            <View style={styles.form}>

                <Text style={styles.label}>
                    Wallet ID
                </Text>

                <View style={styles.inputContainer}>

                    <TextInput
                        style={styles.input}
                        placeholder="Enter your linking token"
                        placeholderTextColor="#999999"
                        value={walletId}
                        onChangeText={setWalletId}
                    />
                </View>

                <Pressable
                    style={styles.button}
                    onPress={handleLinkWallet}
                >

                    <Text style={styles.buttonText}>
                        Link Wallet
                    </Text>

                </Pressable>

            </View>

        </SafeAreaView>
    );
}