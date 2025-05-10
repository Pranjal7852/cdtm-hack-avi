
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, CheckCircle, Calendar, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import SearchWithVoice from "@/components/SearchWithVoice";
import { Card, CardContent } from "@/components/ui/card";

const BookAppointment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Start with Health Service selection first now
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [insurance, setInsurance] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [service, setService] = useState("General Consultation");
  const [location, setLocation] = useState("");
  const [practitioner, setPractitioner] = useState("");
  const [selectedDate, setSelectedDate] = useState("12 May");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // List of available services
  const availableServices = [
    "General Consultation",
    "Specialist Consultation",
    "Follow-up Visit",
    "Prescription Renewal",
    "Vaccination",
    "Health Check-up",
    "Diabetes Management",
    "Blood Pressure Check",
    "Allergy Consultation",
    "Dermatology Screening"
  ];

  // Filter services based on search term
  const filteredServices = availableServices.filter(serviceOption => 
    serviceOption.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    if (!email && !phone) {
      toast.error("We need a way to send you your appointment details", {
        description: "Please provide either an email or phone number so we can reach you."
      });
      return;
    }

    toast.success("Your appointment has been scheduled!", {
      description: "We look forward to caring for you soon. A confirmation has been sent to your contact details."
    });
    
    setShowSummary(false);

    // Get the formatted location and practitioner names
    const formattedLocation = location ? 
      location === 'berlin-mitte' ? 'Berlin Mitte Clinic' : 
      location === 'berlin-kreuzberg' ? 'Berlin Kreuzberg Office' : 
      location === 'berlin-charlottenburg' ? 'Berlin Charlottenburg Clinic' : 
      'Potsdam Medical Center'
      : 'Not selected';

    const formattedPractitioner = practitioner ? 
      practitioner === 'dr-schmidt' ? 'Dr. Schmidt - General Medicine' :
      practitioner === 'dr-mueller' ? 'Dr. Müller - Pediatrics' :
      practitioner === 'dr-wagner' ? 'Dr. Wagner - Dermatology' :
      practitioner === 'dr-becker' ? 'Dr. Becker - Internal Medicine' :
      'Any Available Practitioner'
      : 'Not selected';

    // Navigate to the confirmation page with appointment details
    navigate('/appointment-confirmation', { 
      state: { 
        appointmentDetails: {
          service,
          date: selectedDate,
          time: selectedTime,
          location: formattedLocation,
          practitioner: formattedPractitioner
        }
      }
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-[#FDF8F3]">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Link to="/" className="inline-flex items-center text-gray-600 hover:text-mov-orange transition-colors">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Return to Home
              </Link>
              <h1 className="text-3xl font-bold mt-4 mb-2 text-mov-dark-orange">Your Health, Our Priority</h1>
              <p className="text-gray-700">We're here to support your wellbeing journey. Let's schedule the care you deserve.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-mov-orange">
              <div className="flex justify-between mb-8">
                <div className={`flex flex-col items-center ${step >= 1 ? 'text-mov-orange' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? 'bg-mov-orange text-white shadow-lg shadow-mov-light-orange' : 'bg-gray-200 text-gray-500'}`}>
                    <Heart className={`h-5 w-5 ${step >= 1 ? '' : 'hidden'}`} />
                    {step < 1 && <span>1</span>}
                  </div>
                  <span className="text-sm">Health Service</span>
                </div>
                <div className={`flex flex-col items-center ${step >= 2 ? 'text-mov-orange' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? 'bg-mov-orange text-white shadow-lg shadow-mov-light-orange' : 'bg-gray-200 text-gray-500'}`}>
                    {step >= 2 ? <CheckCircle className="h-5 w-5" /> : <span>2</span>}
                  </div>
                  <span className="text-sm">Personal Details</span>
                </div>
                <div className={`flex flex-col items-center ${step >= 3 ? 'text-mov-orange' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? 'bg-mov-orange text-white shadow-lg shadow-mov-light-orange' : 'bg-gray-200 text-gray-500'}`}>
                    {step >= 3 ? <Calendar className="h-5 w-5" /> : <span>3</span>}
                  </div>
                  <span className="text-sm">Schedule Visit</span>
                </div>
              </div>
              
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4 text-mov-dark-orange flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-mov-orange" /> Tell us about your needs
                  </h2>
                  
                  {/* Search bar with voice recognition */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How can we help you today? Search for a service or simply speak to us
                    </label>
                    <SearchWithVoice 
                      onSearchChange={setSearchTerm} 
                      placeholder="Search for services or speak to find what you need..."
                    />
                  </div>
                  
                  {/* Display services based on search */}
                  {searchTerm && (
                    <div className="space-y-3">
                      {filteredServices.length > 0 ? (
                        filteredServices.map((serviceOption, index) => (
                          <div 
                            key={index} 
                            className={`p-4 border rounded-md cursor-pointer transition-all ${
                              service === serviceOption 
                                ? 'border-mov-orange bg-mov-light-orange' 
                                : 'hover:border-mov-orange hover:scale-[1.01] hover:shadow-sm'
                            }`}
                            onClick={() => setService(serviceOption)}
                          >
                            <div className="flex items-center">
                              <div className="mr-3">
                                <input 
                                  type="radio" 
                                  name="service" 
                                  id={`service-${index}`} 
                                  className="hidden"
                                  checked={service === serviceOption}
                                  onChange={() => setService(serviceOption)}
                                />
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  service === serviceOption 
                                    ? 'border-mov-orange' 
                                    : 'border-gray-300'
                                }`}>
                                  {service === serviceOption && (
                                    <div className="w-3 h-3 rounded-full bg-mov-orange"></div>
                                  )}
                                </div>
                              </div>
                              <label htmlFor={`service-${index}`} className="cursor-pointer flex-grow font-medium">
                                {serviceOption}
                              </label>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center p-6 text-gray-500 bg-mov-soft-gray rounded-lg">
                          <p className="font-medium">We couldn't find services matching "{searchTerm}"</p>
                          <p className="text-sm mt-2">Try a different search term or let us know what you're looking for</p>
                        </div>
                      )}
                    </div>
                  )}

                  {!searchTerm && (
                    <div className="text-center p-6 bg-mov-soft-gray rounded-lg">
                      <p className="font-medium text-gray-700">Please search for a service above</p>
                      <p className="text-sm mt-2 text-gray-500">Type or use voice search to find the care you need</p>
                    </div>
                  )}
                  
                  <div className="pt-4 flex justify-between">
                    <div></div> {/* Empty div for alignment */}
                    <Button 
                      className="bg-mov-orange hover:bg-mov-dark-orange text-white"
                      onClick={() => setStep(2)}
                      disabled={!service}
                    >
                      Continue to Your Details
                    </Button>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4 text-mov-dark-orange flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-mov-orange" /> Your Details
                  </h2>
                  
                  <Card className="bg-mov-soft-gray border-none shadow-sm mb-4">
                    <CardContent className="pt-6">
                      <p className="text-gray-700">We care about providing you with personalized care. The information you share helps us better understand your needs.</p>
                    </CardContent>
                  </Card>
                  
                  <Button 
                    variant="outline"
                    className="flex items-center w-full justify-center border-mov-orange text-mov-orange hover:bg-mov-orange hover:text-white"
                  >
                    <CreditCard className="mr-2" /> Scan your EHIC for faster booking
                  </Button>
                  
                  <div className="relative flex items-center justify-center">
                    <Separator className="flex-grow bg-gray-200" />
                    <span className="mx-4 text-sm text-gray-500 bg-white px-2">or enter details manually</span>
                    <Separator className="flex-grow bg-gray-200" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mov-orange"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mov-orange"
                        placeholder="Your last name"
                      />
                    </div>
                    <div>
                      <label htmlFor="insuranceCompany" className="block text-sm font-medium text-gray-700 mb-1">
                        Insurance Provider
                      </label>
                      <Select value={insurance} onValueChange={setInsurance}>
                        <SelectTrigger className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mov-orange">
                          <SelectValue placeholder="Select your insurance provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aok">AOK</SelectItem>
                          <SelectItem value="tk">TK</SelectItem>
                          <SelectItem value="barmer">Barmer</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="insuranceNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Insurance Number
                      </label>
                      <input
                        type="text"
                        id="insuranceNumber"
                        value={insuranceNumber}
                        onChange={(e) => setInsuranceNumber(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mov-orange"
                        placeholder="Your insurance number"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-between">
                    <Button 
                      variant="outline" 
                      className="border-mov-orange text-mov-orange hover:bg-mov-orange hover:text-white"
                      onClick={() => setStep(1)}
                    >
                      Back to Services
                    </Button>
                    <Button 
                      className="bg-mov-orange hover:bg-mov-dark-orange text-white"
                      onClick={() => setStep(3)}
                    >
                      Continue to Scheduling
                    </Button>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4 text-mov-dark-orange flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-mov-orange" /> Choose a Time That Works For You
                  </h2>
                  
                  <Card className="bg-mov-soft-blue border-none shadow-sm mb-4">
                    <CardContent className="pt-6">
                      <p className="text-gray-700">We value your time. Select a convenient slot for your visit, and we'll make sure everything is ready for you.</p>
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Where would you like to receive care?
                      </label>
                      <Select value={location} onValueChange={setLocation}>
                        <SelectTrigger className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mov-orange">
                          <SelectValue placeholder="Choose a location nearest to you" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="berlin-mitte">Berlin Mitte Clinic - Central & Accessible</SelectItem>
                          <SelectItem value="berlin-kreuzberg">Berlin Kreuzberg Office - Cozy Setting</SelectItem>
                          <SelectItem value="berlin-charlottenburg">Berlin Charlottenburg Clinic - Family Friendly</SelectItem>
                          <SelectItem value="potsdam">Potsdam Medical Center - Modern Facilities</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Who would you like to see?
                      </label>
                      <Select value={practitioner} onValueChange={setPractitioner}>
                        <SelectTrigger className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mov-orange">
                          <SelectValue placeholder="Select your preferred care provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dr-schmidt">Dr. Schmidt - Warm & Attentive General Medicine</SelectItem>
                          <SelectItem value="dr-mueller">Dr. Müller - Gentle Pediatrics Care</SelectItem>
                          <SelectItem value="dr-wagner">Dr. Wagner - Expert Dermatology Care</SelectItem>
                          <SelectItem value="dr-becker">Dr. Becker - Thorough Internal Medicine</SelectItem>
                          <SelectItem value="any">Any Available Care Provider</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-6 bg-white shadow-sm">
                    <p className="text-center text-gray-700 mb-3">Please select a day for your visit</p>
                    <div className="grid grid-cols-7 gap-2 mb-6">
                      {Array.from({ length: 7 }, (_, i) => (
                        <div 
                          key={i} 
                          className={`p-3 text-center rounded-md cursor-pointer hover:bg-mov-light-orange transition-all ${i === 2 ? 'bg-mov-orange text-white shadow-md' : 'bg-gray-50 hover:shadow-sm'}`}
                          onClick={() => setSelectedDate(`${10 + i} May`)}
                        >
                          <div className="text-xs mb-1 font-medium">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i % 7]}</div>
                          <div className="font-semibold">{10 + i}</div>
                        </div>
                      ))}
                    </div>
                    
                    <p className="text-center text-gray-700 mb-3 mt-6">Available time slots</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'].map((time, i) => (
                        <div 
                          key={i} 
                          className={`p-3 text-center rounded-md cursor-pointer hover:bg-mov-light-orange transition-all ${i === 1 ? 'bg-mov-orange text-white shadow-md' : 'bg-gray-50 hover:shadow-sm'}`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-between">
                    <Button 
                      variant="outline" 
                      className="border-mov-orange text-mov-orange hover:bg-mov-orange hover:text-white"
                      onClick={() => setStep(1)}
                    >
                      Back to Services
                    </Button>
                    <Button 
                      className="bg-mov-orange hover:bg-mov-dark-orange text-white"
                      onClick={() => setShowSummary(true)}
                    >
                      Review Your Appointment
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <Dialog open={showSummary} onOpenChange={setShowSummary}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center text-mov-dark-orange">Your Appointment Details</DialogTitle>
            <DialogDescription className="text-center">
              We're almost ready to schedule your visit. Please confirm the details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-mov-light-orange p-6 rounded-md mb-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="font-medium text-gray-700">Care Service:</div>
                <div className="text-gray-800">{service}</div>
                
                <div className="font-medium text-gray-700">Date:</div>
                <div className="text-gray-800">{selectedDate}</div>
                
                <div className="font-medium text-gray-700">Time:</div>
                <div className="text-gray-800">{selectedTime}</div>
                
                <div className="font-medium text-gray-700">Location:</div>
                <div className="text-gray-800">{location ? 
                  location === 'berlin-mitte' ? 'Berlin Mitte Clinic' : 
                  location === 'berlin-kreuzberg' ? 'Berlin Kreuzberg Office' : 
                  location === 'berlin-charlottenburg' ? 'Berlin Charlottenburg Clinic' : 
                  'Potsdam Medical Center'
                  : 'Not selected'}
                </div>
                
                <div className="font-medium text-gray-700">Care Provider:</div>
                <div className="text-gray-800">{practitioner ? 
                  practitioner === 'dr-schmidt' ? 'Dr. Schmidt - General Medicine' :
                  practitioner === 'dr-mueller' ? 'Dr. Müller - Pediatrics' :
                  practitioner === 'dr-wagner' ? 'Dr. Wagner - Dermatology' :
                  practitioner === 'dr-becker' ? 'Dr. Becker - Internal Medicine' :
                  'Any Available Care Provider'
                  : 'Not selected'}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address for Confirmation
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Where can we send your appointment details?"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number for Reminders
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="For appointment reminders and updates"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Please provide at least one contact method so we can send you confirmation details
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowSummary(false)}
            >
              Go Back
            </Button>
            <Button 
              onClick={handleSubmit}
              className="bg-mov-orange hover:bg-mov-dark-orange text-white"
            >
              Confirm Your Visit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookAppointment;
