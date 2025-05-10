
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white py-4 px-6 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Stethoscope className="h-6 w-6 text-mov-orange" />
            <span className="font-bold text-xl">MOV Health</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-mov-orange transition-colors">Services</a>
            <a href="#" className="text-gray-600 hover:text-mov-orange transition-colors">How It Works</a>
            <a href="#" className="text-gray-600 hover:text-mov-orange transition-colors">Doctors</a>
            <a href="#" className="text-gray-600 hover:text-mov-orange transition-colors">About Us</a>
            <Link to="/sign-in">
              <Button variant="outline" className="border-mov-orange text-mov-orange hover:bg-mov-orange hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link to="/book-appointment">
              <Button className="bg-mov-orange hover:bg-mov-dark-orange text-white">
                Book Appointment
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} className="p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 animate-fade-in">
            <div className="flex flex-col space-y-4 py-4">
              <a href="#" className="text-gray-600 hover:text-mov-orange transition-colors">Services</a>
              <a href="#" className="text-gray-600 hover:text-mov-orange transition-colors">How It Works</a>
              <a href="#" className="text-gray-600 hover:text-mov-orange transition-colors">Doctors</a>
              <a href="#" className="text-gray-600 hover:text-mov-orange transition-colors">About Us</a>
              <Link to="/sign-in" className="w-full">
                <Button variant="outline" className="border-mov-orange text-mov-orange hover:bg-mov-orange hover:text-white w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/book-appointment" className="w-full">
                <Button className="bg-mov-orange hover:bg-mov-dark-orange text-white w-full">
                  Book Appointment
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
