import { Button } from "@/shared/components/button";
import { Ttask } from "@/shared/types";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import { FaSort } from "react-icons/fa";

function SortByDate() {
  const [filteredTask, setFilteredTask] = useLocalStorage<Ttask[]>(
    "filteredTask",
    []
  );

  const [isAscending, setIsAscending] = useState(true);
  const [sortedTasks, setSortedTasks] = useState(filteredTask);

  const sortTasks = () => {
    const sorted = [...filteredTask].sort((a, b) => {
      const dateA = a.date.split("/").reverse().join();
      const dateB = b.date.split("/").reverse().join();
      return isAscending
        ? dateA.localeCompare(dateB)
        : dateB.localeCompare(dateA);
    });

    setSortedTasks(sorted);
    setIsAscending(!isAscending);
  };

  return (
    <Button
      className="bg-green-700 hover:bg-green-800 w-30"
      id="dupa"
      onClick={sortTasks}
    >
      <FaSort className="size-5 mr-2" />
      Sort By Date
    </Button>
  );
}

export default SortByDate;
