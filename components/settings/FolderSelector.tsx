import React from "react";
import { View, Button, Alert } from "react-native";
import DocumentPicker from "react-native-document-picker";

const DirectoryPicker = () => {
  const pickDirectory = async () => {
    try {
      const result = await DocumentPicker.pickDirectory();
      const directoryUri = decodeURIComponent(result.uri);
      console.log("Selected directory: ", directoryUri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert("Cancelled", "Directory selection was cancelled");
      } else {
        Alert.alert("Error", "An error occurred: " + JSON.stringify(err));
      }
    }
  };

  return (
    <View>
      <Button title="Pick Directory" onPress={pickDirectory} />
    </View>
  );
};

export default DirectoryPicker;
