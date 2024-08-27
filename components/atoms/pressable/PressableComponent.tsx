import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  ViewStyle,
} from "react-native";
import React, { useCallback, useState } from "react";

const PressableComponent = (props: PressableProps) => {
  const [pressed, setPressed] = useState(false);

  const handlePressIn = useCallback(
    (event: GestureResponderEvent) => {
      setPressed(true);
      props.onPressIn && props.onPressIn(event);
    },
    [props]
  );

  const handlePressOut = useCallback(
    (event: GestureResponderEvent) => {
      setPressed(false);
      props.onPressOut && props.onPressOut(event);
    },
    [props]
  );

  const stylesFromProps = props.style as ViewStyle;

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{
        opacity: pressed ? 0.5 : 1,
        ...stylesFromProps,
      }}
      {...props}
    />
  );
};

export default PressableComponent;
