import Delete from "@/assets/svg/Delete";
import Pin from "@/assets/svg/Pin";
import { HeadlineTabActions } from "./types";

export const ACTION_BUTTONS = Object.freeze({
  [HeadlineTabActions.DELETE]: {
    icon: <Delete />,
    label: "Delete",
  },
  [HeadlineTabActions.PIN]: {
    icon: <Pin />,
    label: "Pin",
  },
  [HeadlineTabActions.UNPIN]: {
    icon: <Pin />,
    label: "Unpin",
  },
});
