import { Suspense } from "react";
import { UsersView } from "@/components/features/users";
import { Card, CardContent } from "@/components/ui";

function UsersFallback() {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-muted">Loading users…</p>
      </CardContent>
    </Card>
  );
}

export default function UsersPage() {
  return (
    <Suspense fallback={<UsersFallback />}>
      <UsersView />
    </Suspense>
  );
}
