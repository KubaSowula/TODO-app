import { Checkbox } from "@/shared/components/checkbox";
import { AiOutlineClockCircle, AiOutlineConsoleSql } from "react-icons/ai";
import EditTask from "../Main/EditTask.tsx/EditTask";
import DeleteTask from "../DeleteTask/DeleteTask";
import { Ttask } from "@/shared/types";
import Completed from "../Completed/Completed";
import { useDrag } from "react-dnd";
import { useLocalStorage } from "@uidotdev/usehooks";
import { IoRocketSharp } from "react-icons/io5";
import { MdRocket } from "react-icons/md";

interface TaskItemProps {
  task: Ttask;
  setTasks: React.Dispatch<React.SetStateAction<Ttask[]>>;
  setFilteredTask: React.Dispatch<React.SetStateAction<Ttask[]>>;
}

function TaskItem({ task, setTasks, setFilteredTask }: TaskItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-white border border-gray-200 my-2 p-3 py-5 grid grid-cols-12 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
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
      <div className="col-span-4 flex items-center justify-end">
        <EditTask task={task} setTasks={setTasks} />
        <DeleteTask
          task={task}
          setTasks={setTasks}
          setFilteredTasks={setFilteredTask}
        />
        <Completed
          task={task}
          setTasks={setTasks}
          setFilteredTasks={setFilteredTask}
        />
        <div>
          {task.isStarted ? (
            <IoRocketSharp className="fill-gray-500 size-5 ml-3" />
          ) : (
            <MdRocket className="fill-gray-500 size-5 ml-3" />
          )}
        </div>
      </div>
    </div>
  );
}

function Tasks() {
  const [filteredTask, setFilteredTask] = useLocalStorage<Ttask[]>(
    "filteredTask",
    []
  );
  const [, setTasks] = useLocalStorage<Ttask[]>("task", []);

  return (
    <div>
      {filteredTask &&
        filteredTask
          .filter((task) => !task.completed) // Only show incomplete tasks
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              setTasks={setTasks}
              setFilteredTask={setFilteredTask}
            />
          ))}
    </div>
  );
}

export default Tasks;
