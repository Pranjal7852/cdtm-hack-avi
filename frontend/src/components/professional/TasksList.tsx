
import { Button } from "@/components/ui/button";

interface Task {
  id: number;
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
}

interface TasksListProps {
  tasks: Task[];
}

export const TasksList = ({ tasks }: TasksListProps) => {
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case "high": return "bg-red-400";
      case "medium": return "bg-yellow-400";
      case "low": return "bg-green-400";
      default: return "bg-gray-400";
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center p-4 border rounded-md">
          <div className={`w-4 h-4 rounded-full ${getPriorityColor(task.priority)} mr-4`}></div>
          <div className="flex-1">
            <h4 className="text-sm font-medium">{task.title}</h4>
            <p className="text-sm text-muted-foreground">{task.description}</p>
          </div>
          <Button variant="outline" size="sm">Complete</Button>
        </div>
      ))}
    </div>
  );
};
