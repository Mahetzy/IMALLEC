import { useState, useMemo, useEffect } from 'react';
import { Modal, View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const CLIENT_ID = '754000345577-vp7our0emuag554r6hiq2digimemm9lj.apps.googleusercontent.com';
const REDIRECT_URI = 'https://imallec.app/auth-callback';
const SCOPES = ['profile', 'email', 'openid'].join(' ');

function generateRawNonce() {
    return Array.from({ length: 32 }, () =>
        Math.floor(Math.random() * 16).toString(16)
    ).join('');
}

export default function GoogleLoginModal({ visible, onSuccess, onCancel }) {
    const [loading, setLoading] = useState(true);
    const [nonce, setNonce] = useState(null);

    useEffect(() => {
        if (!visible) {
            setNonce(null);
            setLoading(true);
            return;
        }
        setNonce(generateRawNonce());
    }, [visible]);

    const authUrl = useMemo(() => {
        if (!nonce) return null;
        return (
            `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${CLIENT_ID}` +
            `&response_type=${encodeURIComponent('token id_token')}` +
            `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
            `&scope=${encodeURIComponent(SCOPES)}` +
            `&nonce=${nonce}` +
            `&prompt=select_account`
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

            if (error) {
                onCancel(error);
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