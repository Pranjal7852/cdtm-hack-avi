
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, ChartBar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const DashboardSummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Today's Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-mov-orange" />
            8
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Pending Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center">
            <Clock className="mr-2 h-4 w-4 text-mov-orange" />
            5
          </div>
        </CardContent>
      </Card>

      <Link to="/patient-database">
        <Card className="cursor-pointer border-2 border-mov-orange relative">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <Users className="mr-2 h-4 w-4 text-mov-orange" />
              142
            </div>
            <div className="absolute right-4 bottom-4">
              <ArrowRight className="h-4 w-4 text-mov-orange" />
            </div>
          </CardContent>
        </Card>
      </Link>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Consultations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center">
            <ChartBar className="mr-2 h-4 w-4 text-mov-orange" />
            37
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
