import { View } from "react-native";
import React from "react";
import { HomeStackScreenProps } from "../types";
import { useAuth } from "../auth/AuthProvider";
import { Button } from "native-base";

const UserModal = ({ navigation }: HomeStackScreenProps<"UserModal">) => {
  const { authContext } = useAuth();

  return (
    <View className="flex-1 justify-end" onTouchEnd={() => navigation.goBack()}>
      <Button className="bg-red-500" onPress={() => authContext?.signOut()}>
        Déconnexion
      </Button>
    </View>
  );
};

export default UserModal;
