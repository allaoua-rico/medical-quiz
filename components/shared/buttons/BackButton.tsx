import {  TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const BackButton = ({ navigation }: { navigation: any }) => {
  return (
    <TouchableOpacity style={{ padding: 10 }} onPress={navigation.goBack}>
      <SimpleLineIcons name="arrow-left" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default BackButton;
