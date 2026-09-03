import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUser = async (user) => {
    try {
        await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
        console.error("Error saving user to storage:", error);
    }
};

export const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Error getting user from storage:", error);
        return null;
    }
};

export const removeUser = async () => {
    try {
        await AsyncStorage.removeItem("user");
    } catch (error) {
        console.error("Error removing user from storage:", error);
    }
};

export const saveWallet = async (walletId) => {
    try {
        await AsyncStorage.setItem("walletId", walletId);
    } catch (error) {
        console.error("Error saving wallet ID to storage:", error);
    }
};

export const getWallet = async () => {
    try {
        const walletId = await AsyncStorage.getItem("walletId");
        return walletId;
    } catch (error) {
        console.error("Error getting wallet ID from storage:", error);
        return null;
    }
};

export const removeWallet = async () => {
    try {
        await AsyncStorage.removeItem("walletId");
    } catch (error) {
        console.error("Error removing wallet ID from storage:", error);
    }
};