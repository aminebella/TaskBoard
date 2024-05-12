import { useAuth } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import GetTasks from "../hooks/GetTasks";
import { useState } from "react";
import AddTasks from "./AddTasks";

export default function Tasks() {
  const clickedCateg = useSelector((data) => data.categ);

  const { userId } = useAuth();

  const allTasks = GetTasks();

  const [ShowAddTaskForm , setShowAddTaskForm] = useState(false)

  if (allTasks !== "load") {
    let Tasks;
    if (clickedCateg === "all") {
      Tasks = allTasks.filter((task) => task.userId === userId);
    } else {
      Tasks = allTasks.filter(
        (task) => task.userId === userId && task.nameCategory === clickedCateg
      );
    }
    return (
      <div>
        {

          Tasks.length !== 0 ? (
            Tasks.map((task, i) => (
              <div key={i}>
                <p>task : {task.description}</p>
              </div>
            ))
          ) : clickedCateg !== "" && (
            <div>
              <p className="text-body-secondary">
                No tasks asigned to this category
              </p>
            </div>
          )
        }
        <button onClick={()=>setShowAddTaskForm(prev=>!prev)}>Add Task</button>
        {
          ShowAddTaskForm && <AddTasks/>
        }
      </div>
    );
  }
  else{
    return <div className="loader"></div>
  }
}
