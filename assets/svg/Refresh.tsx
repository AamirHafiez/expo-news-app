import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg width={28} height={28} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#000"
        fillOpacity={0.5}
        d="M22.167 9.333 17.5 14H21a6.998 6.998 0 0 1-10.273 6.19l-1.703 1.702A9.349 9.349 0 0 0 14 23.333 9.33 9.33 0 0 0 23.333 14h3.5l-4.666-4.667ZM7 14a6.998 6.998 0 0 1 10.273-6.19l1.703-1.703A9.349 9.349 0 0 0 14 4.667 9.33 9.33 0 0 0 4.667 14h-3.5l4.666 4.667L10.5 14H7Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h28v28H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
