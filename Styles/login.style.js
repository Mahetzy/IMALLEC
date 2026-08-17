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
        marginBottom: 110,
        marginLeft: 235,
    },

    title: {
        fontSize: 75,
        fontWeight: "bold",
        textAlign: "center",
        color: "#ffffff",
        marginBottom: 30,
        marginTop: -30,
        padding:10
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
        paddingTop: 20,
        fontSize: 15,
        textAlign: "center",
        color: "#ffffff",
        marginBottom: 30,
        fontWeight: "bold",
    },

    password: {
        paddingTop: 25,
        fontSize: 15,
        textAlign: "center",
        color: "#ffffff",
        marginBottom: -45,
        fontWeight: "normal",
    },



    

    inputContainer: {
        marginLeft: 20,
        marginRight: 20,
        height: 55,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 75,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        marginTop: 20,

    },

    input: {
        flex: 1,
        height: 55,
        paddingHorizontal: 10,
        fontSize: 15,
        color: "#0e0d0d",
        
    },

    icon: {
        marginLeft: 18,
        marginRight: 5,
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
        marginTop: 100,
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