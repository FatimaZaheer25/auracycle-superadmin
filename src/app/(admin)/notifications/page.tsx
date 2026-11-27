import { NotificationsView } from "@/components/features/notifications";
import {
  notifications,
  notificationsPageMeta,
} from "@/components/features/notifications/mock";

export default function NotificationsPage() {
  return (
    <NotificationsView
      subtitle={notificationsPageMeta.subtitle}
      items={notifications}
    />
  );
}
