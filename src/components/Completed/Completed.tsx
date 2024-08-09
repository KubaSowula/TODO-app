import { TiArrowSortedUp } from "react-icons/ti";

function Completed() {
  return (
    <div className="flex items-center justify-start my-5">
      <h1 className="text-xl font-bold">Completed</h1>{" "}
      <TiArrowSortedUp className="ml-2 size-6" />
    </div>
  );
}

export default Completed;
