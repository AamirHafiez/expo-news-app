import { View } from "react-native";
import React, { memo } from "react";
import { type SpacerProps } from "./types";
import { getSpacerConfig, SpacerType } from "./config";

const Spacer = (props: SpacerProps) => {
  const { type = SpacerType.SM } = props;

  const { size } = getSpacerConfig(type);

  return <View style={{ width: size, aspectRatio: 1 }} />;
};

export default memo(Spacer);
