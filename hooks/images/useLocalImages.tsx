import { useState, useEffect, useContext, createContext } from "react";
import { selectImages, saveImage } from "@/hooks/images/imagePicking";
import { loadImages } from "@/hooks/images/loadImages";
import * as MediaLibrary from "expo-media-library";

type ImageContext = {
  currentImages: MediaLibrary.Asset[];
  pickImage: () => void;
  deleteImage: (asset: MediaLibrary.Asset) => void;
};

const LocalImagesContext = createContext<ImageContext>({
  currentImages: [],
  pickImage: () => {},
  deleteImage: () => {},
});

export const LocalImagesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const contextResult = useLocalImagesHook();

  return (
    <LocalImagesContext.Provider value={contextResult}>
      {children}
    </LocalImagesContext.Provider>
  );
};

export function useLocalImages() {
  return useContext(LocalImagesContext);
}

function useLocalImagesHook(): ImageContext {
  const [currentImages, setCurrentImages] = useState<MediaLibrary.Asset[]>([]);
  const [reloadValue, setReloadValue] = useState<boolean>(false);

  function reload() {
    setReloadValue((prev) => !prev);
  }

  useEffect(() => {
    getAllImages();
  }, [reloadValue]);

  async function pickImage(): Promise<void> {
    const images = await selectImages();
    if (images.length < 0) {
      return;
    }

    await saveImage(images);
    reload();
  }

  async function getAllImages(): Promise<void> {
    const images = await loadImages();
    if (images) {
      setCurrentImages(images);
    }
  }

  async function deleteImage(asset: MediaLibrary.Asset): Promise<void> {
    const deleteResult = await MediaLibrary.deleteAssetsAsync([asset]).catch(
      (err) => {
        console.error("Error deleting image:", err);
      },
    );

    if (!deleteResult) {
      console.error("Error deleting image");
    }
    reload();
  }

  return { currentImages, pickImage, deleteImage };
}
