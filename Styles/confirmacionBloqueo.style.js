import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#00162F",
        alignItems: "center",
        paddingVertical: 110,
    },
    subtitle: {
        color: "#000000", 
        fontSize: 15, 
        justifyContent: "center", 
        textAlign: "center", 
        paddingHorizontal: 80,
        marginTop: 20,
    },
    title: {
        color: "#000000", 
        fontWeight: "bold",
        fontSize: 25, 
        justifyContent: "center", 
        textAlign: "center", 
        paddingHorizontal: 80,
    },
    walletCard: {
        position: 'absolute',
        top: 70,
        left: 10,
        right: 10,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        paddingVertical: 7,
        paddingHorizontal: 10,
        elevation: 5,
        marginTop: 100,
    },
    icon: {
        marginLeft: 85,
    },

});