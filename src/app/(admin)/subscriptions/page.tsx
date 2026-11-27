import Link from "next/link";
import { DollarSign, Plus } from "lucide-react";
import {
  FeatureMatrix,
  Grandfathering,
  ScheduledChangesSection,
  TierCards,
} from "@/components/features/subscriptions";
import { Button, PageHeader } from "@/components/ui";
import {
  featureMatrix,
  grandfatherMeta,
  grandfatherSteps,
  grandfatheredPeople,
  pricingTiers,
  scheduledChanges,
} from "@/components/features/subscriptions/mock";

export default function SubscriptionsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Subscriptions & Tiers"
        description="Pricing plans, feature access, and grandfathered changes"
        actions={
          <>
            <Link href="/subscriptions/pricing">
              <Button size="sm" variant="outline" className="rounded-full gap-1.5">
                <DollarSign className="h-4 w-4" aria-hidden />
                Pricing
              </Button>
            </Link>
            <Link href="/subscriptions/schedule">
              <Button size="sm" className="rounded-full gap-1.5">
                <Plus className="h-4 w-4" aria-hidden />
                Schedule tier change
              </Button>
            </Link>
          </>
        }
      />

      <TierCards tiers={pricingTiers} />
      <FeatureMatrix rows={featureMatrix} />
      <ScheduledChangesSection
        changes={scheduledChanges}
        people={grandfatheredPeople}
      />
      <Grandfathering
        steps={grandfatherSteps}
        subtitle={grandfatherMeta.subtitle}
        footer={grandfatherMeta.footer}
      />
    </div>
  );
}
