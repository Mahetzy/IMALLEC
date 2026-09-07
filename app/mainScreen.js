import MapView, { Marker } from 'react-native-maps';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/mainScreen.style';
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { getUser } from '../utils/storage';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useRef } from 'react';
import * as Location from 'expo-location';



export default function LocationWallet() {
    const [menuVisible, setMenuVisible] = useState(false);
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [coordinates, setCoordinates] = useState(null);
    const [followWallet, setFollowWallet] = useState(false);
    const mapRef = useRef(null);

    const [locationPermission, setLocationPermission] = useState(false);

    useEffect(() => {
        const requestLocationPermission = async () => {
            const { status } =
                await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    'Location permission',
                    'Location permission is required to show your position.'
                );
                return;
            }

            setLocationPermission(true);
        };

        requestLocationPermission();
    }, []);

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

    useEffect(() => {
        if (!user?.walletId) {
            return;
        }

        const walletRef = doc(db, "Billeteras", user.walletId);

        const unsubscribe = onSnapshot(walletRef, (walletSnap) => {
            if (!walletSnap.exists()) {
                return;
            }

            const walletData = walletSnap.data();
            const location = walletData.location;

            if (!Array.isArray(location) || location.length < 2) {
                return;
            }

            const latitude = Number(location[0]);
            const longitude = Number(location[1]);

            if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
                return;
            }

            setCoordinates({ latitude, longitude });
        });

        return unsubscribe;
    }, [user]);

    useEffect(() => {
        if (!followWallet || !coordinates) {
            return;
        }

        mapRef.current?.animateToRegion(
            {
                ...coordinates,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
            },
            500
        );
    }, [coordinates, followWallet]);


    return (
        <View style={styles.container}>

            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 13.6929,
                    longitude: -89.2182,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                }}
                showsUserLocation={locationPermission}
                showsMyLocationButton={locationPermission}
                onPanDrag={() => setFollowWallet(false)}

            >

                {coordinates && (
                    <Marker
                        coordinate={coordinates}
                        title="Wallet Location"
                    />
                )}
            </MapView>

            <View style={styles.topBar}>
                <TouchableOpacity
                    style={styles.menuButton}
                    onPress={() => setMenuVisible(true)}
                >
                    <Ionicons name="menu" size={28} color="white" />
                </TouchableOpacity>

                <Text style={styles.logoText}>
                    IMALLEC
                </Text>
            </View>

            <View style={styles.walletCard}>
                <Text style={styles.walletText}>
                    Billetera:{' '}
                    <Text style={styles.greenText}>
                        ●
                    </Text>{' '}
                    Cerca
                </Text>

                <Text style={styles.distanceText}>
                    Aprox. 100 m
                </Text>
            </View>

            <TouchableOpacity
                style={styles.locationButton}
                onPress={() => {
                    setFollowWallet(true);

                    if (coordinates) {
                        mapRef.current?.animateToRegion(
                            {
                                ...coordinates,
                                latitudeDelta: 0.03,
                                longitudeDelta: 0.03,
                            },
                            500
                        );
                    }
                }}
            >
                <Ionicons name="locate" size={27} color="white" />
            </TouchableOpacity>

            <View style={styles.addressCard}>
                <View style={styles.addressRow}>
                    <Ionicons
                        name="location-outline"
                        size={18}
                        color="white"
                    />

                    <Text style={styles.addressTitle}>
                        Dirección aproximada
                    </Text>
                </View>

                <Text style={styles.addressText}>
                    Carretera Panamericana a Colón,
                    La Libertad, El Salvador
                </Text>
            </View>

            <TouchableOpacity style={styles.lockButton}>
                <Ionicons
                    name="lock-closed"
                    size={25}
                    color="white"
                    onPress={() => router.push('/blockWallet')}
                />
            </TouchableOpacity>

            {menuVisible && (
                <View style={styles.menuOverlay}>

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setMenuVisible(false)}
                    >
                        <Ionicons
                            name="close"
                            size={32}
                            color="#102A43"
                        />
                    </TouchableOpacity>

                    <Text style={styles.menuTitle}>
                        Menú
                    </Text>


                    <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/GuideRecomendation')}>
                        <Ionicons
                            name="book"
                            size={22}
                            color="white"
                        />
                        <Text style={styles.menuItemText}>
                            Guide and Recommendations
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons
                            name="settings"
                            size={22}
                            color="white"
                        />
                        <Text style={styles.menuItemText}>
                            Configuration
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/termsAndConditions')}>
                        <Ionicons
                            name="document-text"
                            size={22}
                            color="white"
                        />
                        <Text style={styles.menuItemText}>
                            Terms and Conditions
                        </Text>

                    </TouchableOpacity>

                </View>
            )}

        </View>
    );
}