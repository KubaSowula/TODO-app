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
import { BsPencil } from "react-icons/bs";

interface Props {
  task: Ttask;
  setTasks: React.Dispatch<React.SetStateAction<Ttask[]>>;
}

function EditTask({ task, setTasks }: Props) {
  const [id] = useState(task.id);
  const [title, updateTitle] = useState(task.title);
  const [date, updateDate] = useState(task.date);
  const [isStarted, updateIsStarted] = useState(task.isStarted);
  const [completed] = useState(task.completed);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask: Ttask = {
      id: id,
      date: date,
      title: title,
      isStarted: isStarted,
      completed: completed
    };

    setTasks((prevTasks) => {
      const editTask = prevTasks.map((t) =>
        t.id === task.id ? updatedTask : t
      );
      return editTask;
    });

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-transparent">
          <BsPencil className="fill-gray-500 size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Edit Task</DialogTitle>
          <DialogDescription asChild>
            <form onSubmit={handleSubmit} id="editForm">
              <div className="grid grid-cols-12">
                <p className="col-span-2">Nazwa</p>
                <input
                  className="border border-black col-span-6 text-black p-1 form-control"
                  type="text"
                  value={title}
                  onChange={(e) => {
                    updateTitle(e.target.value);
                  }}
                  required
                  name="nameEditForm"
                  id="nameEditForm"
                />
              </div>
              <div className="grid grid-cols-12 mt-2">
                <p className="col-span-2">Data</p>
                <input
                  className="border border-black col-span-6 text-black p-1 form-control"
                  type="date"
                  value={date}
                  onChange={(e) => {
                    updateDate(e.target.value);
                  }}
                  required
                  name="dateEditForm"
                  id="dateEditForm"
                />
              </div>
              <div className="grid grid-cols-12 mt-2">
                <p className="col-span-2">Started?</p>
                <input
                  className="col-span-6 mr-auto"
                  type="checkbox"
                  checked={isStarted}
                  onChange={(e) => {
                    updateIsStarted(e.target.checked);
                  }}
                  name="startedEditForm"
                  id="startedEditForm"
                />
              </div>
              <Button type="submit" className="w-32 bg-slate-500 mt-2">
                Zapisz
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
        <DialogDescription className="hidden"></DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default EditTask;
