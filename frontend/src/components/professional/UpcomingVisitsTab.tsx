
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AppointmentsTable } from "./AppointmentsTable";
import { Appointment } from "@/types/patient";

interface UpcomingVisitsTabProps {
  appointments: Appointment[];
  onViewDetails: (appointment: Appointment) => void;
  onViewPatient: (patientName: string) => void;
}

export const UpcomingVisitsTab = ({ 
  appointments, 
  onViewDetails, 
  onViewPatient 
}: UpcomingVisitsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>
          Your scheduled appointments for the next few days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AppointmentsTable 
          appointments={appointments}
          onViewDetails={onViewDetails}
          onViewPatient={onViewPatient}
        />
      </CardContent>
    </Card>
  );
};
