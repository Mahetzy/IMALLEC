import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../Styles/GuideRecomendation.style';

export default function GuideRecommendations() {
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>
                    Guide and{'\n'}recommendations
                </Text>

                <Text style={styles.subtitle}>
                    Select your type of situation{'\n'}to see the recommendations.
                </Text>
            </View>

            <View style={styles.optionsContainer}>

                <View style={styles.optionCard}>
                    <View style={styles.iconContainer}>
                        <Ionicons
                            name="briefcase-outline"
                            size={30}
                            color="#000000"
                        />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.optionTitle}>
                            Loss
                        </Text>

                        <Text style={styles.optionSubtitle}>
                            What to do in{'\n'}case of loss?
                        </Text>
                    </View>
                </View>

                <View style={styles.optionCard}>
                    <View style={styles.iconContainer}>
                        <Ionicons
                            name="hand-left-outline"
                            size={30}
                            color="#000000"
                        />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.optionTitle}>
                            Theft
                        </Text>

                        <Text style={styles.optionSubtitle}>
                            What to do in{'\n'}case of theft?
                        </Text>
                    </View>
                </View>

            </View>

        </View>
    );
}