
import { Search, Calendar, Video, Check } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="py-16 bg-mov-soft-gray" id="how-it-works">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">How MOV Health Works</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Get the care you need in four simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-mov-orange flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Find Your GP</h3>
            <p className="text-gray-600">
              Search for doctors by specialty, rating, or availability to find the right fit for your needs.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-mov-orange flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Book Appointment</h3>
            <p className="text-gray-600">
              Choose a convenient time slot for your virtual or in-person visit.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-mov-orange flex items-center justify-center mb-4">
              <Video className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Attend Consultation</h3>
            <p className="text-gray-600">
              Meet with your doctor via secure video call or in-person at their clinic.
            </p>
          </div>
          
          {/* Step 4 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-mov-orange flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Follow-Up Care</h3>
            <p className="text-gray-600">
              Receive prescriptions, referrals, and follow-up appointment scheduling if needed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
