import { NotificationsView } from "@/components/features/notifications";
import {
  notifications,
  notificationsPageMeta,
} from "@/mock/notifications";

export default function NotificationsPage() {
  return (
    <NotificationsView
      subtitle={notificationsPageMeta.subtitle}
      items={notifications}
    />
  );
}
