
import { useState, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, FileText, Activity, FileUp, Stethoscope } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AppointmentDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: {
    id: number;
    patientName: string;
    date: string;
    time: string;
    type: string;
    patientAge?: number;
    patientGender?: string;
    patientHistory?: string;
    reasonForVisit?: string;
    notes?: string;
  };
}

const AppointmentDetailsDialog = ({ isOpen, onClose, appointment }: AppointmentDetailsProps) => {
  // Default values for additional details if not provided
  const patientDetails = {
    age: appointment.patientAge || 42,
    gender: appointment.patientGender || "Female",
    history: appointment.patientHistory || "Patient has a history of hypertension and seasonal allergies.",
    reasonForVisit: appointment.reasonForVisit || "Follow-up on medication effectiveness and symptom management.",
    notes: appointment.notes || "Last visit showed improvement in blood pressure readings. Continue monitoring."
  };

  // Mock uploaded documents
  const documents = [
    { id: 1, name: "Blood Work Results.pdf", date: "Apr 28, 2025", type: "Lab Results" },
    { id: 2, name: "Chest X-Ray.jpg", date: "Mar 15, 2025", type: "Imaging" },
    { id: 3, name: "Previous Prescription.pdf", date: "Feb 10, 2025", type: "Medication" },
  ];

  // AI-generated smart summary
  const [showSmartSummary, setShowSmartSummary] = useState(false);
  const smartSummary = {
    patientStatus: "Patient is showing good progress with current treatment plan for hypertension.",
    keyFindings: "Blood pressure has stabilized (125/82 avg. over last 3 readings). Recent lab work shows normal kidney function.",
    suggestedActions: "Consider reducing medication dosage if improvement continues. Schedule follow-up in 3 months.",
    alerts: "Patient reported occasional headaches - monitor closely as this could indicate blood pressure fluctuations."
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-md md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <User className="mr-2 h-5 w-5 text-mov-orange" />
            Appointment with {appointment.patientName}
          </DialogTitle>
          <DialogDescription>
            Complete details of the upcoming appointment
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="flex items-center space-x-2 p-2 rounded-md border">
            <Calendar className="h-5 w-5 text-mov-orange" />
            <div>
              <p className="font-medium">Date</p>
              <p className="text-sm text-gray-600">{appointment.date}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-2 rounded-md border">
            <Clock className="h-5 w-5 text-mov-orange" />
            <div>
              <p className="font-medium">Time</p>
              <p className="text-sm text-gray-600">{appointment.time}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-2 rounded-md border">
            <Activity className="h-5 w-5 text-mov-orange" />
            <div>
              <p className="font-medium">Appointment Type</p>
              <p className="text-sm text-gray-600">{appointment.type}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 p-2 rounded-md border">
            <User className="h-5 w-5 text-mov-orange" />
            <div>
              <p className="font-medium">Patient Details</p>
              <p className="text-sm text-gray-600">Age: {patientDetails.age}, {patientDetails.gender}</p>
            </div>
          </div>
        </div>
        
        <Collapsible className="w-full border rounded-md p-2 mb-3">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
            <div className="flex items-center">
              <Stethoscope className="h-5 w-5 text-mov-orange mr-2" />
              <h3 className="text-sm font-semibold">Smart Summary</h3>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <span className="sr-only">Toggle</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-4 w-4 transition-transform ${showSmartSummary ? "transform rotate-180" : ""}`}
                onClick={() => setShowSmartSummary(!showSmartSummary)}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm font-medium">Patient Status</p>
              <p className="text-sm text-gray-600">{smartSummary.patientStatus}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-md">
              <p className="text-sm font-medium">Key Findings</p>
              <p className="text-sm text-gray-600">{smartSummary.keyFindings}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-md">
              <p className="text-sm font-medium">Suggested Actions</p>
              <p className="text-sm text-gray-600">{smartSummary.suggestedActions}</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-md">
              <p className="text-sm font-medium">Alerts</p>
              <p className="text-sm text-gray-600">{smartSummary.alerts}</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <div className="space-y-3 mt-2">
          <div>
            <h4 className="text-sm font-semibold flex items-center mb-2">
              <FileUp className="mr-1 h-4 w-4 text-mov-orange" />
              Uploaded Documents
            </h4>
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {documents.map((doc) => (
                    <tr key={doc.id}>
                      <td className="px-3 py-2 whitespace-nowrap">{doc.name}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{doc.date}</td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          doc.type === 'Lab Results' ? 'bg-blue-100 text-blue-800' : 
                          doc.type === 'Imaging' ? 'bg-green-100 text-green-800' : 
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {doc.type}
                        </span>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-right">
                        <button className="text-mov-orange hover:text-mov-dark-orange text-sm">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold flex items-center">
              <FileText className="mr-1 h-4 w-4 text-mov-orange" />
              Patient History
            </h4>
            <p className="text-sm mt-1 p-2 bg-gray-50 rounded-md">{patientDetails.history}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold flex items-center">
              <FileText className="mr-1 h-4 w-4 text-mov-orange" />
              Reason for Visit
            </h4>
            <p className="text-sm mt-1 p-2 bg-gray-50 rounded-md">{patientDetails.reasonForVisit}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold flex items-center">
              <FileText className="mr-1 h-4 w-4 text-mov-orange" />
              Notes from Previous Visit
            </h4>
            <p className="text-sm mt-1 p-2 bg-gray-50 rounded-md">{patientDetails.notes}</p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:justify-between">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <div className="space-x-2">
            <Button variant="outline" className="border-mov-orange text-mov-orange hover:bg-mov-orange/10">
              Edit Notes
            </Button>
            <Button className="bg-mov-orange hover:bg-mov-dark-orange">
              Start Consultation
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetailsDialog;
