export enum SpacerType {
    XS,
    SM,
    MD,
    LG,
    XL,
    XXL,
}

const SPACER_CONFIG = Object.freeze({
    [SpacerType.XS]: { size: 2 },
    [SpacerType.SM]: { size: 4 },
    [SpacerType.MD]: { size: 8 },
    [SpacerType.LG]: { size: 16 },
    [SpacerType.XL]: { size: 24 },
    [SpacerType.XXL]: { size: 32 },
})

export const getSpacerConfig = (type: SpacerType) => {
    return SPACER_CONFIG[type]
}