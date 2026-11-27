export type NotificationCategory =
  | "recovery"
  | "legal"
  | "community"
  | "billing"
  | "content"
  | "privacy";

export type NotificationIcon =
  | "clock"
  | "shield"
  | "message"
  | "card"
  | "file"
  | "key"
  | "trash";

export type AppNotification = {
  id: string;
  title: string;
  meta: string;
  time: string;
  href: string;
  actionLabel: string;
  unread: boolean;
  category: NotificationCategory;
  icon: NotificationIcon;
};
