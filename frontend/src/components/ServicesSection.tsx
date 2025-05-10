
import ServiceCard from "./ServiceCard";
import { Heart, Clipboard, Hospital, Stethoscope } from "lucide-react";

const ServicesSection = () => {
  return (
    <section className="py-16 bg-white" id="services">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Our Medical Services</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Whether you need routine care or help managing chronic conditions, our healthcare professionals are here for you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard
            title="Cardiovascular Care"
            description="Expert care for heart conditions including hypertension, arrhythmias, and heart disease prevention."
            icon={Heart}
            color="bg-red-500"
          />
          <ServiceCard
            title="Diabetes Management"
            description="Comprehensive care for type 1 and type 2 diabetes, including blood sugar monitoring and lifestyle guidance."
            icon={Clipboard}
            color="bg-blue-500"
          />
          <ServiceCard
            title="Routine Consultations"
            description="General check-ups, preventive care, and non-emergency medical concerns addressed promptly."
            icon={Stethoscope}
            color="bg-mov-purple"
          />
          <ServiceCard
            title="Vaccinations"
            description="Stay protected with up-to-date vaccinations for flu, COVID-19, and other preventable diseases."
            icon={Hospital}
            color="bg-green-500"
          />
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4">Explore our full range of medical services</p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-mov-soft-gray rounded-full text-gray-700 hover:bg-mov-light-purple cursor-pointer transition-colors">Cancer Screening</span>
            <span className="px-4 py-2 bg-mov-soft-gray rounded-full text-gray-700 hover:bg-mov-light-purple cursor-pointer transition-colors">Mental Health</span>
            <span className="px-4 py-2 bg-mov-soft-gray rounded-full text-gray-700 hover:bg-mov-light-purple cursor-pointer transition-colors">Pediatrics</span>
            <span className="px-4 py-2 bg-mov-soft-gray rounded-full text-gray-700 hover:bg-mov-light-purple cursor-pointer transition-colors">Dermatology</span>
            <span className="px-4 py-2 bg-mov-soft-gray rounded-full text-gray-700 hover:bg-mov-light-purple cursor-pointer transition-colors">Nutrition</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
