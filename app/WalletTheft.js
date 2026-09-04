 import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/WalletTheft.style';

export default function WalletTheft() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>In Case of Theft</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>Recommendations</Text>

          <View style={styles.infoCardContent}>
            <View style={styles.infoIconContainer}>
              <Ionicons
                name="shield-checkmark-outline"
                size={36}
                color="white"
              />
            </View>

            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>• Stay calm</Text>
              <Text style={styles.bulletItem}>• Lock your wallet</Text>
              <Text style={styles.bulletItem}>
                • Contact the relevant authorities
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.actionCard}>
          <View style={styles.actionIconContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={22}
              color="#102A43"
            />
          </View>

          <View style={styles.actionTextContainer}>
            <Text style={styles.actionTitle}>Lock your wallet</Text>
            <Text style={styles.actionSubtitle}>
              Prevent others from using it
            </Text>
          </View>
        </View>

        <View style={styles.actionCard}>
          <View style={styles.actionIconContainer}>
            <Ionicons
              name="location-outline"
              size={22}
              color="#102A43"
            />
          </View>

          <View style={styles.actionTextContainer}>
            <Text style={styles.actionTitle}>Locate it on the map</Text>
            <Text style={styles.actionSubtitle}>Track its location</Text>
          </View>
        </View>

        <View style={styles.actionCard}>
          <View style={styles.actionIconContainer}>
            <Ionicons
              name="call-outline"
              size={22}
              color="#102A43"
            />
          </View>

          <View style={styles.actionTextContainer}>
            <Text style={styles.actionTitle}>Call the authorities</Text>
            <Text style={styles.actionSubtitle}>
              Relevant to your area
            </Text>
          </View>
        </View>

        <View style={styles.noteCard}>
          <View style={styles.noteIconContainer}>
            <Ionicons
              name="warning-outline"
              size={20}
              color="#FFC078"
            />
          </View>

          <View style={styles.noteTextContainer}>
            <Text style={styles.noteTitle}>Note:</Text>
            <Text style={styles.noteText}>
              If you find your wallet, do not risk going to retrieve it
              yourself. Your safety comes first.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}