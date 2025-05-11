
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Shield } from "lucide-react";
import { renderStatusBadge, renderMetricStatus } from "./StatusBadges";

type Appointment = {
  id: number;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: string;
};

type HealthMetric = {
  date: string;
  value: string;
  status: string;
};

type Medication = {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  notes: string;
};

type OverviewTabProps = {
  appointments: Appointment[];
  healthMetrics: {
    bloodPressure: HealthMetric[];
    weight: HealthMetric[];
    glucose: HealthMetric[];
  };
  medications: Medication[];
  allergies: string[];
};

export const OverviewTab = ({ 
  appointments, 
  healthMetrics, 
  medications, 
  allergies 
}: OverviewTabProps) => {
  return (
    <div className="space-y-6">
      {/* Important Alerts */}
      <Alert className="border-mov-orange">
        <Shield className="h-5 w-5" />
        <AlertTitle>Important Health Reminder</AlertTitle>
        <AlertDescription>
          Your annual check-up is due next month. Please schedule an appointment with your primary care physician.
        </AlertDescription>
      </Alert>

      {/* Next Appointment */}
      <Card>
        <CardHeader>
          <CardTitle>Next Appointment</CardTitle>
          <CardDescription>Your upcoming medical appointment</CardDescription>
        </CardHeader>
        <CardContent>
          {appointments.length > 0 ? (
            <div className="flex items-start space-x-4 p-4 border rounded-lg">
              <div className="bg-mov-orange/20 p-3 rounded-full">
                <Clock className="h-6 w-6 text-mov-orange" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{appointments[0].doctorName}</h3>
                <p className="text-sm text-muted-foreground">{appointments[0].specialty}</p>
                <div className="flex items-center mt-2">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  <span className="text-sm">{appointments[0].date} at {appointments[0].time}</span>
                </div>
                <div className="mt-2">
                  {renderStatusBadge(appointments[0].status)}
                </div>
              </div>
              <Link to="/appointment-details">
                <Button variant="outline" size="sm">View Details</Button>
              </Link>
            </div>
          ) : (
            <p className="text-center py-4 text-muted-foreground">No upcoming appointments</p>
          )}
        </CardContent>
      </Card>

      {/* Recent Health Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Health Metrics</CardTitle>
          <CardDescription>Your latest health measurements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-2 border-b">
              <div>
                <h4 className="font-medium">Blood Pressure</h4>
                <p className="text-sm text-muted-foreground">Last recorded: {healthMetrics.bloodPressure[0].date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{healthMetrics.bloodPressure[0].value}</p>
                {renderMetricStatus(healthMetrics.bloodPressure[0].status)}
              </div>
            </div>
            
            <div className="flex justify-between items-center p-2 border-b">
              <div>
                <h4 className="font-medium">Weight</h4>
                <p className="text-sm text-muted-foreground">Last recorded: {healthMetrics.weight[0].date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{healthMetrics.weight[0].value}</p>
                {renderMetricStatus(healthMetrics.weight[0].status)}
              </div>
            </div>
            
            <div className="flex justify-between items-center p-2">
              <div>
                <h4 className="font-medium">Blood Glucose</h4>
                <p className="text-sm text-muted-foreground">Last recorded: {healthMetrics.glucose[0].date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{healthMetrics.glucose[0].value}</p>
                {renderMetricStatus(healthMetrics.glucose[0].status)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Health Summary</CardTitle>
          <CardDescription>Your current health status overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h4 className="font-medium">Allergies</h4>
            <div className="flex flex-wrap gap-2">
              {allergies.map((allergy, index) => (
                <Badge key={index} variant="outline" className="bg-red-100 text-red-800 border-red-200">
                  {allergy}
                </Badge>
              ))}
            </div>
            
            <h4 className="font-medium pt-4">Current Medications</h4>
            <div className="space-y-2">
              {medications.slice(0, 2).map((medication) => (
                <div key={medication.id} className="p-2 border rounded-md">
                  <div className="flex justify-between">
                    <h5 className="font-medium">{medication.name}</h5>
                    <span className="text-sm">{medication.dosage}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{medication.frequency}</p>
                </div>
              ))}
              {medications.length > 2 && (
                <Link to="#" className="text-sm text-mov-orange hover:underline block text-right">
                  View all medications
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
