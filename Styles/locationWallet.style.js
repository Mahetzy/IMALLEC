import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    map: {
        width: '100%',
        height: '100%',
    },

    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 55,
        backgroundColor: '#061B2D',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
    },

    menuButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoText: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginRight: 5,
    },

    walletCard: {
        position: 'absolute',
        top: 70,
        left: 10,
        right: 10,
        backgroundColor: '#061B2D',
        borderRadius: 5,
        paddingVertical: 7,
        paddingHorizontal: 10,
        elevation: 5,
    },

    walletText: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',
    },

    greenText: {
        color: '#37D35B',
        fontSize: 14,
    },

    distanceText: {
        color: 'white',
        fontSize: 9,
        marginTop: 2,
    },

    mapMarker: {
        position: 'absolute',
        top: '42%',
        left: '50%',
        marginLeft: -18,
        marginTop: -18,
        width: 36,
        height: 36,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: '#102A43',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },

    locationButton: {
        position: 'absolute',
        right: 15,
        bottom: 70,
        width: 48,
        height: 48,
        borderRadius: 25,
        backgroundColor: '#061B2D',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },

    addressCard: {
        position: 'absolute',
        left: 8,
        right: 8,
        bottom: 8,
        backgroundColor: '#061B2D',
        borderRadius: 5,
        padding: 9,
    },

    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
    },

    addressTitle: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold',
        marginLeft: 4,
    },

    addressText: {
        color: 'white',
        fontSize: 8,
        lineHeight: 11,
    },

    lockButton: {
        position: 'absolute',
        right: 15,
        bottom: 18,
        width: 38,
        height: 38,
        borderRadius: 20,
        backgroundColor: '#061B2D',
        justifyContent: 'center',
        alignItems: 'center',
    },

    menuOverlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '72%',
        backgroundColor: '#F7F7F7',
        paddingTop: 50,
        paddingHorizontal: 12,
        elevation: 10,
    },

    closeButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    menuTitle: {
        color: '#555555',
        fontSize: 14,
        marginLeft: 50,
        marginBottom: 15,
    },

    menuItem: {
        height: 48,
        backgroundColor: '#061B2D',
        borderRadius: 10,
        marginBottom: 12,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3,
    },

    menuItemText: {
        color: 'white',
        fontSize: 11,
        marginLeft: 10,
        fontWeight: '500',
    },

});