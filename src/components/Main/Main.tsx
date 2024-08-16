import "../../App.css";
import MainHeader from "./MainHeader";
import Tasks from "../Tasks/Tasks";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Ttask } from "@/shared/types";
import CompletedContent from "../CompletedContent/CompletedContent";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Main() {
  const [tasks, setTasks] = useLocalStorage<Ttask[]>("task", []);
  const [, setFilteredTasks] = useLocalStorage<Ttask[]>("filteredTask", []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-[60%] m-auto">
        <MainHeader setTasks={setTasks} />
        <Tasks />
        <CompletedContent
          tasks={tasks}
          setTasks={setTasks}
          setFilteredTasks={setFilteredTasks}
        />
      </div>
    </DndProvider>
  );
}

export default Main;
