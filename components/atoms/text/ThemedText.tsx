import { Text } from "react-native";

import { useThemeColor } from "@/hooks/theme/useThemeColor";
import { ThemedTextProps } from "./types";
import { getTextConfig, getTextVariant, TextType, TextVariant } from "./config";
import { memo } from "react";

function ThemedText({
  style,
  lightColor,
  darkColor,
  type = TextType.B2,
  variant = TextVariant.Text,
  ...rest
}: ThemedTextProps) {
  const colorKey = getTextVariant(variant);

  const color = useThemeColor({ light: lightColor, dark: darkColor }, colorKey);

  const textConfigStyles = getTextConfig(type);

  return <Text style={[{ color, ...textConfigStyles }, style]} {...rest} />;
}

export const MemoizedThemedText = memo(ThemedText);

export default ThemedText;
