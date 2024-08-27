import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/atoms/view/ThemedView";
import Spacer from "@/components/atoms/spacer/Spacer";
import { MemoizedThemedText } from "@/components/atoms/text/ThemedText";
import PressableComponent from "@/components/atoms/pressable/PressableComponent";
import { TextType, TextVariant } from "@/components/atoms/text/config";
import { HeadlineTabActions, RightActionProps } from "./types";
import { ACTION_BUTTONS } from "./config";

const RightActions = (props: RightActionProps) => {
  const { onDelete, onPinned, onUnpinned, actions } = props;

  const handlePressAction = (action: HeadlineTabActions) => {
    switch (action) {
      case HeadlineTabActions.DELETE:
        onDelete && onDelete();
        break;
      case HeadlineTabActions.PIN:
        onPinned && onPinned();
        break;
      case HeadlineTabActions.UNPIN:
        onUnpinned && onUnpinned();
        break;
    }
  };

  return (
    <ThemedView
      style={styles.rightActionsContainer}
      lightColor="#4BBDFC"
      darkColor="#4BBDFC"
    >
      {actions.map((action) => {
        const actionConfig = ACTION_BUTTONS[action];

        return (
          <PressableComponent
            onPress={() => handlePressAction(action)}
            key={actionConfig.label}
            style={styles.actionButton}
          >
            {actionConfig.icon}
            <Spacer />
            <MemoizedThemedText
              variant={TextVariant.ON_ACCENT}
              type={TextType.CAPTION}
            >
              {actionConfig.label}
            </MemoizedThemedText>
          </PressableComponent>
        );
      })}
    </ThemedView>
  );
};

export default RightActions;

const styles = StyleSheet.create({
  rightActionsContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: "space-around",
  },
  actionButton: {
    alignItems: "center",
  },
});
