import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { useTasks } from "./tasks-provider";

export default function TasksPrimaryButtons() {
  const { setOpen } = useTasks();
  return (
    <div className="flex gap-2">
      <Button variant={"outline"} className="space-x-1" onClick={() => setOpen("import")}>
        <span>Import</span>
        <Download />
      </Button>
      <Button onClick={() => setOpen("create")} className="space-x-1">
        <span>Create</span>
        <Plus />
      </Button>
    </div>
  )
}