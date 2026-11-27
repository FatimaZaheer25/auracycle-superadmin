import { PricingView } from "@/components/features/subscriptions/pricing-view";
import { pricingDefaults, pricingRegions } from "@/mock/subscriptions";

export default function PricingPage() {
  return (
    <PricingView defaults={pricingDefaults} regions={pricingRegions} />
  );
}
