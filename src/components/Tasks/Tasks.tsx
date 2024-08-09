import { Checkbox } from "@/shared/components/checkbox";
import { AiOutlineClockCircle } from "react-icons/ai";
import EditTask from "../Main/EditTask.tsx/EditTask";
import DeleteTask from "../DeleteTask/DeleteTask";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Ttask } from "@/shared/types";

function Tasks() {
  const [tasks, setTasks] = useLocalStorage<Ttask[]>("task", []);

  return (
    <div>
      {tasks.map((task) => {
        return (
          <div
            key={task.id}
            className="bg-white border border-gray-200 my-2 p-3 py-5 grid grid-cols-12"
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
              <DeleteTask task={task} setTasks={setTasks} />
              <div
                className={
                  task.isStarted
                    ? "bg-yellow-300  w-7 h-10 rounded-2xl ml-5"
                    : "bg-red-600 w-7 h-10 rounded-2xl ml-5"
                }
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Tasks;
