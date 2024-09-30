import SortByDate from "../SortByDate/SortByDate";
import AddTask from "./AddTask/AddTask";
import { Ttask } from "@/shared/types";

interface Props {
  setTasks: React.Dispatch<React.SetStateAction<Ttask[]>>;
}

function MainHeader(props: Props) {
  return (
    <div className="flex items-center justify-between m-auto px-5 my-5">
      <h1 className="font-semibold text-4xl tracking-wide text-gray-700">
        Tasks
      </h1>
      <div className="flex space-x-5 justify-center items-center">
        <SortByDate />
        <AddTask setTasks={props.setTasks} />
      </div>
    </div>
  );
}

export default MainHeader;
