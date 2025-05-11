
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EPASyncStatus } from "./EPASyncStatus";

type MedicalFile = {
  id: number;
  name: string;
  type: string;
  date: string;
  size: string;
  category: string;
};

type SyncItem = {
  id: number;
  fileName: string;
  lastSync: string;
  status: string;
  details: string;
};

type MedicalRecordsTabProps = {
  medicalFiles: MedicalFile[];
  epaSyncStatus: SyncItem[];
};

export const MedicalRecordsTab = ({ medicalFiles, epaSyncStatus }: MedicalRecordsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Records</CardTitle>
        <CardDescription>Access and manage your health documents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Button variant="outline" className="mr-2">Upload New Document</Button>
          <Button variant="outline">Request Records</Button>
        </div>
        
        <EPASyncStatus syncItems={epaSyncStatus} />
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="lab-results">
            <AccordionTrigger>Lab Results</AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicalFiles.filter(file => file.category === "Lab Results").map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">{file.name}</TableCell>
                      <TableCell>{file.date}</TableCell>
                      <TableCell>{file.size}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Download</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="imaging">
            <AccordionTrigger>Imaging</AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicalFiles.filter(file => file.category === "Imaging").map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">{file.name}</TableCell>
                      <TableCell>{file.date}</TableCell>
                      <TableCell>{file.size}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Download</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="prescriptions">
            <AccordionTrigger>Prescriptions</AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicalFiles.filter(file => file.category === "Prescriptions").map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">{file.name}</TableCell>
                      <TableCell>{file.date}</TableCell>
                      <TableCell>{file.size}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Download</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="other-records">
            <AccordionTrigger>Other Records</AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicalFiles.filter(file => file.category === "Records").map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">{file.name}</TableCell>
                      <TableCell>{file.date}</TableCell>
                      <TableCell>{file.size}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Download</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
