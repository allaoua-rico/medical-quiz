import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { NativeBaseProvider } from "native-base";
import { Provider as PaperProvider } from "react-native-paper";
import AlertPopup from "./components/shared/Alert/AlertPopup";
import { AlertProvider } from "./components/shared/Alert/AlertContext";
import AuthProvider from "./auth/AuthProvider";
import { useFonts } from "expo-font";

export default function App() {
  const isLoadingComplete = useCachedResources();
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
                <Navigation />
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
