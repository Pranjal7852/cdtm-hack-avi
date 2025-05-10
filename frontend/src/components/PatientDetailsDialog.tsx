
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
import { User, FileText, History, Clipboard } from "lucide-react";

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
  };
};

const PatientDetailsDialog = ({ isOpen, onClose, patient }: PatientDetailsProps) => {
  if (!patient) return null;

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
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Medical History</TabsTrigger>
            <TabsTrigger value="visits">Visit History</TabsTrigger>
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
          </TabsContent>

          {/* Visit History Tab */}
          <TabsContent value="visits">
            <Card>
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
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetailsDialog;
