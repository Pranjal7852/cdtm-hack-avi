
import { Badge } from "@/components/ui/badge";

export const renderStatusBadge = (status: string) => {
  switch(status) {
    case "confirmed":
      return <Badge className="bg-green-500">Confirmed</Badge>;
    case "pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "cancelled":
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return null;
  }
};

export const renderMetricStatus = (status: string) => {
  switch(status) {
    case "normal":
      return <Badge className="bg-green-500">Normal</Badge>;
    case "elevated":
      return <Badge variant="secondary">Elevated</Badge>;
    case "high":
      return <Badge variant="destructive">High</Badge>;
    default:
      return null;
  }
};
