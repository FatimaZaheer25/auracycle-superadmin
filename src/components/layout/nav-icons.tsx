import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  CreditCard,
  FileText,
  LayoutDashboard,
  Lock,
  MessagesSquare,
  RefreshCw,
  ScrollText,
  Shield,
  Users,
} from "lucide-react";
import type { AdminNavIcon } from "@/lib/constants/nav";

export const NAV_ICONS: Record<AdminNavIcon, LucideIcon> = {
  layoutDashboard: LayoutDashboard,
  users: Users,
  refreshCw: RefreshCw,
  bookOpen: BookOpen,
  fileText: FileText,
  messagesSquare: MessagesSquare,
  creditCard: CreditCard,
  shield: Shield,
  lock: Lock,
  scrollText: ScrollText,
};
