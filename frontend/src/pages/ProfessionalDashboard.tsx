
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, Users, ChartBar } from "lucide-react";
import Navbar from "@/components/Navbar";
import AppointmentDetailsDialog from "@/components/AppointmentDetailsDialog";
import PatientDetailsDialog from "@/components/PatientDetailsDialog";

const ProfessionalDashboard = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isPatientDialogOpen, setIsPatientDialogOpen] = useState(false);

  // Mock data for upcoming visits
  const upcomingVisits = [
    { id: 1, patientName: "Jane Smith", date: "May 11, 2025", time: "09:30 AM", type: "Annual Check-up" },
    { id: 2, patientName: "Robert Johnson", date: "May 11, 2025", time: "11:00 AM", type: "Follow-up" },
    { id: 3, patientName: "Emily Davis", date: "May 12, 2025", time: "10:15 AM", type: "Consultation" },
    { id: 4, patientName: "Michael Brown", date: "May 12, 2025", time: "02:30 PM", type: "Vaccination" },
  ];

  // Mock data for patient summaries with extended details
  const patientSummaries = [
    { 
      id: 101, 
      name: "Jane Smith", 
      age: 42, 
      lastVisit: "Apr 10, 2025", 
      condition: "Hypertension", 
      notes: "Blood pressure has stabilized with current medication.",
      gender: "Female",
      dateOfBirth: "Jan 15, 1983",
      contactNumber: "555-123-4567",
      email: "jane.smith@example.com",
      address: "123 Maple Street, Springfield",
      emergencyContact: "John Smith (Husband) - 555-987-6543",
      bloodType: "A+",
      allergies: ["Penicillin", "Peanuts"],
      medications: [
        { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
        { name: "Aspirin", dosage: "81mg", frequency: "Once daily" }
      ],
      medicalHistory: [
        { condition: "Hypertension", diagnosedDate: "Mar 2023", status: "Active" },
        { condition: "Appendectomy", diagnosedDate: "Jun 2015", status: "Resolved" }
      ],
      visitHistory: [
        { 
          date: "Apr 10, 2025", 
          reason: "Blood pressure follow-up", 
          notes: "BP readings: 128/82. Maintaining current medication regimen.", 
          provider: "Dr. Williams" 
        },
        { 
          date: "Jan 15, 2025", 
          reason: "Annual physical", 
          notes: "All vitals normal. Blood tests within normal ranges.", 
          provider: "Dr. Williams" 
        }
      ]
    },
    { 
      id: 102, 
      name: "Robert Johnson", 
      age: 35, 
      lastVisit: "Apr 25, 2025", 
      condition: "Diabetes Type 2", 
      notes: "Recent lab tests show improved glucose levels.",
      gender: "Male",
      dateOfBirth: "Mar 22, 1990",
      contactNumber: "555-234-5678",
      email: "robert.johnson@example.com",
      address: "456 Oak Avenue, Riverside",
      emergencyContact: "Sarah Johnson (Wife) - 555-876-5432",
      bloodType: "O+",
      allergies: ["Sulfa drugs"],
      medications: [
        { name: "Metformin", dosage: "1000mg", frequency: "Twice daily" },
        { name: "Glipizide", dosage: "5mg", frequency: "Once daily before breakfast" }
      ],
      medicalHistory: [
        { condition: "Type 2 Diabetes", diagnosedDate: "Feb 2022", status: "Active" },
        { condition: "Mild obesity", diagnosedDate: "Feb 2022", status: "Improving" }
      ],
      visitHistory: [
        { 
          date: "Apr 25, 2025", 
          reason: "Diabetes check-up", 
          notes: "A1C levels improved to 6.8 from 7.2. Continue current treatment plan.", 
          provider: "Dr. Martinez" 
        },
        { 
          date: "Jan 25, 2025", 
          reason: "Diabetes follow-up", 
          notes: "A1C at 7.2. Advised increased physical activity.", 
          provider: "Dr. Martinez" 
        }
      ]
    },
    { 
      id: 103, 
      name: "Emily Davis", 
      age: 28, 
      lastVisit: "Mar 15, 2025", 
      condition: "Anxiety", 
      notes: "Responding well to therapy, considering medication reduction.",
      gender: "Female",
      dateOfBirth: "Sep 5, 1997",
      contactNumber: "555-345-6789",
      email: "emily.davis@example.com",
      address: "789 Pine Road, Hillside",
      emergencyContact: "Michael Davis (Brother) - 555-765-4321",
      bloodType: "B-",
      allergies: [],
      medications: [
        { name: "Sertraline", dosage: "50mg", frequency: "Once daily" }
      ],
      medicalHistory: [
        { condition: "General Anxiety Disorder", diagnosedDate: "Nov 2022", status: "Improving" }
      ],
      visitHistory: [
        { 
          date: "Mar 15, 2025", 
          reason: "Mental health check-up", 
          notes: "Patient reports decreased anxiety symptoms. Sleep has improved.", 
          provider: "Dr. Thompson" 
        },
        { 
          date: "Dec 10, 2024", 
          reason: "Anxiety follow-up", 
          notes: "Some improvement with current medication dosage.", 
          provider: "Dr. Thompson" 
        }
      ]
    },
  ];

  const handleViewDetails = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleViewPatientDetails = (patientName: string) => {
    // Find patient by name
    const patient = patientSummaries.find(p => p.name === patientName);
    if (patient) {
      setSelectedPatient(patient);
      setIsPatientDialogOpen(true);
    }
  };

  const handleClosePatientDialog = () => {
    setIsPatientDialogOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Professional Dashboard</h1>
          <Button className="bg-mov-orange hover:bg-mov-dark-orange">
            Schedule New Appointment
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-mov-orange" />
                8
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <Clock className="mr-2 h-4 w-4 text-mov-orange" />
                5
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <Users className="mr-2 h-4 w-4 text-mov-orange" />
                142
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                <ChartBar className="mr-2 h-4 w-4 text-mov-orange" />
                37
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming" className="mb-8">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Visits</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>
                  Your scheduled appointments for the next few days
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                    {upcomingVisits.map((visit) => (
                      <TableRow key={visit.id}>
                        <TableCell className="font-medium">{visit.patientName}</TableCell>
                        <TableCell>{visit.date}</TableCell>
                        <TableCell>{visit.time}</TableCell>
                        <TableCell>{visit.type}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleViewDetails(visit)}
                            >
                              Appointment Details
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-blue-500"
                              onClick={() => handleViewPatientDetails(visit.patientName)}
                            >
                              Patient Details
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Tasks & Reminders</CardTitle>
                <CardDescription>
                  Important tasks and reminders for your practice
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-4 border rounded-md">
                    <div className="w-4 h-4 rounded-full bg-yellow-400 mr-4"></div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Review Lab Results</h4>
                      <p className="text-sm text-muted-foreground">Patient: Robert Johnson - Blood work from May 5</p>
                    </div>
                    <Button variant="outline" size="sm">Complete</Button>
                  </div>

                  <div className="flex items-center p-4 border rounded-md">
                    <div className="w-4 h-4 rounded-full bg-red-400 mr-4"></div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Update Treatment Plan</h4>
                      <p className="text-sm text-muted-foreground">Patient: Emily Davis - Anxiety treatment review</p>
                    </div>
                    <Button variant="outline" size="sm">Complete</Button>
                  </div>

                  <div className="flex items-center p-4 border rounded-md">
                    <div className="w-4 h-4 rounded-full bg-green-400 mr-4"></div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Sign Medical Certificates</h4>
                      <p className="text-sm text-muted-foreground">3 certificates pending signature</p>
                    </div>
                    <Button variant="outline" size="sm">Complete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {selectedAppointment && (
        <AppointmentDetailsDialog 
          isOpen={isDialogOpen} 
          onClose={handleCloseDialog} 
          appointment={selectedAppointment} 
        />
      )}

      {selectedPatient && (
        <PatientDetailsDialog
          isOpen={isPatientDialogOpen}
          onClose={handleClosePatientDialog}
          patient={selectedPatient}
        />
      )}
    </>
  );
};

export default ProfessionalDashboard;
