import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";

const SvgComponent = (props: SvgProps) => (
  <Svg width={21} height={20} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M20.24 5.74 14.76.26a.866.866 0 0 0-1.238 0c-.066.066-1.652 1.697-1.044 3.827L10 6.565c-1.37-.413-4.87-1.13-7.457 1.457a.866.866 0 0 0 0 1.239L6.283 13 .76 18.522a.866.866 0 0 0 0 1.239c.174.152.391.239.609.239a.858.858 0 0 0 .608-.26L7.5 14.216l3.74 3.74c.173.173.39.26.608.26a.858.858 0 0 0 .608-.26c2.588-2.587 1.87-6.11 1.457-7.457l2.478-2.478c2.13.608 3.74-.979 3.826-1.044a.848.848 0 0 0 .022-1.239Zm-3.675.477a.865.865 0 0 0-.978.174l-3.26 3.261c-.24.24-.327.63-.197.935 0 0 .392.978.457 2.24.065 1.26-.196 2.325-.783 3.217L8.11 12.39 4.413 8.696C6.739 7.13 9.739 8.304 9.87 8.37c.326.13.695.065.956-.196l3.261-3.261a.866.866 0 0 0 .174-.978c-.304-.652-.196-1.24 0-1.696l4 4c-.435.174-1.044.283-1.696-.022Zm-5.152 4.718c.022.065.304.695.283 1.37 0 .412-.348.739-.761.739h-.022c-.413-.022-.76-.37-.74-.783 0-.283-.108-.609-.151-.717a.748.748 0 0 1 .391-1c.391-.153.848 0 1 .39Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h20v20H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const PinSM = (props: SvgProps) => (
  <Svg width={10} height={10} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#000"
        d="M9.87 2.87 7.13.13a.433.433 0 0 0-.62 0c-.032.033-.825.848-.52 1.913l-1.24 1.24c-.685-.207-2.435-.566-3.728.728a.433.433 0 0 0 0 .62L2.892 6.5.13 9.26a.433.433 0 0 0 0 .62c.087.077.196.12.305.12a.43.43 0 0 0 .304-.13L3.5 7.109l1.87 1.87a.43.43 0 0 0 .304.13.43.43 0 0 0 .304-.13c1.294-1.294.935-3.055.729-3.729l1.239-1.24c1.065.305 1.87-.488 1.913-.52a.424.424 0 0 0 .01-.62Zm-1.837.239a.433.433 0 0 0-.49.087l-1.63 1.63a.44.44 0 0 0-.098.467s.196.49.228 1.12c.033.63-.097 1.163-.39 1.609L3.803 6.196 1.957 4.348c1.163-.783 2.663-.196 2.728-.163a.438.438 0 0 0 .478-.098l1.63-1.63a.433.433 0 0 0 .087-.49.999.999 0 0 1 0-.847l2 2a1.044 1.044 0 0 1-.847-.011ZM5.457 5.467c.01.033.152.348.14.685 0 .207-.173.37-.38.37h-.01c-.207-.011-.38-.185-.37-.392 0-.14-.054-.304-.076-.358a.374.374 0 0 1 .196-.5c.195-.076.423 0 .5.195Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h10v10H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default SvgComponent;
