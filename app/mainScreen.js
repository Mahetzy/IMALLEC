import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/mainScreen.style';
import { useRouter } from "expo-router";

export default function LocationWallet() {
    const [menuVisible, setMenuVisible] = useState(false);
    const router = useRouter();


    return (
        <View style={styles.container}>

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 13.6929,
                    longitude: -89.2182,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: 13.6929,
                        longitude: -89.2182,
                    }}
                    title="Billetera"
                />

                <Marker
                    coordinate={{
                        latitude: 13.6965,
                        longitude: -89.2155,
                    }}
                />

                <Marker
                    coordinate={{
                        latitude: 13.6895,
                        longitude: -89.2210,
                    }}
                />
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

            <View style={styles.mapMarker}>
                <Ionicons
                    name="wallet"
                    size={25}
                    color="#102A43"
                />
            </View>

            <TouchableOpacity style={styles.locationButton}>
                <Ionicons
                    name="locate"
                    size={27}
                    color="white"
                />
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
                    onPress={() => router.push('/confirmacionBloqueo')}
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

                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons
                            name="home"
                            size={22}
                            color="white"
                        />
                        <Text style={styles.menuItemText}>
                            Home
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons
                            name="book"
                            size={22}
                            color="white"
                        />
                        <Text style={styles.menuItemText}>
                            Guía y{"\n"}recomendaciones
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons
                            name="settings"
                            size={22}
                            color="white"
                        />
                        <Text style={styles.menuItemText}>
                            Configuración
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons
                            name="document-text"
                            size={22}
                            color="white"
                        />
                        <Text style={styles.menuItemText}>
                            Términos y{"\n"}condiciones
                        </Text>
                    </TouchableOpacity>

                </View>
            )}

        </View>
    );
}