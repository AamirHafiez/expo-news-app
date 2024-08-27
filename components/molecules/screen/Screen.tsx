import { StyleSheet, View } from "react-native";
import React from "react";
import { type ScreenProps } from "./types";
import SafeAreaComponent from "@/components/atoms/safe-area/SafeAreaComponent";

const Screen = (props: ScreenProps) => {
  const { children, enableSafeArea = false } = props;

  const content = <View style={styles.container}>{children}</View>;

  if (enableSafeArea) {
    return (
      <SafeAreaComponent style={styles.container}>{content}</SafeAreaComponent>
    );
  }
  return content;
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
