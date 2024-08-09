import "../../App.css";
import { Button } from "@/shared/components/button";

function Nav() {
  return (
    <div className="flex items-center justify-center h-24 my-4">
      <Button className="bg-green-900 hover:bg-green-950 w-52 h-12 rounded-none rounded-s-lg">
        Today
      </Button>
      <Button className="bg-green-900/30 hover:bg-green-900/60 text-black w-52 h-12 mx-1 rounded-none">
        Pending
      </Button>
      <Button className="bg-green-900/30 hover:bg-green-900/60 text-black w-52 h-12 rounded-none rounded-e-lg">
        Overdue
      </Button>
    </div>
  );
}

export default Nav;
