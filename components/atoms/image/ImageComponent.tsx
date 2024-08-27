import React, { memo } from "react";
import { type ImageComponentProps } from "./types";
import { Image } from "expo-image";

const ImageComponent = (props: ImageComponentProps) => {
  return <Image {...props} />;
};

export const MemoizedImage = memo(ImageComponent);

export default ImageComponent;
