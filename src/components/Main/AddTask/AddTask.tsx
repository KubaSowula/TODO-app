import { Button } from "@/shared/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/dialog";
import { Ttask } from "@/shared/types";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

interface Props {
  setTasks: React.Dispatch<React.SetStateAction<Ttask[]>>;
}

function AddTask(props: Props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [isStarted, setIsStarted] = useState(Boolean);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    props.setTasks((prev) => {
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

    setTitle("");
    setDate("");
    setIsStarted(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-green-700 hover:bg-green-800 w-40"
        >
          <IoIosAddCircleOutline className="size-5 mr-2" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Add New Task</DialogTitle>
          <DialogDescription asChild>
            <form onSubmit={handleSubmit} id="newForm">
              <div className="grid grid-cols-12">
                <p className="col-span-2">Nazwa</p>
                <input
                  className="border border-black col-span-6 text-black p-1 form-control"
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  required
                  id="nameAddForm"
                  name="nameAddForm"
                />
              </div>
              <div className="grid grid-cols-12 mt-2">
                <p className="col-span-2">Data</p>
                <input
                  className="border border-black col-span-6 text-black p-1 form-control"
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  required
                  id="dateAddForm"
                  name="dateAddForm"
                />
              </div>
              <div className="grid grid-cols-12 mt-2">
                <p className="col-span-2">Started?</p>
                <input
                  className="col-span-6 mr-auto"
                  type="checkbox"
                  onChange={(e) => {
                    setIsStarted(e.target.checked);
                  }}
                  id="startedAddForm"
                  name="startedAddForm"
                />
              </div>
              <Button type="submit" className="w-32 bg-slate-500 mt-2">
                Dodaj
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
      <DialogDescription className="hidden"></DialogDescription>
    </Dialog>
  );
}

export default AddTask;
