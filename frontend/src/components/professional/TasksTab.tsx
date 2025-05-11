
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TasksList } from "./TasksList";

interface Task {
  id: number;
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
}

interface TasksTabProps {
  tasks: Task[];
}

export const TasksTab = ({ tasks }: TasksTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks & Reminders</CardTitle>
        <CardDescription>
          Important tasks and reminders for your practice
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TasksList tasks={tasks} />
      </CardContent>
    </Card>
  );
};
