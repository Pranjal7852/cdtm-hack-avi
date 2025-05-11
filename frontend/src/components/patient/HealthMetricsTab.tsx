
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { renderMetricStatus } from "./StatusBadges";

type HealthMetric = {
  date: string;
  value: string;
  status: string;
};

type HealthMetricsTabProps = {
  healthMetrics: {
    bloodPressure: HealthMetric[];
    weight: HealthMetric[];
    glucose: HealthMetric[];
  };
};

export const HealthMetricsTab = ({ healthMetrics }: HealthMetricsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Metrics</CardTitle>
        <CardDescription>Track your health measurements over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Blood Pressure History */}
          <div>
            <h3 className="text-lg font-medium mb-2">Blood Pressure History</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Reading</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {healthMetrics.bloodPressure.map((reading, index) => (
                  <TableRow key={index}>
                    <TableCell>{reading.date}</TableCell>
                    <TableCell>{reading.value}</TableCell>
                    <TableCell>{renderMetricStatus(reading.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-2">
              <Button variant="outline" size="sm">Add New Reading</Button>
            </div>
          </div>
          
          {/* Weight History */}
          <div>
            <h3 className="text-lg font-medium mb-2">Weight History</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Reading</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {healthMetrics.weight.map((reading, index) => (
                  <TableRow key={index}>
                    <TableCell>{reading.date}</TableCell>
                    <TableCell>{reading.value}</TableCell>
                    <TableCell>{renderMetricStatus(reading.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-2">
              <Button variant="outline" size="sm">Add New Reading</Button>
            </div>
          </div>
          
          {/* Blood Glucose History */}
          <div>
            <h3 className="text-lg font-medium mb-2">Blood Glucose History</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Reading</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {healthMetrics.glucose.map((reading, index) => (
                  <TableRow key={index}>
                    <TableCell>{reading.date}</TableCell>
                    <TableCell>{reading.value}</TableCell>
                    <TableCell>{renderMetricStatus(reading.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-2">
              <Button variant="outline" size="sm">Add New Reading</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
