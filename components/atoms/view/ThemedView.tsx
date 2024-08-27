import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/theme/useThemeColor";
import { forwardRef } from "react";
import { Colors } from "@/constants/Colors";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  bgColorKey?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

export const ThemedView = forwardRef(function ThemedView(
  {
    style,
    lightColor,
    darkColor,
    bgColorKey = "background",
    ...otherProps
  }: ThemedViewProps,
  ref: React.LegacyRef<View>
) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    bgColorKey
  );

  return (
    <View ref={ref} style={[{ backgroundColor }, style]} {...otherProps} />
  );
});

// export function ThemedView({
//   style,
//   lightColor,
//   darkColor,
//   ...otherProps
// }: ThemedViewProps) {
//   const backgroundColor = useThemeColor(
//     { light: lightColor, dark: darkColor },
//     "background"
//   );

//   return <View style={[{ backgroundColor }, style]} {...otherProps} />;
// }
