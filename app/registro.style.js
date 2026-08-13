import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        paddingHorizontal: 25,
        paddingVertical: 35,
        justifyContent: "center",
        backgroundColor: "#013a7a",
        paddingTop: 30,
    },

    logo: {
        width: 150,
        height: 85,
        alignSelf: "center",
        resizeMode: "contain",
        marginBottom: 50,
        marginLeft: 235,
    },

    title: {
        fontSize: 75,
        fontWeight: "bold",
        textAlign: "center",
        color: "#ffffff",
        marginBottom: 8,
        padding:30
    },

    subtitle: {
        paddingTop: 30,
        fontSize: 20,
        textAlign: "center",
        color: "#ffffff",
        marginBottom: 30,
        fontWeight: "bold",
    },

    login: {
        paddingTop: 10,
        fontSize: 15,
        textAlign: "center",
        color: "#ffffff",
        marginBottom: 30,
        fontWeight: "bold",
    },



    input: {
        marginLeft: 20,
        marginRight: 20,
        height: 55,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 75,
        paddingHorizontal: 50,
        fontSize: 15,
        color: "#0e0d0d",
        marginBottom: 12,
        marginTop: 20,
    },

    inputFocused: {
        borderColor: "#2563EB",
    },

    button: {
        marginLeft: 30,
        marginRight: 30,
        height: 70,
        backgroundColor: "#004695",
        borderRadius: 75,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        elevation: 3,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 25,
        
    },

    footer: {
        textAlign: "center",
        marginTop: 20,
        color: "#6B7280",
        fontSize: 13,
    },
    
    linkText: {
    marginTop: 5,
    paddingVertical: 15,
    alignSelf: 'center',
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 25,
  },

});