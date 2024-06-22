import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { Asset } from "expo-media-library";

export async function selectImages(): Promise<string[]> {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    alert("Sorry, we need camera roll permissions to pick an image.");
    return [];
  }

  const pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsMultipleSelection: true,
    quality: 1, // Optional: Adjust image quality (0-1)
  });

  if (pickerResult.canceled) {
    console.error("Image picking cancelled");
    return [];
  }

  if (!pickerResult.assets) {
    return [];
  }

  return pickerResult.assets.map((asset) => asset.uri);
}

export async function saveImage(images: string[]) {
  let createdAssets: Asset[] = [];
  for (const image of images) {
    const createdAsset = await MediaLibrary.createAssetAsync(image);
    if (createdAsset) {
      createdAssets.push(createdAsset);
    } else {
      console.error("Error creating asset");
    }
  }

  let result = await MediaLibrary.getAlbumAsync("PhotoFramerImages").catch(
    (err) => {
      console.error("Error getting album:", err);
    },
  );

  if (!result) {
    result = await MediaLibrary.createAlbumAsync(
      "PhotoFramerImages",
      createdAssets[0],
    )
      .then(async () => {
        await MediaLibrary.deleteAssetsAsync(createdAssets[0]).catch((err) => {
          console.error("Error deleting assets:", err);
        });
      })

      .catch((err) => {
        console.error("Error creating album:", err);
      });
  }

  if (!result) {
    return;
  }

  createdAssets.shift();

  console.log(createdAssets);

  await MediaLibrary.addAssetsToAlbumAsync(
    createdAssets,
    result.id,
    true,
  ).catch((err) => {
    console.error("Error adding image to album:", err);
  });

  await MediaLibrary.deleteAssetsAsync(createdAssets).catch((err) => {
    console.error("Error deleting assets:", err);
  });
}
