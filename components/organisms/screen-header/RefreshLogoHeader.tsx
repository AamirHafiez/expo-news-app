import React from "react";
import { StyleSheet, View } from "react-native";
import useAppSafeAreaInsets from "@/hooks/dimens/useAppSafeAreaInsets";
import Spacer from "@/components/atoms/spacer/Spacer";
import { SpacerType } from "@/components/atoms/spacer/config";
import Refresh from "@/assets/svg/Refresh";
import PressableComponent from "@/components/atoms/pressable/PressableComponent";
import { MemoizedImage } from "@/components/atoms/image/ImageComponent";
import { RefreshLogoHeaderProps } from "./types";

const RefreshLogoHeader = (props: RefreshLogoHeaderProps) => {
  const { top: topSAInset } = useAppSafeAreaInsets();

  const { onRefreshPress, imageSource } = props;

  return (
    <View style={{ paddingTop: topSAInset }}>
      <Spacer type={SpacerType.LG} />
      <View style={styles.content}>
        <View style={styles.flexRow}>
          <Spacer type={SpacerType.XL} />
          {imageSource != null ? (
            <MemoizedImage style={styles.image} source={imageSource} />
          ) : (
            <Spacer />
          )}
        </View>
        <View style={styles.flexRow}>
          <PressableComponent onPress={onRefreshPress}>
            <Refresh />
          </PressableComponent>
          <Spacer type={SpacerType.XL} />
        </View>
      </View>
      <Spacer type={SpacerType.LG} />
    </View>
  );
};

export default RefreshLogoHeader;

const styles = StyleSheet.create({
  image: {
    width: 111,
    aspectRatio: 111 / 31,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
  },
});
