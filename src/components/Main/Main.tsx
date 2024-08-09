import "../../App.css";
import MainHeader from "./MainHeader";
import Tasks from "../Tasks/Tasks";
import Completed from "../Completed/Completed";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Ttask } from "@/shared/types";

function Main() {
  // const [tasks, setTasks] = useState(() => {
  //   const savedTasks = localStorage.getItem("tasks");
  //   return savedTasks ? JSON.parse(savedTasks) : [];
  // });

  const [, setTasks] = useLocalStorage<Ttask[]>("task", []);

  return (
    <div className="w-[60%] m-auto">
      <MainHeader setTasks={setTasks} />
      <Tasks />
      <Completed />
    </div>
  );
}

export default Main;
