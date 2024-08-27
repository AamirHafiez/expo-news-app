import { ImageSourceType } from "@/components/atoms/image/types";

export enum HeadlineTabActions {
    DELETE,
    PIN,
    UNPIN,
}

export type HeadlineTabProps = {
    source?: string | null;
    author?: string | null;
    title: string;
    urlToImage?: ImageSourceType | null;
    publishedAt?: string | null;
    onDelete?: () => void;
    onPinned?: () => void;
    onUnpinned?: () => void;
    isPinned?: boolean;
    actions?: HeadlineTabActions[],
}

export type RightActionProps = {
    onDelete?: () => void;
    onPinned?: () => void;
    onUnpinned?: () => void;
    actions: HeadlineTabActions[],
}