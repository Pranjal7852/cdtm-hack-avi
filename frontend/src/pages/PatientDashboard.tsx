
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { DashboardSummaryCards } from "@/components/patient/DashboardSummaryCards";
import { OverviewTab } from "@/components/patient/OverviewTab";
import { AppointmentsTab } from "@/components/patient/AppointmentsTab";
import { MedicalRecordsTab } from "@/components/patient/MedicalRecordsTab";
import { HealthMetricsTab } from "@/components/patient/HealthMetricsTab";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for upcoming appointments
  const appointments = [
    { id: 1, doctorName: "Dr. Sarah Williams", specialty: "General Physician", date: "May 15, 2025", time: "10:30 AM", status: "confirmed" },
    { id: 2, doctorName: "Dr. Michael Chen", specialty: "Cardiologist", date: "May 22, 2025", time: "02:00 PM", status: "pending" },
    { id: 3, doctorName: "Dr. Rebecca Johnson", specialty: "Dermatologist", date: "June 3, 2025", time: "11:15 AM", status: "confirmed" },
  ];

  // Mock data for health metrics
  const healthMetrics = {
    bloodPressure: [
      { date: "May 7, 2025", value: "120/80", status: "normal" },
      { date: "Apr 30, 2025", value: "118/78", status: "normal" },
      { date: "Apr 23, 2025", value: "122/82", status: "normal" },
    ],
    weight: [
      { date: "May 7, 2025", value: "68 kg", status: "normal" },
      { date: "Apr 30, 2025", value: "68.5 kg", status: "normal" },
      { date: "Apr 23, 2025", value: "69 kg", status: "normal" },
    ],
    glucose: [
      { date: "May 7, 2025", value: "95 mg/dL", status: "normal" },
      { date: "Apr 30, 2025", value: "97 mg/dL", status: "normal" },
      { date: "Apr 23, 2025", value: "94 mg/dL", status: "normal" },
    ]
  };

  // Mock data for medications
  const medications = [
    { id: 1, name: "Lisinopril", dosage: "10mg", frequency: "Once daily", notes: "Take in the morning" },
    { id: 2, name: "Atorvastatin", dosage: "20mg", frequency: "Once daily", notes: "Take in the evening" },
    { id: 3, name: "Metformin", dosage: "500mg", frequency: "Twice daily", notes: "Take with meals" },
  ];
  
  // Mock data for uploaded files
  const medicalFiles = [
    { id: 1, name: "Blood Test Results", type: "PDF", date: "May 2, 2025", size: "1.2 MB", category: "Lab Results" },
    { id: 2, name: "X-Ray Report", type: "PDF", date: "Apr 15, 2025", size: "3.5 MB", category: "Imaging" },
    { id: 3, name: "Vaccination Record", type: "PDF", date: "Mar 28, 2025", size: "0.8 MB", category: "Records" },
    { id: 4, name: "Prescription", type: "PDF", date: "May 5, 2025", size: "0.5 MB", category: "Prescriptions" },
  ];

  // Modified ePA sync status data - changing providers to file names
  const epaSyncStatus = [
    { 
      id: 1, 
      fileName: "Medical History Record", 
      lastSync: "May 8, 2025", 
      status: "synced", 
      details: "All records synchronized"
    },
    { 
      id: 2, 
      fileName: "Vaccination Records", 
      lastSync: "May 7, 2025", 
      status: "synced", 
      details: "All records synchronized"
    },
    { 
      id: 3, 
      fileName: "Insurance Claims History", 
      lastSync: "May 3, 2025", 
      status: "issue", 
      details: "Authorization needed"
    },
  ];

  // Mock data for allergies
  const allergies = ["Penicillin", "Peanuts", "Latex"];

  return (
    <>
      <Navbar />
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Patient Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, John Smith</p>
          </div>
          <Link to="/book-appointment">
            <Button className="bg-mov-orange hover:bg-mov-dark-orange">
              Book New Appointment
            </Button>
          </Link>
        </div>

        {/* Summary Cards */}
        <DashboardSummaryCards 
          appointmentsCount={appointments.length}
          medicalFilesCount={medicalFiles.length}
          medicationsCount={medications.length}
        />

        {/* Main Content with Tabs */}
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="records">Medical Records</TabsTrigger>
            <TabsTrigger value="healthmetrics">Health Metrics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <OverviewTab 
              appointments={appointments}
              healthMetrics={healthMetrics}
              medications={medications}
              allergies={allergies}
            />
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <AppointmentsTab appointments={appointments} />
          </TabsContent>

          {/* Medical Records Tab */}
          <TabsContent value="records">
            <MedicalRecordsTab 
              medicalFiles={medicalFiles} 
              epaSyncStatus={epaSyncStatus} 
            />
          </TabsContent>

          {/* Health Metrics Tab */}
          <TabsContent value="healthmetrics">
            <HealthMetricsTab healthMetrics={healthMetrics} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default PatientDashboard;
