import { useState, useMemo, useEffect } from 'react';
import { Modal, View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const CLIENT_ID = '92b2856c-f79e-4b92-98c2-9e763aec36dc';
const REDIRECT_URI = 'https://imallec.app/auth-callback';
const SCOPES = ['User.Read', 'openid', 'profile', 'email'].join(' ');


function generateNonce() {
    return Array.from({ length: 32 }, () =>
        Math.floor(Math.random() * 16).toString(16)
    ).join('');
}

export default function MicrosoftLoginModal({ visible, onSuccess, onCancel }) {
    const [loading, setLoading] = useState(true);
    const [nonce, setNonce] = useState(null);

    useEffect(() => {
        if (!visible) {
            setNonce(null);
            setLoading(true);
            return;
        }
        setNonce(generateNonce());
    }, [visible]);

    const authUrl = useMemo(() => {
        if (!nonce) return null;
        return (
            `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
            `client_id=${CLIENT_ID}` +
            `&response_type=${encodeURIComponent('id_token token')}` +
            `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
            `&scope=${encodeURIComponent(SCOPES)}` +
            `&response_mode=fragment` +
            `&prompt=select_account` +
            `&nonce=${nonce}` 
        );
    }, [nonce]);

    const handleNavChange = (navState) => {
        const { url } = navState;
        if (!url) return;

        if (url.startsWith(REDIRECT_URI)) {
            const hash = url.split('#')[1] || '';
            const params = new URLSearchParams(hash);

            const access_token = params.get('access_token');
            const id_token = params.get('id_token');
            const error = params.get('error');
            const error_description = params.get('error_description');

            if (error) {
                onCancel(error_description || error);
                return;
            }

            onSuccess({ access_token, id_token });
        }
    };

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={() => onCancel('Cancelado por el usuario')}>
            <View style={styles.container}>
                {(!authUrl || loading) && (
                    <ActivityIndicator size="large" color="#003673" style={styles.loader} />
                )}
                {authUrl && (
                    <WebView
                        key={authUrl}
                        source={{ uri: authUrl }}
                        onNavigationStateChange={handleNavChange}
                        onLoadEnd={() => setLoading(false)}
                        onError={(e) => console.log("WebView onError:", e.nativeEvent)}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState
                        style={{ flex: 1 }}
                    />
                )}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    loader: { position: 'absolute', top: '50%', left: '50%', marginLeft: -18, marginTop: -18, zIndex: 1 },
});