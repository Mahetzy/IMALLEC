import MapView, { Marker } from 'react-native-maps';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
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
    const [userLocation, setUserLocation] = useState(null);

    const [coordinates, setCoordinates] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);
    const [followWallet, setFollowWallet] = useState(false);
    const mapRef = useRef(null);
    const [mapRegion, setMapRegion] = useState({
        latitude: 13.6929,
        longitude: -89.2182,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
    });

    const [remoteness, setRemoteness] = useState(null);
    const [remotenessColor, setRemotenessColor] = useState(null);

    const [showedDistance, setShowedDistance] = useState(0);

    const [locationPermission, setLocationPermission] = useState(false);


    useEffect(() => {
        const requestLocationPermission = async () => {
            const { status: currentStatus } = await Location.getForegroundPermissionsAsync();

            if (currentStatus === 'granted') {
                setLocationPermission(true);
                return;
            }

            const { status } = await Location.requestForegroundPermissionsAsync();

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
        if (!locationPermission) {
            return;
        }

        let subscription;

        const startLocationTracking = async () => {
            try {
                const initialLocation = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });

                setUserLocation(initialLocation);
                setMapRegion({
                    latitude: initialLocation.coords.latitude,
                    longitude: initialLocation.coords.longitude,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                });

                subscription = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.High,
                        timeInterval: 2000,
                        distanceInterval: 10,
                    },
                    (location) => {
                        setUserLocation(location);
                    }
                );
            } catch (error) {
                console.error('Error watching user location:', error);
            }
        };

        startLocationTracking();

        return () => {
            subscription?.remove();
        };
    }, [locationPermission]);

    useEffect(() => {
        if (!userLocation || followWallet) {
            return;
        }

        const nextRegion = {
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
        };

        setMapRegion(nextRegion);
        mapRef.current?.animateToRegion(nextRegion, 500);
    }, [userLocation, followWallet]);

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

    useEffect(() => {
        if (!coordinates) { return; }

        const getAddress = async () => {
            try {
                const result = await Location.reverseGeocodeAsync({
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                });

                if (result && result.length > 0) {
                    const address = result[0];
                    const formatted = address.street && address.streetNumber ? `${address.street} ${address.streetNumber}` : address.street || "Calle no disponible"
                    const city = address.city || "Ciudad no disponible"
                    const region = address.region || "Region no disponible"

                    setWalletAddress(`${formatted}, ${city}, ${region}`);
                } else {
                    setWalletAddress("Direccion no disponible")
                }
            } catch (error) {
                console.error("Error reverse geocode:" + error)
                setWalletAddress("Direccion no disponible")
            };

        };

        getAddress();

    }, [coordinates]);

    useEffect(() => {
        if (!coordinates || !userLocation) {
            return;
        }

        const R = 6371000;
        const userLatitude = userLocation.coords.latitude;
        const userLongitude = userLocation.coords.longitude;
        const walletLatitude = coordinates.latitude;
        const walletLongitude = coordinates.longitude;

        const lat1Rad = userLatitude * (Math.PI / 180);
        const lon1Rad = userLongitude * (Math.PI / 180);
        const lat2Rad = walletLatitude * (Math.PI / 180);
        const lon2Rad = walletLongitude * (Math.PI / 180);

        const deltaLat = lat2Rad - lat1Rad;
        const deltaLon = lon2Rad - lon1Rad;

        const a =
            Math.sin(deltaLat / 2) ** 2 +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const calculatedDistance = R * c;

        if (calculatedDistance <= 500) {
            setRemoteness('Cerca');
            setRemotenessColor('#37D35B');
        } else if (calculatedDistance <= 3000) {
            setRemoteness('Lejos');
            setRemotenessColor('#FFA500');
        } else {
            setRemoteness('Muy Lejos');
            setRemotenessColor('#FF0000');
        }

        if (calculatedDistance < 1000) {
            setShowedDistance(calculatedDistance.toFixed(2) + ' m');
        } else {
            setShowedDistance((calculatedDistance / 1000).toFixed(1) + ' km');
        }
    }, [coordinates, userLocation]);


    return (
        <View style={styles.container}>

            <MapView
                ref={mapRef}
                style={styles.map}
                region={mapRegion}
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
                    <Text style={[{ color: remotenessColor }, { fontSize: 14 }]}>
                        ●
                    </Text>{' '}
                    <Text>
                        {remoteness}
                    </Text>
                </Text>

                <Text style={styles.distanceText}>
                    {showedDistance}
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
                    {walletAddress}
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

                    <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/configuraciones')}>
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