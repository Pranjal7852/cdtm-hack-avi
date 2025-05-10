import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, FileImage, Smartphone, Clock, Check, Star, FileHeart, FileCode, FileWarning, FileQuestion, ClipboardCheck, HeartPulse, CircleCheck, Send, Camera, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Define a proper type for chat messages
type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};
const AppointmentConfirmation = () => {
  const location = useLocation();
  const appointmentDetails = location.state?.appointmentDetails || {
    service: "General Consultation",
    date: "12 May",
    time: "10:00 AM",
    location: "Berlin Mitte Clinic",
    practitioner: "Dr. Schmidt - General Medicine",
    confirmationNumber: "MOV-2025-54321"
  };
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);
  const [programEnrollment, setProgramEnrollment] = useState<string | null>(null);
  const [chronicConditions, setChronicConditions] = useState<string[]>([]);
  const [isHausarztOpen, setIsHausarztOpen] = useState(false);
  const [isDmpOpen, setIsDmpOpen] = useState(false);
  const [isOptionalDocumentsOpen, setIsOptionalDocumentsOpen] = useState(false);
  const [patientNote, setPatientNote] = useState("");
  const [aiMessages, setAiMessages] = useState<ChatMessage[]>([{
    role: 'assistant',
    content: "Hello! Feel free to share any additional information about your health that might be helpful for your upcoming appointment. What would you like to note in your health logbook?"
  }]);
  const [messageInput, setMessageInput] = useState("");
  
  const handleFileUpload = (documentType: string) => {
    // In a real app, this would handle actual file uploads
    setUploadedDocuments(prev => [...prev, documentType]);
  };
  
  const handleUploadButtonClick = (documentId: string) => {
    toast(
      <div className="flex flex-col space-y-2">
        <h3 className="font-semibold">Choose upload method</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 flex items-center gap-1" 
            onClick={() => {
              toast.dismiss();
              toast.success("File upload started", {
                description: `Uploading document: ${documentId}`
              });
              handleFileUpload(documentId);
            }}
          >
            <Upload className="h-4 w-4" /> Upload File
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 flex items-center gap-1"
            onClick={() => {
              toast.dismiss();
              toast.success("Camera activated", {
                description: `Capturing document: ${documentId}`
              });
              handleFileUpload(documentId);
            }}
          >
            <Camera className="h-4 w-4" /> Camera Scan
          </Button>
        </div>
      </div>,
      {
        duration: 10000,
        position: "top-center",
      }
    );
  };
  
  const handleProgramSelection = (program: string) => {
    setProgramEnrollment(program);
  };
  
  const handleConditionToggle = (condition: string) => {
    setChronicConditions(prev => prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]);
  };
  
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const updatedMessages: ChatMessage[] = [...aiMessages, {
      role: 'user',
      content: messageInput
    }];
    setAiMessages(updatedMessages);

    // Simulate AI response
    setTimeout(() => {
      setAiMessages([...updatedMessages, {
        role: 'assistant',
        content: "Thank you for sharing this information. Your notes have been saved and will be available to your healthcare provider before your appointment."
      }]);
    }, 1000);

    // Add to patient notes
    setPatientNote(prev => prev ? `${prev}\n\n${messageInput}` : messageInput);
    setMessageInput("");
  };
  
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link to="/" className="inline-flex items-center text-gray-600 hover:text-mov-orange transition-colors">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Home
              </Link>
            </div>
            
            {/* 1. APPOINTMENT CONFIRMATION SECTION */}
            <section className="mb-10">
              <div className="bg-mov-light-orange rounded-lg p-4 mb-6 border border-mov-orange">
                <div className="flex items-center justify-center">
                  <CheckCircleIcon className="text-mov-orange h-8 w-8 mr-3" />
                  <div>
                    <h2 className="text-xl font-bold text-mov-orange">Appointment Confirmed!</h2>
                    <p className="text-gray-700">We've sent the details to your contact information.</p>
                  </div>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-6">Important Information</h1>
              
              {/* New Side-by-Side Layout for Appointment Info and Documents */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {/* Left: Appointment Information */}
                <Card className="shadow-md border-mov-orange/20">
                  <CardHeader className="bg-mov-soft-gray border-b pb-4">
                    <CardTitle className="flex items-center text-xl text-mov-orange">
                      <Clock className="mr-2 h-5 w-5" /> 
                      Appointment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableHead className="w-1/3 font-medium">Service</TableHead>
                          <TableCell>{appointmentDetails.service}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableHead className="w-1/3 font-medium">Date</TableHead>
                          <TableCell>{appointmentDetails.date}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableHead className="w-1/3 font-medium">Time</TableHead>
                          <TableCell>{appointmentDetails.time}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableHead className="w-1/3 font-medium">Location</TableHead>
                          <TableCell>{appointmentDetails.location}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableHead className="w-1/3 font-medium">Practitioner</TableHead>
                          <TableCell>{appointmentDetails.practitioner}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableHead className="w-1/3 font-medium">Confirmation #</TableHead>
                          <TableCell>{appointmentDetails.confirmationNumber}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                {/* Right: Required Documents */}
                <div>
                  <Card className="shadow-md border-mov-orange/20">
                    <CardHeader className="bg-mov-soft-gray border-b pb-4">
                      <CardTitle className="flex items-center text-xl text-mov-orange">
                        <FileText className="mr-2 h-5 w-5" /> 
                        Required Documents
                      </CardTitle>
                      <CardDescription className="mt-2 font-bold text-gray-800">
                        These documents MUST be uploaded at least 2 hours before your visit.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                        {[{
                        icon: <FileCode className="h-5 w-5 text-mov-orange mr-2" />,
                        title: "Previous Medical History",
                        description: "Previous diagnoses and treatments",
                        id: "Medical History"
                      }, {
                        icon: <FileCode className="h-5 w-5 text-mov-orange mr-2" />,
                        title: "Current Medications",
                        description: "List of medications you are currently taking",
                        id: "Medications"
                      }, {
                        icon: <FileWarning className="h-5 w-5 text-mov-orange mr-2" />,
                        title: "Allergy Information",
                        description: "Details about any allergies or adverse reactions",
                        id: "Allergy Information"
                      }, {
                        icon: <FileQuestion className="h-5 w-5 text-mov-orange mr-2" />,
                        title: "Vaccination History",
                        description: "Record of your vaccinations",
                        id: "Vaccination History"
                      }].map(document => <div key={document.id} className="bg-white rounded-lg p-3 flex justify-between items-center border border-gray-100">
                            <div className="flex items-center">
                              {document.icon}
                              <div>
                                <h3 className="font-medium text-sm">{document.title}</h3>
                                <p className="text-xs text-gray-500">{document.description}</p>
                              </div>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className={uploadedDocuments.includes(document.id) ? "border-green-500 text-green-500" : "border-mov-orange text-mov-orange"}
                              onClick={() => uploadedDocuments.includes(document.id) ? {} : handleUploadButtonClick(document.id)}
                            >
                              {uploadedDocuments.includes(document.id) ? "Uploaded" : "Upload"}
                            </Button>
                          </div>)}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-6">Additional Information</h1>
              
              <p className="text-gray-600 text-lg mb-8">Help us help you by providing more information about your health.</p>
              
              {/* MOVED: Optional Documents Section - Full Width */}
              <Card className="shadow-md border-mov-orange/20 mb-8">
                <CardHeader className="bg-mov-soft-gray border-b pb-4">
                  <CardTitle className="flex items-center text-xl text-mov-orange">
                    <FileImage className="mr-2 h-5 w-5" /> 
                    Optional Documents
                  </CardTitle>
                  <CardDescription>These documents are not required but may be helpful for your visit</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[{
                    icon: <FileHeart className="h-5 w-5 text-mov-orange mr-2" />,
                    title: "Lab Reports",
                    description: "Recent blood work or other laboratory test results",
                    id: "Lab Reports"
                  }, {
                    icon: <FileText className="h-5 w-5 text-mov-orange mr-2" />,
                    title: "Doctor Letters",
                    description: "Referral letters or documents from other healthcare providers",
                    id: "Doctor Letters"
                  }, {
                    icon: <FileImage className="h-5 w-5 text-mov-orange mr-2" />,
                    title: "Imaging Studies",
                    description: "X-rays, MRIs, CT scans, or other medical images",
                    id: "Imaging Studies"
                  }, {
                    icon: <FileText className="h-5 w-5 text-mov-orange mr-2" />,
                    title: "Insurance Information",
                    description: "Insurance card or coverage details",
                    id: "Insurance Information"
                  }, {
                    icon: <FileText className="h-5 w-5 text-mov-orange mr-2" />,
                    title: "Previous Treatment Plans",
                    description: "Documents outlining previous treatment approaches",
                    id: "Previous Treatment Plans"
                  }, {
                    icon: <FileText className="h-5 w-5 text-mov-orange mr-2" />,
                    title: "Specialist Reports",
                    description: "Reports from specialist consultations",
                    id: "Specialist Reports"
                  }].map(document => <div key={document.id} className="bg-white rounded-lg p-3 flex justify-between items-center border border-gray-100">
                        <div className="flex items-center">
                          {document.icon}
                          <div>
                            <h3 className="font-medium text-sm">{document.title}</h3>
                            <p className="text-xs text-gray-500">{document.description}</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={uploadedDocuments.includes(document.id) ? "border-green-500 text-green-500" : "border-mov-orange text-mov-orange"} 
                          onClick={() => uploadedDocuments.includes(document.id) ? {} : handleUploadButtonClick(document.id)}
                        >
                          {uploadedDocuments.includes(document.id) ? "Uploaded" : "Upload"}
                        </Button>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
              
              {/* Patient Logbook / AI Chat */}
              <Card className="shadow-md border-mov-orange/20 mb-8">
                <CardHeader className="bg-mov-soft-gray border-b pb-4">
                  <CardTitle className="flex items-center text-xl text-mov-orange">
                    <FileHeart className="mr-2 h-5 w-5" /> 
                    Health Logbook
                  </CardTitle>
                  <CardDescription>
                    Share additional health information or concerns before your visit
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ScrollArea className="mb-4 h-[70px] p-2 bg-gray-50 rounded-lg py-0 px-0">
                    {aiMessages.map((message, index) => <div key={index} className={`mb-3 p-3 rounded-lg ${message.role === 'assistant' ? 'bg-mov-light-orange border-l-4 border-mov-orange' : 'bg-white border border-gray-200 ml-8'}`}>
                        <p className="text-sm">
                          {message.role === 'assistant' && <strong>MOV Health Assistant: </strong>}
                          {message.content}
                        </p>
                      </div>)}
                  </ScrollArea>
                  
                  <div className="flex gap-2">
                    <Input value={messageInput} onChange={e => setMessageInput(e.target.value)} placeholder="Type your health notes or questions here..." className="flex-grow" onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }} />
                    <Button className="bg-mov-orange hover:bg-mov-dark-orange" onClick={handleSendMessage}>
                      <Send className="h-4 w-4 mr-1" /> Send
                    </Button>
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-500">
                    <p>Your information will be securely stored and shared only with your healthcare provider</p>
                  </div>
                </CardContent>
              </Card>
            </section>
            
            {/* 3. SIDE BY SIDE SECTION */}
            <section className="mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Add App to Home Screen */}
                <Card className="border-mov-orange/30 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-mov-orange">Add MOV Health to Home Screen</CardTitle>
                    <CardDescription>Get the most from your healthcare experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Access your appointments, medical records, and communicate with your healthcare providers all in one place.</p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Manage all your appointments</li>
                      <li>Secure messaging with practitioners</li>
                      <li>Access test results and prescriptions</li>
                      <li>Set medication reminders</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-mov-orange hover:bg-mov-dark-orange text-white">
                      <Smartphone className="mr-2 h-4 w-4" /> Add to Home Screen
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Right: Health Program Eligibility */}
                <Card className="border-gray-200 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <ClipboardCheck className="h-5 w-5 text-mov-orange mr-2" />
                      Health Program Eligibility
                    </CardTitle>
                    <CardDescription>You may be eligible for special healthcare programs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-3">
                      <Collapsible open={isHausarztOpen} onOpenChange={setIsHausarztOpen}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <CircleCheck className="h-5 w-5 text-mov-orange mr-2 flex-shrink-0" />
                            <div>
                              <h3 className="font-medium">Hausarztprogramm</h3>
                              <p className="text-xs text-gray-500">Primary Care Physician Program</p>
                            </div>
                          </div>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              {isHausarztOpen ? "Less" : "More"}
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        
                        <CollapsibleContent>
                          <div className="pt-2 pb-4">
                            <Alert className="mb-4 bg-mov-soft-gray">
                              <AlertTitle className="text-mov-dark-orange">What is the Hausarztprogramm?</AlertTitle>
                              <AlertDescription>
                                The Hausarztprogramm is a special German healthcare program where you choose a primary care physician as your first point of contact for all health concerns. This ensures more coordinated and personalized care.
                              </AlertDescription>
                            </Alert>
                            
                            <div className="mb-4">
                              <h4 className="font-medium mb-2">Benefits include:</h4>
                              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                <li>Shorter waiting times for appointments</li>
                                <li>Better coordination between specialists</li>
                                <li>More comprehensive health check-ups</li>
                                <li>Reduced insurance co-payments</li>
                              </ul>
                            </div>
                            
                            <RadioGroup defaultValue="not-enrolled" className="mt-4" onValueChange={value => handleProgramSelection(value)}>
                              <div className="flex items-start space-x-2 mb-2">
                                <RadioGroupItem value="enrolled" id="enrolled-hausarzt" />
                                <Label className="font-normal" htmlFor="enrolled-hausarzt">
                                  I am already enrolled in the Hausarztprogramm
                                </Label>
                              </div>
                              <div className="flex items-start space-x-2 mb-2">
                                <RadioGroupItem value="interested" id="interested-hausarzt" />
                                <Label className="font-normal" htmlFor="interested-hausarzt">
                                  I'm interested in enrolling
                                </Label>
                              </div>
                              <div className="flex items-start space-x-2">
                                <RadioGroupItem value="not-interested" id="not-interested-hausarzt" />
                                <Label className="font-normal" htmlFor="not-interested-hausarzt">
                                  I'm not interested at this time
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-3">
                      <Collapsible open={isDmpOpen} onOpenChange={setIsDmpOpen}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <HeartPulse className="h-5 w-5 text-mov-orange mr-2 flex-shrink-0" />
                            <div>
                              <h3 className="font-medium">Disease Management Programs</h3>
                              <p className="text-xs text-gray-500">Specialized care for chronic conditions</p>
                            </div>
                          </div>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              {isDmpOpen ? "Less" : "More"}
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        
                        <CollapsibleContent>
                          <div className="pt-2 pb-4">
                            <Alert className="mb-4 bg-mov-soft-gray">
                              <AlertTitle className="text-mov-dark-orange">What are Disease Management Programs?</AlertTitle>
                              <AlertDescription>
                                Disease Management Programs (DMPs) are structured treatment programs specifically for people with chronic conditions. They offer coordinated, evidence-based care to better manage your condition and prevent complications.
                              </AlertDescription>
                            </Alert>
                            
                            <div className="mb-4">
                              <h4 className="font-medium mb-2">Do you have any of the following chronic conditions?</h4>
                              <p className="text-sm text-gray-500 mb-3">Select all that apply:</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {[{
                                id: "diabetes",
                                label: "Diabetes mellitus"
                              }, {
                                id: "asthma",
                                label: "Bronchial asthma"
                              }, {
                                id: "copd",
                                label: "COPD"
                              }, {
                                id: "chd",
                                label: "Coronary heart disease (CHD)"
                              }, {
                                id: "heart-failure",
                                label: "Chronic heart failure"
                              }, {
                                id: "depression",
                                label: "Depression"
                              }, {
                                id: "obesity",
                                label: "Obesity"
                              }, {
                                id: "osteoporosis",
                                label: "Osteoporosis"
                              }, {
                                id: "rheumatoid-arthritis",
                                label: "Rheumatoid arthritis"
                              }, {
                                id: "back-pain",
                                label: "Chronic back pain"
                              }].map(condition => <div className="flex items-center space-x-2" key={condition.id}>
                                    <Checkbox id={condition.id} checked={chronicConditions.includes(condition.id)} onCheckedChange={() => handleConditionToggle(condition.id)} />
                                    <Label htmlFor={condition.id} className="text-sm font-normal">
                                      {condition.label}
                                    </Label>
                                  </div>)}
                              </div>
                            </div>
                            
                            {chronicConditions.length > 0 && <div className="mt-4 p-4 bg-mov-light-orange rounded-lg border border-mov-orange/30">
                                <p className="font-medium mb-2">Based on your selection, you may be eligible for:</p>
                                <div className="flex flex-wrap gap-2">
                                  {chronicConditions.map(condition => {
                                const conditionMap: {
                                  [key: string]: string;
                                } = {
                                  "diabetes": "Diabetes DMP",
                                  "asthma": "Asthma DMP",
                                  "copd": "COPD DMP",
                                  "chd": "CHD DMP",
                                  "heart-failure": "Heart Failure DMP",
                                  "depression": "Depression Care Program",
                                  "obesity": "Weight Management Program",
                                  "osteoporosis": "Bone Health Program",
                                  "rheumatoid-arthritis": "Rheumatoid Arthritis Care",
                                  "back-pain": "Back Pain Management Program"
                                };
                                return <Badge key={condition} variant="outline" className="bg-white border-mov-orange text-mov-orange">
                                        {conditionMap[condition]}
                                      </Badge>;
                              })}
                                </div>
                                <div className="mt-3">
                                  <Button variant="outline" className="text-mov-orange border-mov-orange hover:bg-mov-light-orange">
                                    Request DMP Information
                                  </Button>
                                </div>
                              </div>}
                            
                            <div className="mt-4">
                              <RadioGroup defaultValue="not-enrolled-dmp" className="mt-4">
                                <div className="flex items-start space-x-2 mb-2">
                                  <RadioGroupItem value="enrolled-dmp" id="enrolled-dmp" />
                                  <Label className="font-normal" htmlFor="enrolled-dmp">
                                    I am already enrolled in one or more Disease Management Programs
                                  </Label>
                                </div>
                                <div className="flex items-start space-x-2 mb-2">
                                  <RadioGroupItem value="interested-dmp" id="interested-dmp" />
                                  <Label className="font-normal" htmlFor="interested-dmp">
                                    I'm interested in learning more about eligible DMPs
                                  </Label>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <RadioGroupItem value="not-interested-dmp" id="not-interested-dmp" />
                                  <Label className="font-normal" htmlFor="not-interested-dmp">
                                    I'm not interested at this time
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full text-mov-orange border-mov-orange hover:bg-mov-light-orange">
                      View All Health Programs
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </section>
            
            <div className="text-center mb-8">
              <p className="text-gray-600 italic">All your information is securely stored and protected by medical privacy laws.</p>
              <Link to="/" className="mt-4 inline-block">
                <Button className="bg-mov-orange hover:bg-mov-dark-orange text-white">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};

// Missing CheckCircleIcon component, let's define it
const CheckCircleIcon = ({
  className
}: {
  className?: string;
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>;
export default AppointmentConfirmation;
