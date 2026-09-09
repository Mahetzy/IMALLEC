import { useState } from 'react';
import { Text, View, Switch, ScrollView, Image, useWindowDimensions } from 'react-native';
import { styles } from '../Styles/notificactions.style';

export default function App() {
    const { width: windowWidth } = useWindowDimensions();
    const isLargeScreen = windowWidth > 768;
    const [uiData, setUiData] = useState({
        mainSection: {
            title: "Notificaciones",
            options: [{ label: "Recibir notificaciones", active: true, isMain: true }]
        },
        prefSection: {
            title: "Preferencias",
            options: [
                { label: "Notificacion de estado", active: false },
                { label: "Notificacion de alerta", active: false },
                { label: "Vibración", active: false },
                { label: "Reproducir sonido", active: false }
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
        <View
            key={index}
            style={[opt.isMain ? styles.mainCard : styles.optionCard, {height: isLargeScreen ? '15%' : '13%' }]}
        >
            <Text style={opt.isMain ? styles.mainCardText : styles.optionText}>{opt.label}</Text>
            <Switch
                value={opt.active}
                onValueChange={() => handleToggle(sectionKey, index)}
                trackColor={{ false: '#1b3b6f', true: '#ffffff' }}
                thumbColor={opt.active ? '#020E1C' : '#f4f3f4'}
            />
        </View>
    );

    return (
        <View style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                
                <Image
                    source={require("../assets/IMALLEC.png.png")}
                    style={[styles.logo, { width: isLargeScreen ? '30%' : '30%', marginTop: isLargeScreen? '-10%' : '-25%' }]}
                />

                {/* Tarjeta blanca contenedora principal */}
                <View style={[styles.card, { marginTop: isLargeScreen? '-10%' : '-20%' , height: isLargeScreen ? '120%' : '110%' }]}>
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