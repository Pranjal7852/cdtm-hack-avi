import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const HeroSection = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to book appointment with the query as a parameter
      window.location.href = `/book-appointment?query=${encodeURIComponent(query)}`;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white via-mov-soft-gray to-mov-light-orange">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Your Health, <span className="text-mov-orange">Our Priority</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              We're here to support your wellbeing journey with compassionate care. Connect with your GP for virtual or in-person visits, whenever you need us.
            </p>
            
            <form onSubmit={handleSubmit} className="w-full mb-10 max-w-3xl mx-auto flex flex-col">
              <Card className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-mov-orange/10 mb-6 p-1">
                <CardContent className="p-2">
                  <Input 
                    type="text"
                    placeholder="Describe your symptoms or ask about a health concern..."
                    className="flex-grow text-lg py-8 h-auto border-mov-orange/30 focus-visible:ring-mov-orange"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </CardContent>
              </Card>
              <Button 
                type="submit" 
                className="w-full bg-mov-orange hover:bg-mov-dark-orange text-white py-6 h-auto text-lg"
              >
                Help Me <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/80 p-6 rounded-xl shadow-md border border-mov-orange/10">
                <div className="h-12 w-12 rounded-full bg-mov-light-orange flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mov-orange">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-mov-dark-orange">Personalized Care</h3>
                <p className="text-gray-600">Care tailored to your unique needs with empathy and understanding.</p>
              </div>
              
              <div className="bg-white/80 p-6 rounded-xl shadow-md border border-mov-orange/10">
                <div className="h-12 w-12 rounded-full bg-mov-light-orange flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mov-orange">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-mov-dark-orange">Health Resources</h3>
                <p className="text-gray-600">Access guides and information to support your health journey.</p>
              </div>
              
              <div className="bg-white/80 p-6 rounded-xl shadow-md border border-mov-orange/10">
                <div className="h-12 w-12 rounded-full bg-mov-light-orange flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mov-orange">
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-mov-dark-orange">24/7 Support</h3>
                <p className="text-gray-600">Our care team is here for you whenever you need assistance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
