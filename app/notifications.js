import { useState } from 'react';
import { Text, View, Switch, ScrollView, Image, useWindowDimensions } from 'react-native';
import { styles } from '../Styles/notificactions.style';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
    const { width: windowWidth } = useWindowDimensions();
    const isLargeScreen = windowWidth > 768;
    const isMediunScreen = windowWidth > 600 && windowWidth < 768;
    const [uiData, setUiData] = useState({
        mainSection: {
            title: "Notifications",
            options: [{ label: "Receive notifications", active: true, isMain: true }]
        },
        prefSection: {
            title: "Preferences",
            options: [
                { label: "Status notification", active: false },
                { label: "Alert notification", active: false },
                { label: "Vibration", active: false },
                { label: "Play sound", active: false }
            ]
        }
    });

    const handleToggle = (sectionKey, index) => {
        setUiData(prevData => {
            const updatedSection = [...prevData[sectionKey].options];
            updatedSection[index] = {
                ...updatedSection[index],
                active: !updatedSection[index].active
            };

            return {
                ...prevData,
                [sectionKey]: {
                    ...prevData[sectionKey],
                    options: updatedSection
                }
            };
        });
    };

    const renderToggleOption = (opt, sectionKey, index) => (
        <LinearGradient
            key={index}
            colors={
                opt.active
                    ? ['#020E1C', '#0A2A4D', '#B8C4CE'] 
                    : ['#0A2A6E', '#0A2A6E', '#B8C4CE'] 
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1.2, y: 0 }}
            style={opt.isMain ? styles.mainCard : styles.optionCard}
        >
            <Text style={opt.isMain ? styles.mainCardText : styles.optionText}>{opt.label}</Text>
            <Switch
                value={opt.active}
                onValueChange={() => handleToggle(sectionKey, index)}
                trackColor={{ false: '#1b3b6f', true: '#ffffff' }}
                thumbColor={opt.active ? '#020E1C' : '#f4f3f4'}
            />
        </LinearGradient>
    );


    return (
        <View style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.container}>

                <Image
                    source={require("../assets/IMALLEC.png.png")}
                    style={[styles.logo, { width: isLargeScreen ? '30%' : isMediunScreen ? "30%" : "30%", marginTop: isLargeScreen ? '-8%' : isMediunScreen ? "-10%" : "-10%" }]}
                />

                
                <View style={[styles.card, { marginTop: isLargeScreen ? '-10%' : isMediunScreen ? "-16%" : "-20%", }]}>
                    <Text style={styles.sectionTitle}>{uiData.mainSection.title}</Text>
                    {uiData.mainSection.options.map((opt, index) =>
                        renderToggleOption(opt, 'mainSection', index)
                    )}

                    <Text style={styles.sectionTitle}>{uiData.prefSection.title}</Text>
                    {uiData.prefSection.options.map((opt, index) =>
                        renderToggleOption(opt, 'prefSection', index)
                    )}
                </View>
            </ScrollView>
        </View>
    );
}