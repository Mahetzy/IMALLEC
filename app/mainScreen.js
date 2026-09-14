import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/mainScreen.style';
import { useRouter } from "expo-router";
import { useEffect, useState, useRef, useMemo } from 'react';
import { getUser } from '../utils/storage';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import * as Location from 'expo-location';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DEFAULT_LAT = 13.6929;
const DEFAULT_LNG = -89.2182;

export default function LocationWallet() {
    const [menuVisible, setMenuVisible] = useState(false);
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [coordinates, setCoordinates] = useState(null); // ubicación de la billetera
    const [myLocation, setMyLocation] = useState(null);   // mi ubicación (GPS)
    const [followWallet, setFollowWallet] = useState(false);
    const [locationPermission, setLocationPermission] = useState(false);
    const [mapReady, setMapReady] = useState(false);
    const insets = useSafeAreaInsets();
    const [showedDistance, setShowedDistance] = useState(0);
    const [userLocation, setUserLocation] = useState(null);

    const webviewRef = useRef(null);
    const locationSubscription = useRef(null);

    const [remoteness, setRemoteness] = useState(null);
    const [remotenessColor, setRemotenessColor] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);
    const hasCenteredOnUser = useRef(false);

    const mapRef = useRef(null);
    const [mapRegion, setMapRegion] = useState({
        latitude: 13.6929,
        longitude: -89.2182,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
    });
    useEffect(() => {
    if (!mapReady || !myLocation || hasCenteredOnUser.current) {
        return;
    }
    hasCenteredOnUser.current = true;

    webviewRef.current?.injectJavaScript(`
        window.flyTo(${myLocation.latitude}, ${myLocation.longitude});
        true;
    `);
}, [mapReady, myLocation]);


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
        if (!locationPermission) {
            return;
        }

        const startWatching = async () => {
            locationSubscription.current = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 3000,
                    distanceInterval: 5,
                },
                (location) => {
                    const { latitude, longitude } = location.coords;
                    setMyLocation({ latitude, longitude });
                }
            );
        };

        startWatching();

        return () => {
            locationSubscription.current?.remove();
        };
    }, [locationPermission]);

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
        }, (error) => {
            console.error('Error en onSnapshot:', error);
        });

        return unsubscribe;
    }, [user]);

    useEffect(() => {
        if (!mapReady || !coordinates) {
            return;
        }

        webviewRef.current?.injectJavaScript(`
            window.updateWalletMarker(${coordinates.latitude}, ${coordinates.longitude});
            true;
        `);
    }, [coordinates, mapReady]);

    useEffect(() => {
        if (!mapReady || !myLocation) {
            return;
        }

        webviewRef.current?.injectJavaScript(`
            window.updateMyLocationMarker(${myLocation.latitude}, ${myLocation.longitude});
            true;
        `);
    }, [myLocation, mapReady]);


    useEffect(() => {
        if (!followWallet || !coordinates || !mapReady) {
            return;
        }

        webviewRef.current?.injectJavaScript(`
            window.flyTo(${coordinates.latitude}, ${coordinates.longitude});
            true;
        `);
    }, [coordinates, followWallet, mapReady]);

    const handleWebViewMessage = (event) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);

            if (data.type === 'MAP_DRAGGED') {
                setFollowWallet(false);
            }

            if (data.type === 'MAP_READY') {
                setMapReady(true);
            }
        } catch (error) {
            console.error('Error parsing WebView message:', error);
        }
    };

    const handleCenterPress = () => {
        setFollowWallet(true);

        if (coordinates) {
            webviewRef.current?.injectJavaScript(`
                window.flyTo(${coordinates.latitude}, ${coordinates.longitude});
                true;
            `);
        }
    };

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
                    const formatted = address.street && address.streetNumber ? `${address.street} ${address.streetNumber}` : address.street || "Street not available"
                    const city = address.city || "City not available"
                    const region = address.region || "Region not available"

                    setWalletAddress(`${formatted}, ${city}, ${region}`);
                } else {
                    setWalletAddress("Address not available")
                }
            } catch (error) {
                console.error("Error reverse geocode:" + error)
                setWalletAddress("Address not available")
            };

        };

        getAddress();

    }, [coordinates]);
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
            setRemoteness('Near');
            setRemotenessColor('#37D35B');
        } else if (calculatedDistance <= 3000) {
            setRemoteness('Far');
            setRemotenessColor('#FFA500');
        } else {
            setRemoteness('Very Far');
            setRemotenessColor('#FF0000');
        }

        if (calculatedDistance < 1000) {
            setShowedDistance(calculatedDistance.toFixed(2) + ' m');
        } else {
            setShowedDistance((calculatedDistance / 1000).toFixed(1) + ' km');
        }
    }, [coordinates, userLocation]);

    const leafletHTML = useMemo(() => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
  <style>
    html, body, #map { height: 100%; width: 100%; margin: 0; padding: 0; }

    .wallet-icon {
      background-color: #061B2D;
      border: 3px solid white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      box-shadow: 0 0 4px rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .my-location-icon {
      background-color: #2A7FFF;
      border: 3px solid white;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      box-shadow: 0 0 4px rgba(0,0,0,0.5);
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script>
    const map = L.map('map', { zoomControl: false }).setView([${DEFAULT_LAT}, ${DEFAULT_LNG}], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    const walletIcon = L.divIcon({
      className: 'wallet-icon',
      html: \`
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 7H3a1 1 0 00-1 1v10a2 2 0 002 2h16a2 2 0 002-2V8a1 1 0 00-1-1z" stroke="white" stroke-width="2"/>
          <path d="M16 13a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" fill="white"/>
          <path d="M2 8l1.5-3A2 2 0 015.3 4h9.4a2 2 0 011.8 1l1.5 3" stroke="white" stroke-width="2" fill="none"/>
        </svg>
      \`,
      iconSize: [20, 20],
    });

    const myLocationIcon = L.divIcon({ className: 'my-location-icon', iconSize: [18, 18] });

    let walletMarker = null;
    let myLocationMarker = null;

    window.updateWalletMarker = function(lat, lng) {
      if (!walletMarker) {
        walletMarker = L.marker([lat, lng], { icon: walletIcon }).addTo(map);
      } else {
        walletMarker.setLatLng([lat, lng]);
      }
    };

    window.updateMyLocationMarker = function(lat, lng) {
      if (!myLocationMarker) {
        myLocationMarker = L.marker([lat, lng], { icon: myLocationIcon }).addTo(map);
      } else {
        myLocationMarker.setLatLng([lat, lng]);
      }
    };

    window.flyTo = function(lat, lng) {
      map.flyTo([lat, lng], map.getZoom(), { duration: 0.5 });
    };

    map.on('dragstart', function() {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'MAP_DRAGGED' }));
    });

    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'MAP_READY' }));
  </script>
</body>
</html>
    `, []);

    return (
        <View style={styles.container}>

            <WebView
                ref={webviewRef}
                style={styles.map}
                source={{ html: leafletHTML }}
                onMessage={handleWebViewMessage}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                originWhitelist={['*']}
            />

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
                    Wallet:{' '}
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
                style={[styles.locationButton, { bottom: 70 + insets.bottom }]}
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

            <View style={[styles.addressCard, { bottom: 8 + insets.bottom }]}>
                <View style={styles.addressRow}>
                    <Ionicons
                        name="location-outline"
                        size={18}
                        color="white"
                    />

                    <Text style={styles.addressTitle}>
                       Approximate address
                    </Text>
                </View>

                <Text style={styles.addressText}>
                    {walletAddress}
                </Text>
            </View>

            <TouchableOpacity style={[styles.lockButton, { bottom: 138 + insets.bottom }]}>
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

                    <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings')}>
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