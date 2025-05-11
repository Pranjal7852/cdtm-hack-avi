
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type SyncItem = {
  id: number;
  fileName: string;
  lastSync: string;
  status: string;
  details: string;
};

type EPASyncStatusProps = {
  syncItems: SyncItem[];
};

export const EPASyncStatus = ({ syncItems }: EPASyncStatusProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3 flex items-center">
        <RefreshCw className="h-5 w-5 mr-2 text-mov-orange" /> 
        Electronic Patient File (ePA) Status
      </h3>
      <div className="bg-slate-50 p-4 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Last Synchronized</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {syncItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.fileName}</TableCell>
                <TableCell>{item.lastSync}</TableCell>
                <TableCell>
                  {item.status === "synced" ? (
                    <Badge className="bg-green-500">Synced</Badge>
                  ) : (
                    <Badge variant="destructive">Action Needed</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">
                      {item.status === "synced" ? "Resync" : "Authorize"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
