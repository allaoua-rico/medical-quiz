import { Alert, CloseIcon, HStack, IconButton, VStack } from "native-base";
import { Snackbar } from "react-native-paper";
import useAlert from "./useAlert";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AlertPopup() {
  const { text, type, setAlert } = useAlert();
  const { top } = useSafeAreaInsets();

  const handleDismiss = () => setAlert("", "");
  if (text && type)
    return (
      <Snackbar
        duration={10000}
        visible={text && type}
        onDismiss={handleDismiss}
        wrapperStyle={{
          padding: 0,
          top,
          backgroundColor: "transparent",
          zIndex: 9999,
        }}
        style={{ padding: 0, backgroundColor: "transparent" }}
        elevation={0}
      >
        <Alert w="100%" status={type}>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1} alignItems="center">
                <Alert.Icon mt="1" />
                <Text className="text-gray-800 font-semibold">{text}</Text>
              </HStack>
              <IconButton
                onPress={handleDismiss}
                variant="unstyled"
                _focus={{
                  borderWidth: 0,
                }}
                icon={<CloseIcon size="3" />}
                _icon={{
                  color: "coolGray.600",
                }}
              />
            </HStack>
          </VStack>
        </Alert>
      </Snackbar>
    );
  return <></>;
}
