import React from "react";
import { type SafeAreaComponentProps } from "./types";
import { SafeAreaView } from "react-native-safe-area-context";

const SafeAreaComponent = (props: SafeAreaComponentProps) => {
  return <SafeAreaView {...props} />;
};

export default SafeAreaComponent;
