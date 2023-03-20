import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { NativeBaseProvider } from "native-base";
import { Provider as PaperProvider } from "react-native-paper";
import { createContext } from "react";
import AlertPopup from "./components/shared/Alert/AlertPopup";
import { AlertProvider } from "./components/shared/Alert/AlertContext";
import useAuth from "./playground";
import AuthProvider from "./auth/AuthProvider";


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AlertProvider>
          <PaperProvider>
            <NativeBaseProvider>
              <AuthProvider>
                <Navigation colorScheme={colorScheme} />
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
