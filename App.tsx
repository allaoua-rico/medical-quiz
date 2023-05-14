import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { NativeBaseProvider } from "native-base";
import { Provider as PaperProvider } from "react-native-paper";
import AlertPopup from "./components/shared/Alert/AlertPopup";
import { AlertProvider } from "./components/shared/Alert/AlertContext";
import AuthProvider from "./auth/AuthProvider";
import { useFonts } from "expo-font";
// import useAuth from "./playground";
// import { createContext } from "react";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Anton-Regular": require("./assets/fonts/Anton-Regular.ttf"),
  });

  if (!isLoadingComplete || !fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AlertProvider>
          <PaperProvider>
            <NativeBaseProvider>
              <AuthProvider>
                <Navigation
                // colorScheme={colorScheme}
                />
                <StatusBar />
                <AlertPopup />
              </AuthProvider>
            </NativeBaseProvider>
          </PaperProvider>
        </AlertProvider>
      </SafeAreaProvider>
    );
  }
}
