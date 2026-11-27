import { PricingView } from "@/components/features/subscriptions/pricing-view";
import { pricingDefaults, pricingRegions } from "@/components/features/subscriptions/mock";

export default function PricingPage() {
  return (
    <PricingView defaults={pricingDefaults} regions={pricingRegions} />
  );
}
