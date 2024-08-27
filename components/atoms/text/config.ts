import { StyleSheet } from "react-native"

export enum TextType {
    H2,
    B2,
    CAPTION,
}

export enum TextVariant {
    Text, MUTED, ON_ACCENT
}

export enum FontFamily {
    BLACK = "SatoshiBlack",
    BLACK_ITALIC = "SatoshiBlackItalic",
    BOLD = "SatoshiBold",
    BOLD_ITALIC = "SatoshiBoldItalic",
    ITALIC = "SatoshiItalic",
    LIGHT = "SatoshiLight",
    LIGHT_ITALIC = "SatoshiLightItalic",
    MEDIUM = "SatoshiMedium",
    MEDIUM_ITALIC = "SatoshiMediumItalic",
    REGULAR = "SatoshiRegular",
}

const TEXT_CONFIG = StyleSheet.create({
    [TextType.H2]: {
        fontSize: 18,
        lineHeight: 24.3,
        fontFamily: "SatoshiBold"
    },
    [TextType.B2]: {
        fontSize: 14,
        lineHeight: 18.9,
        fontFamily: "SatoshiRegular"
    },
    [TextType.CAPTION]: {
        fontSize: 12,
        lineHeight: 16.2,
        fontFamily: "SatoshiRegular"
    },
})

export const getTextConfig = (type: TextType) => {
    return TEXT_CONFIG[type] 
}

export const getTextVariant = (variant: TextVariant) => {
    switch (variant) {
        case TextVariant.Text: return "text";
        case TextVariant.MUTED: return "muted";
        case TextVariant.ON_ACCENT: return "onAccent";
    }
}