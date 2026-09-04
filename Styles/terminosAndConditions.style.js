import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 55,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },

    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    backText: {
        fontSize: 40,
        fontWeight: '300',
        color: '#000000',
        lineHeight: 40,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
    },

    pdfBox: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        borderRadius: 18,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
    },

    pdfIcon: {
        width: 75,
        height: 90,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },

    pdfIconText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },

    pdfTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 8,
    },

    pdfSubtitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 20,
    },

    pdfDescription: {
        fontSize: 15,
        color: '#555555',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 30,
    },

    openButton: {
        backgroundColor: '#000000',
        paddingVertical: 14,
        paddingHorizontal: 35,
        borderRadius: 12,
    },

    openButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },

    pdfViewer: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },

    pdfContent: {
        paddingVertical: 10,
        alignItems: 'center',
    },

    pdfPage: {
        width: '95%',
        aspectRatio: 0.707,
        marginBottom: 15,
        backgroundColor: '#ffffff',
    },

});
