import * as MediaLibrary from "expo-media-library";

export async function loadImages(): Promise<MediaLibrary.Asset[]> {
  try {
    const result = await MediaLibrary.getAlbumAsync("PhotoFramerImages").catch(
      (err) => {
        console.error("Error getting album:", err);
      },
    );

    if (result) {
      const albumID = result.id;
      const assets = await MediaLibrary.getAssetsAsync({
        album: albumID,
        first: 200,
        mediaType: "photo",
      }).catch((err) => {
        console.error("Error loading images:", err);
      });

      if (assets) {
        return assets.assets;
      }
    }
  } catch (err) {
    console.error("Error loading images:", err);
  }
  return [];
}
