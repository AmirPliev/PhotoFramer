import { StyleSheet, TouchableOpacity } from "react-native";
import { Portal } from "react-native-portalize";
import { ThemedText } from "../ThemedText";
import Colors from "@/constants/Colors";
import SheetButton from "./SheetButton";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import { useRef } from "react";

export default function Select({
  style = {},
  button,
  children,
  title,
}: {
  style?: any;
  button: React.ReactNode;
  children: React.ReactNode;
  title: string;
}) {
  const sheetRef = useRef<BottomSheetMethods>(null);

  return (
    <>
      <TouchableOpacity
        style={{ ...style, ...styles.menuItem }}
        onPress={() => sheetRef.current?.open()}
      >
        {button}
      </TouchableOpacity>

      <Portal>
        <BottomSheet
          ref={sheetRef}
          height="80%"
          style={{
            ...styles.sheet,
            backgroundColor: Colors.background,
          }}
        >
          <ThemedText style={styles.header}>{title}</ThemedText>

          {children}

          <SheetButton
            text="Close"
            iconName="close"
            onPress={() => sheetRef.current?.close()}
          />
        </BottomSheet>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  sheet: {
    zIndex: 100,
    position: "absolute",
    bottom: 0,
  },

  menuItem: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-end",
    width: "100%",
  },

  header: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    fontSize: 20,
    fontFamily: "JosefinBold",
  },

  sheetItem: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-end",
    padding: 16,
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },

  input: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexGrow: 1,
  },
});
