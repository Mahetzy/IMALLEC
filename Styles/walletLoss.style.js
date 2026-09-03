import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020E1C',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 10,
        paddingRight: 3,
        marginBottom: 30,
    },
    logoImage: {
        width: 170,
        height: 60,
        marginTop: -15,
    },
    title: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    infoCard: {
        backgroundColor: '#0a182c',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor:' #18324e',
    },
    infoCardTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 18,
    },
    infoCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#1E3A5C',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 18,
    },
    bulletList: {
        flex: 1,
    },
    bulletItem: {
        color: '#D6DEE6',
        fontSize: 13,
        lineHeight: 20,
    },
    actionCard: {
        backgroundColor: 'white',
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 18,
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    actionIconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    actionTextContainer: {
        flex: 1,
    },
    actionTitle: {
        color: '#0B2038',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    actionSubtitle: {
        color: '#8A94A0',
        fontSize: 13,
    },
});