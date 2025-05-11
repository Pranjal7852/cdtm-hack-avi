
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  FileText, 
  History, 
  Clipboard, 
  Shield, 
  Award, 
  Activity,
  Thermometer, 
  Droplet,
  HeartPulse,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

type PatientDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
  patient: {
    id: number;
    name: string;
    age: number;
    lastVisit: string;
    condition: string;
    notes: string;
    // Additional patient details
    gender?: string;
    dateOfBirth?: string;
    contactNumber?: string;
    email?: string;
    address?: string;
    emergencyContact?: string;
    bloodType?: string;
    allergies?: string[];
    medications?: Array<{ name: string; dosage: string; frequency: string }>;
    medicalHistory?: Array<{ condition: string; diagnosedDate: string; status: string }>;
    visitHistory?: Array<{ date: string; reason: string; notes: string; provider: string }>;
    // New fields
    insurance?: {
      provider: string;
      policyNumber: string;
      coverageType: string;
      expirationDate: string;
      copay?: string;
    };
    specialPrograms?: Array<{ name: string; enrollmentDate: string; status: string; description?: string }>;
    documents?: Array<{ 
      title: string; 
      date: string; 
      type: string; 
      uploadedBy: string; 
      url?: string;
      epaSynced?: 'synced' | 'pending' | 'not-synced'; // Added ePA sync status
      syncDate?: string; // Date when document was synced with ePA
    }>;
    vaccinations?: Array<{ name: string; date: string; provider: string; nextDose?: string; batchNumber?: string }>;
    wearableData?: {
      lastSynced?: string;
      averageSteps?: number;
      averageHeartRate?: number;
      averageSleepHours?: number;
      activityMinutes?: number;
    };
    vitalSigns?: {
      bloodPressure?: Array<{ date: string; reading: string; notes?: string }>;
      ecgData?: Array<{ date: string; result: string; heartRate: number; notes?: string }>;
      glucoseLevels?: Array<{ date: string; reading: string; timeOfDay: string; notes?: string }>;
    };
  };
};

const PatientDetailsDialog = ({ isOpen, onClose, patient }: PatientDetailsProps) => {
  if (!patient) return null;

  // Populate dummy documents if none exist
  const documents = patient.documents?.length > 0 ? patient.documents : [
    { 
      title: "Annual Blood Test Results", 
      date: "Apr 12, 2025", 
      type: "Laboratory Report", 
      uploadedBy: "Dr. Williams", 
      epaSynced: "synced",
      syncDate: "Apr 13, 2025"
    },
    { 
      title: "Chest X-Ray Report", 
      date: "Mar 05, 2025", 
      type: "Radiology", 
      uploadedBy: "Dr. Martinez", 
      epaSynced: "synced",
      syncDate: "Mar 05, 2025"
    },
    { 
      title: "Cardiology Consultation", 
      date: "Feb 18, 2025", 
      type: "Medical Report", 
      uploadedBy: "Dr. Thompson",
      epaSynced: "pending"
    },
    { 
      title: "Hospital Discharge Summary", 
      date: "Jan 22, 2025", 
      type: "Hospital Record", 
      uploadedBy: "St. Mary's Hospital", 
      epaSynced: "not-synced"
    },
    {
      title: "Allergy Test Results", 
      date: "Dec 15, 2024", 
      type: "Laboratory Report", 
      uploadedBy: "Allergy Clinic", 
      epaSynced: "synced",
      syncDate: "Dec 16, 2024"
    }
  ];

  // Helper function to render ePA sync status
  const renderEpaSyncStatus = (status: string | undefined) => {
    switch (status) {
      case "synced":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Synced with ePA
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
            <Clock className="h-3 w-3" /> Sync Pending
          </Badge>
        );
      case "not-synced":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <XCircle className="h-3 w-3" /> Not Synced
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Unknown Status
          </Badge>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <User className="mr-2 h-6 w-6 text-mov-orange" />
            Patient Details: {patient.name}
          </DialogTitle>
          <DialogDescription>
            Complete patient information and medical history
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Medical History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="monitoring">Health Monitoring</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium leading-none">Full Name</p>
                      <p className="text-sm text-muted-foreground">{patient.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">Age</p>
                      <p className="text-sm text-muted-foreground">{patient.age}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">Date of Birth</p>
                      <p className="text-sm text-muted-foreground">{patient.dateOfBirth || "Not available"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">Gender</p>
                      <p className="text-sm text-muted-foreground">{patient.gender || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">Blood Type</p>
                      <p className="text-sm text-muted-foreground">{patient.bloodType || "Not recorded"}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium leading-none">Contact Number</p>
                      <p className="text-sm text-muted-foreground">{patient.contactNumber || "Not available"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">Email</p>
                      <p className="text-sm text-muted-foreground">{patient.email || "Not available"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">Address</p>
                      <p className="text-sm text-muted-foreground">{patient.address || "Not available"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">Emergency Contact</p>
                      <p className="text-sm text-muted-foreground">{patient.emergencyContact || "Not available"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Insurance Information */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium flex items-center mb-4">
                  <Shield className="mr-2 h-5 w-5 text-mov-orange" />
                  Insurance Information
                </h3>
                {patient.insurance ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium leading-none">Provider</p>
                        <p className="text-sm">{patient.insurance.provider}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none">Policy Number</p>
                        <p className="text-sm">{patient.insurance.policyNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none">Coverage Type</p>
                        <p className="text-sm">{patient.insurance.coverageType}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium leading-none">Expiration Date</p>
                        <p className="text-sm">{patient.insurance.expirationDate}</p>
                      </div>
                      {patient.insurance.copay && (
                        <div>
                          <p className="text-sm font-medium leading-none">Copay</p>
                          <p className="text-sm">{patient.insurance.copay}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No insurance information available</p>
                )}
              </CardContent>
            </Card>

            {/* Special Programs */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="special-programs">
                <AccordionTrigger>
                  <span className="font-medium flex items-center">
                    <Award className="mr-2 h-5 w-5 text-mov-orange" />
                    Special Programs
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  {patient.specialPrograms && patient.specialPrograms.length > 0 ? (
                    <div className="space-y-4 pl-4 pt-2">
                      {patient.specialPrograms.map((program, index) => (
                        <div key={index} className="border-b pb-2">
                          <p className="font-medium">{program.name}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                            <p className="text-sm text-muted-foreground">Enrollment: {program.enrollmentDate}</p>
                            <p className="text-sm text-muted-foreground">Status: {program.status}</p>
                          </div>
                          {program.description && (
                            <p className="text-sm mt-1">{program.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground pl-4 pt-2">No special program enrollments</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium flex items-center mb-4">
                  <Clipboard className="mr-2 h-5 w-5 text-mov-orange" />
                  Current Condition
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium leading-none">Condition</p>
                    <p className="text-sm">{patient.condition}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">Clinical Notes</p>
                    <p className="text-sm">{patient.notes}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">Last Visit</p>
                    <p className="text-sm text-muted-foreground">{patient.lastVisit}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="allergies">
                <AccordionTrigger>
                  <span className="font-medium">Allergies</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4 pt-2">
                    {patient.allergies && patient.allergies.length > 0 ? (
                      <ul className="list-disc pl-4">
                        {patient.allergies.map((allergy, index) => (
                          <li key={index} className="text-sm">{allergy}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No known allergies</p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="medications">
                <AccordionTrigger>
                  <span className="font-medium">Current Medications</span>
                </AccordionTrigger>
                <AccordionContent>
                  {patient.medications && patient.medications.length > 0 ? (
                    <div className="space-y-2 pl-4 pt-2">
                      {patient.medications.map((med, index) => (
                        <div key={index} className="border-b pb-2">
                          <p className="font-medium text-sm">{med.name}</p>
                          <p className="text-sm text-muted-foreground">Dosage: {med.dosage}</p>
                          <p className="text-sm text-muted-foreground">Frequency: {med.frequency}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground pl-4 pt-2">No current medications</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* Medical History Tab */}
          <TabsContent value="history">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium flex items-center mb-4">
                  <History className="mr-2 h-5 w-5 text-mov-orange" />
                  Medical History
                </h3>
                {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
                  <div className="space-y-4">
                    {patient.medicalHistory.map((item, index) => (
                      <div key={index} className="border-b pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{item.condition}</p>
                            <p className="text-sm text-muted-foreground">Diagnosed: {item.diagnosedDate}</p>
                          </div>
                          <div className="px-2 py-1 rounded text-xs font-medium bg-gray-100">
                            {item.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No medical history available</p>
                )}
              </CardContent>
            </Card>

            {/* Vaccination History */}
            <Card className="mt-4">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium flex items-center mb-4">
                  <Shield className="mr-2 h-5 w-5 text-mov-orange" />
                  Vaccination History
                </h3>
                {patient.vaccinations && patient.vaccinations.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Vaccine</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Provider</TableHead>
                          <TableHead>Next Dose</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patient.vaccinations.map((vaccine, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{vaccine.name}</TableCell>
                            <TableCell>{vaccine.date}</TableCell>
                            <TableCell>{vaccine.provider}</TableCell>
                            <TableCell>{vaccine.nextDose || "N/A"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No vaccination records available</p>
                )}
              </CardContent>
            </Card>

            {/* Visit History */}
            <Card className="mt-4">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium flex items-center mb-4">
                  <FileText className="mr-2 h-5 w-5 text-mov-orange" />
                  Visit History
                </h3>

                {patient.visitHistory && patient.visitHistory.length > 0 ? (
                  <div className="space-y-6">
                    {patient.visitHistory.map((visit, index) => (
                      <div key={index} className="border-b pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-medium">{visit.date}</p>
                          <p className="text-sm text-muted-foreground">Provider: {visit.provider}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-1">Reason for visit:</p>
                          <p className="text-sm">{visit.reason}</p>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium mb-1">Notes:</p>
                          <p className="text-sm">{visit.notes}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No visit history available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium flex items-center mb-4">
                  <FileText className="mr-2 h-5 w-5 text-mov-orange" />
                  Documents
                </h3>
                {documents.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Uploaded By</TableHead>
                          <TableHead>ePA Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {documents.map((document, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{document.title}</TableCell>
                            <TableCell>{document.type}</TableCell>
                            <TableCell>{document.date}</TableCell>
                            <TableCell>{document.uploadedBy}</TableCell>
                            <TableCell>{renderEpaSyncStatus(document.epaSynced)}</TableCell>
                            <TableCell>
                              {document.url ? (
                                <a 
                                  href={document.url} 
                                  className="text-blue-600 hover:text-blue-800"
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                >
                                  View
                                </a>
                              ) : (
                                <span className="text-gray-400">View</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No documents available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Monitoring Tab */}
          <TabsContent value="monitoring">
            {/* Wearable Health Data */}
            <Card className="mb-4">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium flex items-center mb-4">
                  <Activity className="mr-2 h-5 w-5 text-mov-orange" />
                  Wearable Health Data
                </h3>
                {patient.wearableData ? (
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Last synced: {patient.wearableData.lastSynced || "Unknown"}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="text-sm font-medium mb-2">Daily Steps</h4>
                        <p className="text-2xl font-bold">{patient.wearableData.averageSteps?.toLocaleString() || "N/A"}</p>
                        <p className="text-xs text-muted-foreground mt-1">Daily average</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="text-sm font-medium mb-2">Heart Rate</h4>
                        <p className="text-2xl font-bold">{patient.wearableData.averageHeartRate || "N/A"} <span className="text-sm">bpm</span></p>
                        <p className="text-xs text-muted-foreground mt-1">Average resting</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="text-sm font-medium mb-2">Sleep</h4>
                        <p className="text-2xl font-bold">{patient.wearableData.averageSleepHours || "N/A"} <span className="text-sm">hours</span></p>
                        <p className="text-xs text-muted-foreground mt-1">Daily average</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="text-sm font-medium mb-2">Active Minutes</h4>
                        <p className="text-2xl font-bold">{patient.wearableData.activityMinutes || "N/A"} <span className="text-sm">min</span></p>
                        <p className="text-xs text-muted-foreground mt-1">Daily average</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No wearable health data available</p>
                )}
              </CardContent>
            </Card>

            {/* Blood Pressure Data */}
            <Collapsible className="mb-4 border rounded-lg">
              <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                <div className="flex items-center">
                  <Thermometer className="mr-2 h-5 w-5 text-mov-orange" />
                  <h3 className="text-lg font-medium">Blood Pressure</h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  {patient.vitalSigns?.bloodPressure && patient.vitalSigns.bloodPressure.length > 0 
                    ? `${patient.vitalSigns.bloodPressure.length} Readings` 
                    : "No data"}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 border-t">
                {patient.vitalSigns?.bloodPressure && patient.vitalSigns.bloodPressure.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Reading</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patient.vitalSigns.bloodPressure.map((reading, index) => (
                          <TableRow key={index}>
                            <TableCell>{reading.date}</TableCell>
                            <TableCell className="font-medium">{reading.reading}</TableCell>
                            <TableCell>{reading.notes || "-"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground pt-4">No blood pressure data available</p>
                )}
              </CollapsibleContent>
            </Collapsible>

            {/* ECG Data */}
            <Collapsible className="mb-4 border rounded-lg">
              <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                <div className="flex items-center">
                  <HeartPulse className="mr-2 h-5 w-5 text-mov-orange" />
                  <h3 className="text-lg font-medium">ECG Data</h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  {patient.vitalSigns?.ecgData && patient.vitalSigns.ecgData.length > 0 
                    ? `${patient.vitalSigns.ecgData.length} Readings` 
                    : "No data"}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 border-t">
                {patient.vitalSigns?.ecgData && patient.vitalSigns.ecgData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Heart Rate</TableHead>
                          <TableHead>Result</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patient.vitalSigns.ecgData.map((reading, index) => (
                          <TableRow key={index}>
                            <TableCell>{reading.date}</TableCell>
                            <TableCell>{reading.heartRate} bpm</TableCell>
                            <TableCell className="font-medium">{reading.result}</TableCell>
                            <TableCell>{reading.notes || "-"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground pt-4">No ECG data available</p>
                )}
              </CollapsibleContent>
            </Collapsible>

            {/* Glucose Levels */}
            <Collapsible className="mb-4 border rounded-lg">
              <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                <div className="flex items-center">
                  <Droplet className="mr-2 h-5 w-5 text-mov-orange" />
                  <h3 className="text-lg font-medium">Glucose Levels</h3>
                </div>
                <div className="text-sm text-muted-foreground">
                  {patient.vitalSigns?.glucoseLevels && patient.vitalSigns.glucoseLevels.length > 0 
                    ? `${patient.vitalSigns.glucoseLevels.length} Readings` 
                    : "No data"}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 border-t">
                {patient.vitalSigns?.glucoseLevels && patient.vitalSigns.glucoseLevels.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Reading</TableHead>
                          <TableHead>Time of Day</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patient.vitalSigns.glucoseLevels.map((reading, index) => (
                          <TableRow key={index}>
                            <TableCell>{reading.date}</TableCell>
                            <TableCell className="font-medium">{reading.reading}</TableCell>
                            <TableCell>{reading.timeOfDay}</TableCell>
                            <TableCell>{reading.notes || "-"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground pt-4">No glucose data available</p>
                )}
              </CollapsibleContent>
            </Collapsible>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetailsDialog;
