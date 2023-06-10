import { View, Text } from 'react-native'
import React from 'react'
import { Button, Modal, Spinner } from 'native-base';

export default function SubmitModal({
    setModalVisible,
    modalVisible,
    endTest,
    loading,
  }: SubmitModalProps) {
    return (
        <Modal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          size="sm"
        >
          <Modal.Content maxH="212">
            <Modal.Body className="py-7">
              <Text className="text-lg">
                Voulez-vous terminer le QCM et enregister votre résultat ?
              </Text>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => setModalVisible(false)}
                >
                  Annuler
                </Button>
                <Button disabled={loading} className="px-5" onPress={endTest}>
                  {loading ? (
                    <Spinner accessibilityLabel="Login" color="white" size="sm" />
                  ) : (
                    "Oui"
                  )}
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      );
}

type SubmitModalProps = {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    modalVisible: boolean;
    endTest: () => void;
    loading: boolean;
  };
  