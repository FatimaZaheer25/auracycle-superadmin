import { DataRequestsView } from "@/components/features/privacy-consent/data-requests-view";
import {
  dataRequestQueue,
  dataRequestQueueKpis,
  dataRequestsPageMeta,
  deletionProgressById,
} from "@/mock/privacy-consent";

export default function DataRequestsPage() {
  return (
    <DataRequestsView
      subtitle={dataRequestsPageMeta.subtitle}
      kpis={dataRequestQueueKpis}
      queue={dataRequestQueue}
      progressById={deletionProgressById}
    />
  );
}
