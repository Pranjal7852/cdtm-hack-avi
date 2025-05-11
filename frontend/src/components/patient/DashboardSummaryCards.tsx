
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, FileText, FileCode, Heart } from "lucide-react";

type SummaryCardsProps = {
  appointmentsCount: number;
  medicalFilesCount: number;
  medicationsCount: number;
};

export const DashboardSummaryCards = ({
  appointmentsCount,
  medicalFilesCount,
  medicationsCount,
}: SummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 text-mov-orange" />
            {appointmentsCount}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Medical Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center">
            <FileText className="mr-2 h-4 w-4 text-mov-orange" />
            {medicalFilesCount}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Current Medications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center">
            <FileCode className="mr-2 h-4 w-4 text-mov-orange" />
            {medicationsCount}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Health Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center">
            <Heart className="mr-2 h-4 w-4 text-mov-orange" />
            Good
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
