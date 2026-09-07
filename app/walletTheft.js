import React from 'react';
import { Text, View, Image, TextInput, Pressable, Alert, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/walletTheft.style';
import { SafeAreaView } from "react-native-safe-area-context";


export default function WalletTheft() {
  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth > 768;

return (
  <SafeAreaView style={styles.container}>
    <Text style={[styles.title, { fontSize: isLargeScreen ? 70 : 40 }]}>In Case of Theft</Text>

    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={[styles.infoCard, { height: isLargeScreen ? 265 : 165 }]}>
        <Text style={[styles.infoCardTitle, { fontSize: isLargeScreen ? 50 : 20 }]}>Recommendations</Text>

        <View style={styles.infoCardContent}>
          <View style={styles.infoIconContainer}>
            <Ionicons
              name="shield-checkmark-outline"
              size={isLargeScreen ? 80 : 45}
              color="white"
            />
          </View>

          <View style={[styles.bulletList, { gap: isLargeScreen ? 20 : 5 }]}>
            <Text style={[styles.bulletItem, { fontSize: isLargeScreen ? 25 : 15 }]}>• Stay calm</Text>
            <Text style={[styles.bulletItem, { fontSize: isLargeScreen ? 25 : 15 }]}>• Lock your wallet</Text>
            <Text style={[styles.bulletItem, { fontSize: isLargeScreen ? 25 : 15 }]}>
              • Contact the relevant authorities
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.actionCard, { height: isLargeScreen ? 110 : 75 }]}>
        <View style={styles.actionIconContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={isLargeScreen ? 60 : 40}
            color="#102A43"
          />
        </View>

        <View style={styles.actionTextContainer}>
          <Text style={[styles.actionTitle, { fontSize: isLargeScreen ? 30 : 15 }]}>Lock your wallet</Text>
          <Text style={[styles.actionSubtitle, { fontSize: isLargeScreen ? 20 : 10 }]}>
            Prevent others from using it
          </Text>
        </View>
      </View>

      <View style={[styles.actionCard, { height: isLargeScreen ? 110 : 75 }]}>
        <View style={styles.actionIconContainer}>
          <Ionicons
            name="location-outline"
            size={isLargeScreen ? 60 : 40}
            color="#102A43"
          />
        </View>

        <View style={styles.actionTextContainer}>
          <Text style={[styles.actionTitle, { fontSize: isLargeScreen ? 30 : 15 }]}>Locate it on the map</Text>
          <Text style={[styles.actionSubtitle, { fontSize: isLargeScreen ? 20 : 10 }]}>Track its location</Text>
        </View>
      </View>

      <View style={[styles.actionCard, { height: isLargeScreen ? 110 : 75 }]}>
        <View style={styles.actionIconContainer}>
          <Ionicons
            name="call-outline"
            size={isLargeScreen ? 60 : 40}
            color="#102A43"
          />
        </View>

        <View style={styles.actionTextContainer}>
          <Text style={[styles.actionTitle, { fontSize: isLargeScreen ? 30 : 15 }]}>Call the authorities</Text>
          <Text style={[styles.actionSubtitle, { fontSize: isLargeScreen ? 20 : 10 }]}>
            Relevant to your area
          </Text>
        </View>
      </View>

      <View style={[styles.noteCard, { height: isLargeScreen ? 200 : 120 }]}>
        <View style={styles.noteIconContainer}>
          <Ionicons
            name="warning-outline"
            size={isLargeScreen ? 100 : 50}
            color="#FFC078"
          />
        </View>

        <View style={styles.noteTextContainer}>
          <Text style={[styles.noteTitle, { fontSize: isLargeScreen ? 40 : 20 }]}>Note:</Text>
          <Text style={[styles.noteText, { fontSize: isLargeScreen ? 20 : 10 }]}>
            If you find your wallet, do not risk going to retrieve it
            yourself. Your safety comes first.
          </Text>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
);
}
