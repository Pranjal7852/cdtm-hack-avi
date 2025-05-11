
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { renderStatusBadge } from "./StatusBadges";

type Appointment = {
  id: number;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: string;
};

type AppointmentsTabProps = {
  appointments: Appointment[];
};

export const AppointmentsTab = ({ appointments }: AppointmentsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Appointments</CardTitle>
        <CardDescription>Manage your upcoming and past medical appointments</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">{appointment.doctorName}</TableCell>
                <TableCell>{appointment.specialty}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{renderStatusBadge(appointment.status)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm" className="text-red-500">Cancel</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-end">
          <Link to="/book-appointment">
            <Button className="bg-mov-orange hover:bg-mov-dark-orange">Book New Appointment</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
