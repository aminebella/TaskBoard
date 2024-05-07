import { useAuth } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import GetTasks from "../hooks/GetTasks";


export default function Tasks() {
  const clickedCateg = useSelector((data) => data.categ);

  const { userId } = useAuth();

  const allTasks = GetTasks()

  if (allTasks !== 'load') {
    let Tasks = allTasks.filter((task) => task.userId === userId);
    if(clickedCateg !== ""){
        Tasks = allTasks.filter((task) => task.userId === userId && task.nameCategory === clickedCateg);
    }
        return (
          <div>
            {Tasks.length !== 0 ? (
              Tasks.map((task, i) => (
                <div key={i}>
                  <p>task : {task.description}</p>
                </div>
              ))
            ) : (
              <div>
                <p className="text-body-secondary">
                  No tasks asigned to this category
                </p>
              </div>
            )}
          </div>
        );
      }
}
