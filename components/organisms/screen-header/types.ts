import { ImageSourceType } from "@/components/atoms/image/types"

export type RefreshLogoHeaderProps = {
    imageSource?: ImageSourceType,
    onRefreshPress: () => void
}