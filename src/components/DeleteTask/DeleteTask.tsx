import { Ttask } from "@/shared/types";
import { RiDeleteBin5Line } from "react-icons/ri";

interface Props {
  task: Ttask;
  setTasks: React.Dispatch<React.SetStateAction<Ttask[]>>;
  setFilteredTasks: React.Dispatch<React.SetStateAction<Ttask[]>>;
}

function DeleteTask(props: Props) {
  const handleDelete = () => {
    props.setTasks((prevTasks) => {
      const deleteTask = prevTasks.filter((t) => t.id != props.task.id);
      return deleteTask;
    });
    props.setFilteredTasks((prevTasks) => {
      const deleteTask = prevTasks.filter((t) => t.id != props.task.id);
      return deleteTask;
    });
  };

  return (
    <RiDeleteBin5Line
      className="fill-gray-500 size-5 cursor-pointer"
      onClick={handleDelete}
    />
  );
}

export default DeleteTask;
