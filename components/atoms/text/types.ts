import { type TextProps } from "react-native";
import { TextType, TextVariant } from "./config";

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?: TextType;
    variant?: TextVariant;
  };