import { TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const BackButton = ({
  navigation,
  color,
}: {
  navigation: any;
  color?: string;
}) => {
  return (
    <TouchableOpacity style={{ padding: 10 }} onPress={navigation.goBack}>
      <SimpleLineIcons name="arrow-left" size={24} color={color || "white"} />
    </TouchableOpacity>
  );
};

export default BackButton;
