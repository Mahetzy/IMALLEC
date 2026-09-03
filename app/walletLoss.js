import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../Styles/walletLoss.style.js';

export default function WalletLoss() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/IMALLEC.png.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
            </View>

            <Text style={styles.title}>In case of loss</Text>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.infoCard}>
                    <Text style={styles.infoCardTitle}>Recommendations</Text>

                    <View style={styles.infoCardContent}>
                        <View style={styles.infoIconContainer}>
                            <Ionicons
                                name="shield-checkmark-outline"
                                size={32}
                                color="white"
                            />
                        </View>

                        <View style={styles.bulletList}>
                            <Text style={styles.bulletItem}>• Stay calm</Text>
                            <Text style={styles.bulletItem}>• Lock your wallet</Text>
                            <Text style={styles.bulletItem}>
                                • Check your recent activity
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.actionCard}>
                    <View style={styles.actionIconContainer}>
                        <Ionicons
                            name="lock-closed-outline"
                            size={28}
                            color="#0B2038"
                        />
                    </View>

                    <View style={styles.actionTextContainer}>
                        <Text style={styles.actionTitle}>
                            Lock your wallet
                        </Text>
                        <Text style={styles.actionSubtitle}>
                            Prevents others from using it
                        </Text>
                    </View>
                </View>

                <View style={styles.actionCard}>
                    <View style={styles.actionIconContainer}>
                        <Ionicons
                            name="location-outline"
                            size={28}
                            color="#0B2038"
                        />
                    </View>

                    <View style={styles.actionTextContainer}>
                        <Text style={styles.actionTitle}>
                            Locate it on the map
                        </Text>
                        <Text style={styles.actionSubtitle}>
                            Track its location
                        </Text>
                    </View>
                </View>

                <View style={styles.actionCard}>
                    <View style={styles.actionIconContainer}>
                        <Ionicons
                            name="call-outline"
                            size={28}
                            color="#0B2038"
                        />
                    </View>

                    <View style={styles.actionTextContainer}>
                        <Text style={styles.actionTitle}>
                            Call the authorities
                        </Text>
                        <Text style={styles.actionSubtitle}>
                            corresponding to your area
                        </Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}