
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Appointment } from "@/types/patient";

interface AppointmentsTableProps {
  appointments: Appointment[];
  onViewDetails: (appointment: Appointment) => void;
  onViewPatient: (patientName: string) => void;
}

export const AppointmentsTable = ({ 
  appointments, 
  onViewDetails, 
  onViewPatient 
}: AppointmentsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell className="font-medium">{appointment.patientName}</TableCell>
            <TableCell>{appointment.date}</TableCell>
            <TableCell>{appointment.time}</TableCell>
            <TableCell>{appointment.type}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onViewDetails(appointment)}
                >
                  Appointment Details
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-blue-500"
                  onClick={() => onViewPatient(appointment.patientName)}
                >
                  Patient Details
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
