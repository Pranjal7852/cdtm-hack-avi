
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import PatientDetailsDialog from "@/components/PatientDetailsDialog";

const PatientDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isPatientDialogOpen, setIsPatientDialogOpen] = useState(false);

  // Mock data for patients with extended details
  const patientDatabase = [
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
      ],
      documents: [
        { 
          id: "doc101", 
          name: "Annual Blood Work", 
          date: "Jan 15, 2025", 
          type: "Laboratory", 
          status: "Complete",
          epaStatus: "synced"
        },
        { 
          id: "doc102", 
          name: "Cardiac Assessment", 
          date: "Mar 22, 2024", 
          type: "Examination", 
          status: "Complete",
          epaStatus: "pending"
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
      ],
      documents: [
        { 
          id: "doc201", 
          name: "Diabetes Management Plan", 
          date: "Feb 25, 2025", 
          type: "Treatment Plan", 
          status: "Active",
          epaStatus: "synced"
        },
        { 
          id: "doc202", 
          name: "Nutritional Assessment", 
          date: "Mar 15, 2025", 
          type: "Consultation", 
          status: "Complete",
          epaStatus: "not-synced"
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
      ],
      documents: [
        { 
          id: "doc301", 
          name: "Psychological Assessment", 
          date: "Nov 10, 2024", 
          type: "Evaluation", 
          status: "Complete",
          epaStatus: "synced"
        },
        { 
          id: "doc302", 
          name: "Sleep Study Results", 
          date: "Feb 02, 2025", 
          type: "Laboratory", 
          status: "Complete",
          epaStatus: "pending"
        }
      ]
    },
    { 
      id: 104, 
      name: "Thomas Wilson", 
      age: 54, 
      lastVisit: "Apr 18, 2025", 
      condition: "Arthritis", 
      notes: "Physical therapy recommended for joint pain management.",
      gender: "Male",
      dateOfBirth: "Jul 28, 1971",
      contactNumber: "555-456-7890",
      email: "thomas.wilson@example.com",
      address: "321 Elm Court, Lakeside",
      emergencyContact: "Mary Wilson (Wife) - 555-654-3210",
      bloodType: "AB+",
      allergies: ["Latex"],
      medications: [
        { name: "Naproxen", dosage: "500mg", frequency: "Twice daily as needed" },
        { name: "Glucosamine", dosage: "1500mg", frequency: "Once daily" }
      ],
      medicalHistory: [
        { condition: "Osteoarthritis", diagnosedDate: "Jan 2020", status: "Active" },
        { condition: "Hypertension", diagnosedDate: "Sep 2018", status: "Controlled" }
      ],
      visitHistory: [
        { 
          date: "Apr 18, 2025", 
          reason: "Joint pain follow-up", 
          notes: "Pain level decreased. Continuing with current pain management plan.", 
          provider: "Dr. Garcia" 
        },
        { 
          date: "Feb 18, 2025", 
          reason: "Arthritis check-up", 
          notes: "Pain in left knee worsening. Prescribed physical therapy.", 
          provider: "Dr. Garcia" 
        }
      ],
      documents: [
        { 
          id: "doc401", 
          name: "X-Ray Results", 
          date: "Feb 15, 2025", 
          type: "Imaging", 
          status: "Complete",
          epaStatus: "synced"
        },
        { 
          id: "doc402", 
          name: "Physical Therapy Plan", 
          date: "Feb 20, 2025", 
          type: "Treatment Plan", 
          status: "Active",
          epaStatus: "not-synced"
        }
      ]
    },
    { 
      id: 105, 
      name: "Sophia Kim", 
      age: 32, 
      lastVisit: "Mar 30, 2025", 
      condition: "Pregnancy", 
      notes: "Routine prenatal checkup, all parameters normal.",
      gender: "Female",
      dateOfBirth: "Apr 12, 1993",
      contactNumber: "555-567-8901",
      email: "sophia.kim@example.com",
      address: "567 Birch Lane, Westview",
      emergencyContact: "James Kim (Husband) - 555-543-2109",
      bloodType: "O-",
      allergies: [],
      medications: [
        { name: "Prenatal Vitamins", dosage: "1 tablet", frequency: "Once daily" },
        { name: "Iron Supplement", dosage: "65mg", frequency: "Once daily" }
      ],
      medicalHistory: [
        { condition: "Pregnancy", diagnosedDate: "Dec 2024", status: "Active" },
        { condition: "Iron-deficiency anemia", diagnosedDate: "Jan 2025", status: "Controlled" }
      ],
      visitHistory: [
        { 
          date: "Mar 30, 2025", 
          reason: "Prenatal checkup", 
          notes: "Fetal heartbeat normal. All measurements on track for 24 weeks.", 
          provider: "Dr. Reynolds" 
        },
        { 
          date: "Mar 02, 2025", 
          reason: "Prenatal checkup", 
          notes: "Ultrasound performed. Fetal development normal.", 
          provider: "Dr. Reynolds" 
        }
      ],
      documents: [
        { 
          id: "doc501", 
          name: "20-Week Ultrasound", 
          date: "Mar 02, 2025", 
          type: "Imaging", 
          status: "Complete",
          epaStatus: "synced"
        },
        { 
          id: "doc502", 
          name: "Birth Plan", 
          date: "Mar 30, 2025", 
          type: "Planning", 
          status: "Draft",
          epaStatus: "not-synced"
        }
      ]
    },
  ];

  // Filter patients based on search term
  const filteredPatients = patientDatabase.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPatientDetails = (patient: any) => {
    setSelectedPatient(patient);
    setIsPatientDialogOpen(true);
  };

  const handleClosePatientDialog = () => {
    setIsPatientDialogOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Patient Database</h1>
          <Button className="bg-mov-orange hover:bg-mov-dark-orange">
            Add New Patient
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Patient Search</CardTitle>
            <CardDescription>Find patients by name or condition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Patients</CardTitle>
            <CardDescription>
              Showing {filteredPatients.length} of {patientDatabase.length} total patients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.id}</TableCell>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell>{patient.condition}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-blue-500"
                        onClick={() => handleViewPatientDetails(patient)}
                      >
                        <User className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

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

export default PatientDatabase;
