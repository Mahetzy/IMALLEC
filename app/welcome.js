import { Text, View, Image, Pressable, Alert, StyleSheet, useWindowDimensions } from "react-native";
import { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { styles } from "../Styles/welcome.style";
import Svg, { Circle, Path } from 'react-native-svg';
import { useRouter } from "expo-router";
import {
    GoogleAuthProvider,
    OAuthProvider
} from "firebase/auth";
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { SafeAreaView } from "react-native-safe-area-context";
import MicrosoftLoginModal from '../components/MicrosoftLoginModal';
import { signInWithCredential } from 'firebase/auth';



export default function Welcome() {
    const [msModalVisible, setMsModalVisible] = useState(false);
    const router = useRouter();

    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const isLargeScreen = windowWidth > 768;

    const circleRadius = 80;
    const redirectUri = AuthSession.makeRedirectUri({
        scheme: 'imallec',
        path: 'oauth',

    });

    // Google Auth Request Hook
    const [googleRequest, googleResponse, promptGoogleAsync] = AuthSession.useAuthRequest({
        clientId: '1063562321548-ei150lit2qufolddt11n5ldc9u19n4bn.apps.googleusercontent.com',
        redirectUri,
        scopes: ['profile', 'email'],
    }, {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
    });



    // Manejar respuesta de Google
    useEffect(() => {
        if (googleResponse?.type === 'success') {
            const { id_token, access_token } = googleResponse.params;
            const credential = GoogleAuthProvider.credential(id_token, access_token);

            signInWithCredential(auth, credential)
                .then(async (result) => {
                    const user = result.user;
                    console.log("Google Auth OK. UID:", user.uid);
                    try {
                        await setDoc(doc(db, "Usuarios", user.uid), {
                            uid: user.uid,
                            name: user.displayName || "Sin nombre",
                            email: user.email || "",
                            photoURL: user.photoURL || "",
                            createdAt: new Date().toISOString()
                        }, { merge: true });
                        console.log("¡Guardado en Usuarios exitoso!");
                        router.replace('/mainScreen');
                    } catch (firestoreError) {
                        console.error("Error Firestore Google:", firestoreError);
                        Alert.alert("Error Firestore (Google)", firestoreError.message);
                    }
                })
                .catch((error) => {
                    console.error("Error Auth Google:", error);
                    Alert.alert("Error Auth (Google)", error.message);
                });
        }
    }, [googleResponse]);

    const handleMsSuccess = async ({ access_token, id_token, rawNonce }) => {
        setMsModalVisible(false);
        try {
            const provider = new OAuthProvider('microsoft.com');
            const credential = provider.credential({
                idToken: id_token,
                rawNonce: rawNonce,

            });

            const result = await signInWithCredential(auth, credential);
            const user = result.user;
            console.log("Microsoft Auth OK. UID:", user.uid);

            await setDoc(doc(db, "Usuarios", user.uid), {
                uid: user.uid,
                name: user.displayName || "Sin nombre",
                email: user.email || "",
                photoURL: user.photoURL || "",
                createdAt: new Date().toISOString()
            }, { merge: true });

            router.replace('/mainScreen');
        } catch (error) {
            console.error("Error procesando Microsoft Auth:", error);
            Alert.alert("Error de inicio de sesión", error.message);
        }
    };

    const handleMsCancel = (msg) => {
        setMsModalVisible(false);
        if (msg) Alert.alert("Aviso", msg);
    };

    return (
        <SafeAreaView style={[styles.mainContainer, { height: windowHeight }]}>
            <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: isLargeScreen ? '55%' : '57%', width: isLargeScreen ? '100%' : '100%' }} pointerEvents="none">
                <Svg height="700" width="150%" viewBox="30 0 550 200" preserveAspectRatio="none" >
                    <Path
                        d="M -200,200 L 50,90 Q 330,0 560,200 L 50,200 Z"
                        fill="#003673"
                        opacity="1"
                    />
                </Svg>
            </View>
            <View style={[
                styles.cardContainer,
                {
                    width: isLargeScreen ? '100%' : '75%',
                    maxWidth: 820,
                    maxHeight: 1200,
                    flex: 1,
                    justifyContent: 'space-evenly',
                    alignSelf: 'center',
                    paddingVertical: 50
                }
            ]}>

                <View style={[styles.svgContainer, { height: isLargeScreen ? 250 : 130 }]}>
                    <Svg width={windowWidth * 0.5} height={circleRadius * 2} marginBottom={isLargeScreen ? 40 : 10} >
                        <Circle
                            cx={(windowWidth * 0.5) / 2}
                            cy={circleRadius}
                            r={circleRadius}
                            fill="#003673"
                        />
                        <Image
                            source={require("../assets/walletLogo.png")}
                            style={{
                                position: "absolute", top: circleRadius - 40, left: ((windowWidth * 0.5) / 2) - 65, resizeMode: "contain", width: 130, height: 80,
                            }}
                        />
                    </Svg>
                </View>

                <Image
                    source={require("../assets/IMALLEC.png.png")}
                    style={[styles.logo, { height: isLargeScreen ? 250 : 150, marginBottom: isLargeScreen ? -10 : 20, marginTop: isLargeScreen ? -10 : 10 }]}
                />

                <Text style={[styles.subtitleText, { fontSize: isLargeScreen ? 35 : 20, marginBottom: isLargeScreen ? 50 : 20 }]}>
                    Your wallet, always safe!
                </Text>

                <Pressable
                    style={[
                        styles.primaryButton,
                        { height: isLargeScreen ? 70 : 50, marginBottom: isLargeScreen ? 30 : 10, marginTop: isLargeScreen ? -30 : 10 }
                    ]}
                    onPress={() => router.push('/signUp')}
                >
                    <Text style={[styles.buttonText, { fontSize: isLargeScreen ? 25 : 18 }]}>
                        Sign Up
                    </Text>
                </Pressable>

                <Pressable
                    style={[
                        styles.secondaryButton,
                        { height: isLargeScreen ? 70 : 50, marginBottom: isLargeScreen ? 30 : 10 }
                    ]}
                    onPress={() => router.push('/logIn')}
                >
                    <Text style={[styles.buttonText, { fontSize: isLargeScreen ? 25 : 18 }]}>
                        Log In
                    </Text>
                </Pressable>

                <Text style={[styles.dividerText, { fontSize: isLargeScreen ? 35 : 14 }]}>
                    ---------------- or continue with ----------------
                </Text>

                <View style={styles.socialContainer}>
                    <Pressable
                        style={[styles.socialButton, { height: isLargeScreen ? 100 : 60, width: isLargeScreen ? 100 : 60, borderRadius: isLargeScreen ? 100 : 30 }]}
                        onPress={() => setMsModalVisible(true)}
                    >

                        <Image
                            source={require("../assets/Microsoft_Logo.png")}
                            style={[styles.logoM, { height: isLargeScreen ? 50 : 30, width: isLargeScreen ? 50 : 30 }]}
                        />
                    </Pressable>

                    <Pressable
                        style={[styles.socialButton, { opacity: googleRequest ? 1 : 0.5, height: isLargeScreen ? 100 : 60, width: isLargeScreen ? 100 : 60, borderRadius: isLargeScreen ? 100 : 30, }]}
                        onPress={async () => {
                            if (!googleRequest) {
                                Alert.alert("Aviso", "El request de Google todavía no está listo.");
                                return;
                            }
                            try {
                                await promptGoogleAsync();
                            } catch (error) {
                                Alert.alert("Error", error.message);
                            }
                        }}
                    >
                        <Image
                            source={require("../assets/GoogleLogo.png")}
                            style={[styles.logoG, { height: isLargeScreen ? 50 : 30, width: isLargeScreen ? 50 : 30 }]}
                        />
                    </Pressable>
                    <MicrosoftLoginModal
                        visible={msModalVisible}
                        onSuccess={handleMsSuccess}
                        onCancel={handleMsCancel}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}