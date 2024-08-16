import "../../App.css";
import { Button } from "@/shared/components/button";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Ttask } from "@/shared/types";

function Nav() {
  const [tasks] = useLocalStorage<Ttask[]>("task", []);
  const [doneTasks] = useLocalStorage<Ttask[]>("doneTask", []);
  const [, setDoneFilteredTasks] = useLocalStorage<Ttask[]>(
    "doneFilteredTask",
    []
  );
  const [, setFilteredTasks] = useLocalStorage<Ttask[]>("filteredTask", []);

  const today = new Date().toISOString().split("T")[0];

  const todayTasks = () => {
    const todayTasks = tasks.filter((task) => task.date === today);
    const todayDoneTasks = doneTasks.filter((task) => task.date === today);
    setFilteredTasks(todayTasks);
    setDoneFilteredTasks(todayDoneTasks);
  };

  const pendingTasks = () => {
    const futureTasks = tasks.filter((task) => task.date > today);
    const futureDoneTasks = doneTasks.filter((task) => task.date > today);
    setFilteredTasks(futureTasks);
    setDoneFilteredTasks(futureDoneTasks);
  };

  const overdueTasks = () => {
    const pastTasks = tasks.filter((task) => task.date < today);
    const pastDoneTasks = doneTasks.filter((task) => task.date < today);
    setFilteredTasks(pastTasks);
    setDoneFilteredTasks(pastDoneTasks);
  };

  const setActive = (e: any) => {
    const buttons = Array.from(
      document.getElementsByClassName("toggle-active")
    );
    buttons.forEach((button) => {
      button.classList.remove("bg-green-900", "text-white");
      button.classList.add("bg-green-900/30", "text-dark");
    });
    e.target.classList.remove("bg-green-900/30");
    e.target.classList.add("bg-green-900", "text-white");
  };

  const taskFunctions: any = {
    todayTasks,
    pendingTasks,
    overdueTasks,
  };

  // Funkcja, która zmienia kolor i wywołuje odpowiednią funkcję
  const selectStatus = (e: any) => {
    const functionName = e.target.id + "Tasks";
    taskFunctions[functionName]();
    setActive(e);
  };

  return (
    <div>
      <div className="flex items-center justify-center h-24 my-4">
        <Button
          id="today"
          className="bg-green-900/30 hover:bg-green-950/60 text-black w-52 h-12 rounded-none rounded-s-lg toggle-active"
          onClick={selectStatus}
        >
          Today
        </Button>
        <Button
          id="pending"
          className="bg-green-900/30 hover:bg-green-900/60 text-black w-52 h-12 mx-1 rounded-none toggle-active"
          onClick={selectStatus}
        >
          Pending
        </Button>
        <Button
          id="overdue"
          className="bg-green-900/30 hover:bg-green-900/60 text-black w-52 h-12 rounded-none rounded-e-lg toggle-active"
          onClick={selectStatus}
        >
          Overdue
        </Button>
      </div>
    </div>
  );
}

export default Nav;
