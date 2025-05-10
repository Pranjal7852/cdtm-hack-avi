
import React, { useState, useEffect } from "react";
import { Search, Mic, MicOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SearchWithVoiceProps {
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

const SearchWithVoice: React.FC<SearchWithVoiceProps> = ({
  onSearchChange,
  placeholder = "Search..."
}) => {
  const [search, setSearch] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearch(transcript);
        onSearchChange(transcript);
        toast.success("Voice input recognized", {
          description: transcript
        });
        setIsListening(false);
      };
      
      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error", event);
        toast.error("Failed to recognize voice", {
          description: "Please try again or type your search"
        });
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
    
    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [onSearchChange]);

  const toggleListening = () => {
    if (!recognition) {
      toast.error("Speech recognition not supported", {
        description: "Your browser doesn't support speech recognition"
      });
      return;
    }
    
    if (isListening) {
      recognition.abort();
      setIsListening(false);
    } else {
      setIsListening(true);
      try {
        recognition.start();
      } catch (error) {
        console.error("Speech recognition error:", error);
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <div className="flex items-center space-x-2 w-full">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={handleSearchChange}
          className="pl-10 w-full"
        />
      </div>
      <Button
        variant={isListening ? "destructive" : "outline"}
        size="icon"
        onClick={toggleListening}
        className={`${isListening ? 'bg-red-500 hover:bg-red-600' : 'border-mov-orange text-mov-orange hover:bg-mov-orange hover:text-white'}`}
      >
        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default SearchWithVoice;
