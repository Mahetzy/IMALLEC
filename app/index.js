import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

export default function Index() {
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setDestination(user ? "/linkCheck" : "/welcome");
    });
  }, []);

  if (!destination) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <Redirect href={destination} />;
}
