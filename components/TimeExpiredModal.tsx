import { View, Text } from "react-native";
import React from "react";
import { Modal, Spinner } from "native-base";

export default function TimeExpiredModal({
  modalVisible,
}: {
  modalVisible: boolean;
}) {
  return (
    <Modal isOpen={modalVisible} size="sm">
      <Modal.Content>
        <Modal.Body>
          <Text className="text-lg text-center">
            Le temps de l'examen est écoulé!!
          </Text>
          <Text className="mb-5 text-center">
            Nous enregistrons vos résultats
          </Text>
          <Spinner
            accessibilityLabel="registering results"
            color="black"
            size="lg"
            className="my-auto"
          />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
