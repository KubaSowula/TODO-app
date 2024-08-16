import { Checkbox } from "@/shared/components/checkbox";
import { Ttask } from "@/shared/types";
import { useLocalStorage } from "@uidotdev/usehooks";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useDrop } from "react-dnd";

interface CompletedContentProps {
  tasks: Ttask[];
  setTasks: React.Dispatch<React.SetStateAction<Ttask[]>>;
  setFilteredTasks: React.Dispatch<React.SetStateAction<Ttask[]>>;
}

function CompletedContent({
  tasks,
  setTasks,
  setFilteredTasks,
}: CompletedContentProps) {
  const [, setDoneTasks] = useLocalStorage<Ttask[]>("doneTask", []);
  const [doneFilteredTasks] = useLocalStorage<Ttask[]>("doneFilteredTask", []);

  const [, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string }) => {
      // Find the task that was dropped
      const completedTask = tasks.find((task) => task.id === item.id);

      if (completedTask) {
        // Mark the task as completed and update local storage
        const updatedCompletedTask = { ...completedTask, completed: true };

        // Update doneTasks in localStorage
        setDoneTasks((prevDoneTasks) => [
          ...prevDoneTasks,
          updatedCompletedTask,
        ]);

        const updatedTasks = tasks.filter((task) => task.id !== item.id);
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
      }
    },
  }));

  return (
    <div ref={drop} style={{ minHeight: 50 }}>
      <h1>Completed</h1>
      {doneFilteredTasks &&
        doneFilteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-green-400 border border-gray-200 my-2 p-3 py-5 grid grid-cols-12"
          >
            <div className="col-span-4 flex items-center">
              <Checkbox />
              <p className="text-lg ml-4">{task.title}</p>
            </div>
            <div className="col-span-4 flex justify-end">
              <p className="flex items-center justify-center text-gray-500">
                <AiOutlineClockCircle className="size-6 mr-2" />
                {task.date}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default CompletedContent;
