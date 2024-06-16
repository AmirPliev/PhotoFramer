import { View, Text } from "react-native";
import React from "react";
import * as MediaLibrary from "expo-media-library";
import { useState } from "react";

export default function FolderSelector() {
  const [albums, setAlbums] = useState(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  async function getAlbums() {
    if (permissionResponse.status !== "granted") {
      await requestPermission();
    }
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });

    setAlbums(fetchedAlbums);
  }

  return (
    <View>
      <Text>FolderSelector</Text>
    </View>
  );
}
