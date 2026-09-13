import { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';
import {styles} from '../Styles/terminosAndConditions.style.js';

export default function TermsConditions() {
    const [showPDF, setShowPDF] = useState(false);
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    
    
    const imageWidth = windowWidth - 0;
    const imageHeight = windowHeight - 300; 

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                        if (showPDF) {
                            setShowPDF(false);
                        } else {
                            router.back();
                        }
                    }}
                >
                    <Text style={styles.backText}>‹</Text>
                </TouchableOpacity>

                <Text style={styles.title}>
                    Terms and Conditions
                </Text>
            </View>

            {!showPDF ? (
                <View style={[styles.pdfBox, {backgroundColor: "#d8d5d5c5"}]}>
                    <View style={styles.pdfIcon}>
                        <Text style={styles.pdfIconText}>PDF</Text>
                    </View>

                    <Text style={styles.pdfTitle}>IMALLEC</Text>

                    <Text style={styles.pdfSubtitle}>
                        Terms and Conditions
                    </Text>

                    <Text style={styles.pdfDescription}>
                        Please read the Terms and Conditions carefully
                        before using the IMALLEC application.
                    </Text>

                    <TouchableOpacity
                        style={styles.openButton}
                        onPress={() => setShowPDF(true)}
                    >
                        <Text style={styles.openButtonText}>
                            Open PDF
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView
                    style={styles.pdfViewer}
                    contentContainerStyle={styles.pdfContent}
                    showsVerticalScrollIndicator={true}
                >
                    <Image
                        source={require('../assets/terms_page_1.png')}
                        style={[styles.pdfPage, { width: imageWidth, height: imageHeight }]}
                        resizeMode="contain"
                    />

                    <Image
                        source={require('../assets/terms_page_2.png')}
                        style={[styles.pdfPage, { width: imageWidth, height: imageHeight }]}
                        resizeMode="contain"
                    />

                    <Image
                        source={require('../assets/terms_page_3.png')}
                        style={[styles.pdfPage, { width: imageWidth, height: imageHeight }]}
                        resizeMode="contain"
                    />
                </ScrollView>
            )}
        </View>
    );
}