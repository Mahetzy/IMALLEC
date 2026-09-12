import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/GuideRecomendation.style';
import { useRouter } from "expo-router";

export default function GuideRecommendations() {
    const { width: windowWidth } = useWindowDimensions();
    const isLargeScreen = windowWidth > 768;
    const isMediunScreen = windowWidth > 600 && windowWidth < 768;
    const router = useRouter();
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={[styles.title, { fontSize: isLargeScreen ? 60 : (isMediunScreen ? 50 : 35) }]}>
                    Guide and{'\n'}recommendations
                </Text>

                <Text style={[styles.subtitle, { fontSize: isLargeScreen ? 24 : (isMediunScreen ? 20 : 16) }]}>
                    Select your type of situation{'\n'}to see the recommendations.
                </Text>
            </View>

            <View style={styles.optionsContainer}>

                <View style={styles.optionCard}>
                    <View style={styles.iconContainer}>
                        <Ionicons
                            name="briefcase-outline"
                            size={isLargeScreen ? 100 : (isMediunScreen ? 70 : 50)}
                            color="#000000"
                        />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={[styles.optionTitle, { marginLeft: isLargeScreen ? 120 : (isMediunScreen ? 70 : 35), fontSize: isLargeScreen ? 65 : (isMediunScreen ? 50 : 35) }]}>
                            Loss
                        </Text>

                        <Text style={[styles.optionSubtitle, { marginLeft: isLargeScreen ? 90 : (isMediunScreen ? 50 : 5), fontSize: isLargeScreen ? 35 : (isMediunScreen ? 25 : 20) }]} onPress={() => router.push('/walletLoss')}>
                            What to do in{'\n'}case of loss?
                        </Text>
                    </View>
                </View>

                <View style={styles.optionCard}>
                    <View style={styles.iconContainer}>
                        <Ionicons
                            name="hand-left-outline"
                            size={isLargeScreen ? 100 : (isMediunScreen ? 70 : 50)}
                            color="#000000"
                        />
                    </View>

                    <View style={styles.textContainer} >
                        <Text style={[styles.optionTitle, { marginLeft: isLargeScreen ? 120 : (isMediunScreen ? 70 : 35), fontSize: isLargeScreen ? 65 : (isMediunScreen ? 50 : 35)}]}>
                            Theft
                        </Text>

                        <Text style={[styles.optionSubtitle, {marginLeft: isLargeScreen ? 90 : (isMediunScreen ? 50 : 5), fontSize: isLargeScreen ? 35 : (isMediunScreen ? 25 : 20)  }]} onPress={() => router.push('/walletTheft')}>
                            What to do in{'\n'}case of theft?
                        </Text>
                    </View>
                </View>

            </View>

        </View>
    );
}