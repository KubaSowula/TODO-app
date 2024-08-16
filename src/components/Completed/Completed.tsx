import { Ttask } from "@/shared/types";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

interface Props {
  task: Ttask;
  setTasks: React.Dispatch<React.SetStateAction<Ttask[]>>;
  setFilteredTasks: React.Dispatch<React.SetStateAction<Ttask[]>>;
}

function Completed({ task, setTasks, setFilteredTasks }: Props) {
  const [title] = useState(task.title);
  const [date] = useState(task.date);
  const [isStarted] = useState(task.isStarted);
  const [, setDoneTasks] = useLocalStorage<Ttask[]>("doneTask", []);
  const setDoneTask = () => {
    setDoneTasks((prev) => {
      const task: Ttask = {
        id: uuidv4(),
        date: date,
        title: title,
        isStarted: isStarted,
        completed: false,
      };

      const newTasks = [...prev, task];
      return newTasks;
    });

    setTasks((prevTasks) => {
      const deleteTask = prevTasks.filter((t) => t.id != task.id);
      return deleteTask;
    });
    setFilteredTasks((prevTasks) => {
      const deleteTask = prevTasks.filter((t) => t.id != task.id);
      return deleteTask;
    });
  };

  return (
    <div className="flex items-center justify-start my-5">
      <IoMdDoneAll
        className="fill-gray-500 size-5 ml-3 cursor-pointer"
        onClick={setDoneTask}
      />
    </div>
  );
}

export default Completed;
