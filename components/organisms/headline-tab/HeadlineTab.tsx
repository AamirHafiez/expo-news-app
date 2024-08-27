import { StyleSheet, View } from "react-native";
import React, { memo, useRef } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Spacer from "@/components/atoms/spacer/Spacer";
import { SpacerType } from "@/components/atoms/spacer/config";
import { MemoizedThemedText } from "@/components/atoms/text/ThemedText";
import { TextType, TextVariant } from "@/components/atoms/text/config";
import DateUtil from "@/utils/date/DateUtil";
import type Date from "@/utils/date/Date";
import { MemoizedImage } from "@/components/atoms/image/ImageComponent";
import { ThemedView } from "@/components/atoms/view/ThemedView";
import { type HeadlineTabProps } from "./types";
import RightActions from "./RightActions";
import { PinSM } from "@/assets/svg/Pin";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const HeadlineTab = (props: HeadlineTabProps) => {
  const {
    onDelete,
    onPinned,
    onUnpinned,
    title,
    author,
    publishedAt,
    source,
    urlToImage,
    isPinned = false,
    actions = [],
  } = props;

  const swipeableRef = useRef<Swipeable>(null);

  let date: Date;

  if (publishedAt != null) {
    date = new DateUtil(publishedAt);
  }

  const beforeAction = (actionCallback?: () => void) => {
    swipeableRef.current?.close();
    actionCallback && setTimeout(actionCallback, 100);
  };

  return (
    <Animated.View entering={FadeInUp} exiting={FadeInDown}>
      <ThemedView>
        <Spacer type={SpacerType.LG} />
        <Swipeable
          ref={swipeableRef}
          renderRightActions={
            actions.length > 0
              ? (_, progress) => (
                  <RightActions
                    actions={actions}
                    onDelete={() => beforeAction(onDelete)}
                    onPinned={() => beforeAction(onPinned)}
                    onUnpinned={() => beforeAction(onUnpinned)}
                  />
                )
              : undefined
          }
          friction={2.5}
        >
          <ThemedView style={styles.container}>
            <Spacer type={SpacerType.XL} />
            <View style={styles.body}>
              {isPinned && (
                <>
                  <View style={styles.pinTextContainer}>
                    <PinSM />
                    <Spacer />
                    <MemoizedThemedText
                      variant={TextVariant.MUTED}
                      type={TextType.CAPTION}
                    >
                      Pinned on top
                    </MemoizedThemedText>
                  </View>
                  <Spacer type={SpacerType.MD} />
                </>
              )}
              <View style={styles.header}>
                {source != null ? (
                  <View style={styles.sourceContainer}>
                    <MemoizedImage
                      source={require("@/assets/images/placeholder.png")}
                      style={styles.placeholder}
                    />
                    <Spacer type={SpacerType.SM} />
                    <MemoizedThemedText
                      variant={TextVariant.MUTED}
                      type={TextType.B2}
                    >
                      {source}
                    </MemoizedThemedText>
                  </View>
                ) : (
                  <Spacer />
                )}
                {date! != null && (
                  <MemoizedThemedText type={TextType.CAPTION}>
                    {date.format("h:mm A")}
                  </MemoizedThemedText>
                )}
              </View>
              <Spacer type={SpacerType.LG} />
              <View style={styles.content}>
                <MemoizedThemedText
                  style={styles.title}
                  numberOfLines={3}
                  type={TextType.H2}
                >
                  {title}
                </MemoizedThemedText>
                <MemoizedImage source={urlToImage} style={styles.image} />
              </View>
              <Spacer type={SpacerType.MD} />
              <MemoizedThemedText
                variant={TextVariant.MUTED}
                type={TextType.CAPTION}
              >
                {author}
              </MemoizedThemedText>
            </View>
            <Spacer type={SpacerType.XL} />
          </ThemedView>
        </Swipeable>
        <Spacer type={SpacerType.LG} />
      </ThemedView>
    </Animated.View>
  );
};

export const MemoizedHeadlineTab = memo(HeadlineTab);

export default HeadlineTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  body: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    height: 77,
    aspectRatio: 1,
    borderRadius: 12,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    maxWidth: "70%",
  },
  placeholder: {
    height: 20,
    aspectRatio: 1,
  },
  sourceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pinTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
