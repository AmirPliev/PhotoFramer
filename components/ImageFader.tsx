import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function ImageFader({
  images,
  switchTime = 5000,
}: {
  images: string[];
  switchTime?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const image1Opacity = useRef(new Animated.Value(1)).current;
  const image2Opacity = useRef(new Animated.Value(0)).current;
  const [image1Visible, setImage1Visible] = useState(true);

  useEffect(() => {
    const swapImageInterval = setInterval(
      () => {
        const newImage1Opacity = image1Visible ? 0 : 1;
        const newImage2Opacity = image1Visible ? 1 : 0;

        Animated.parallel([
          Animated.timing(image1Opacity, {
            toValue: newImage1Opacity,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(image2Opacity, {
            toValue: newImage2Opacity,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setImage1Visible(!image1Visible);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        });
      },
      switchTime * 60 * 1_000,
    );

    return () => clearInterval(swapImageInterval);
  }, [image1Visible, image1Opacity, image2Opacity, images.length]);

  return (
    <View style={styles.imageWrapper}>
      <Animated.Image
        style={[styles.image, { opacity: image1Opacity }]}
        source={{
          uri: images[
            image1Visible ? currentIndex : (currentIndex + 1) % images.length
          ],
        }}
      />
      <Animated.Image
        style={[styles.image, { opacity: image2Opacity }]}
        source={{
          uri: images[
            !image1Visible ? currentIndex : (currentIndex + 1) % images.length
          ],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
});
