import { useAuth } from "@clerk/clerk-react";
import { useSelector } from "react-redux";
import GetTasks from "../hooks/GetTasks";
// import GetCategories from "../hooks/GetCategories";
// import { useState } from "react";

export default function Tasks() {
  const clickedCateg = useSelector((data) => data.categ);

  const { userId } = useAuth();

  const allTasks = GetTasks();

  // const categories = GetCategories();
  // const [category , setCategory] = useState("") //category input state variable
  // const [error, setError] = useState(""); //formulaire errors

  // function StoreCategory(e) {
  //   e.preventDefault();

  //   const isCategExist = categories.filter((categ) => categ.nameCategory === category && categ.userId === userId)

  //   if (category.nameCategory === "") {
  //     setError("Give a name to you category");
  //   } else if (isCategExist.length !== 0) {
  //     setError("This category already exist");
  //   } else {
  //     axios.post("http://localhost:8000/api/categories", { ...category });
  //     window.location.reload();
  //   }
  // }

  if (allTasks !== "load") {
    let Tasks;
    if (clickedCateg === "all" || clickedCateg === "") {
      Tasks = allTasks.filter((task) => task.userId === userId);
    } else {
      Tasks = allTasks.filter(
        (task) => task.userId === userId && task.nameCategory === clickedCateg
      );
    }
    return (
      <div>
        {Tasks.length !== 0 ? (
          Tasks.map((task, i) => (
            <div key={i}>
              <p>task : {task.description}</p>
            </div>
          ))
        ) : clickedCateg !== "" ? (
          <div>
            <p className="text-body-secondary">
              No tasks asigned to this category
            </p>
          </div>
        ) : (
          <div>
            <p className="text-body-secondary">Choose a category</p>
          </div>
        )}
      </div>
    );
  }
  else{
    return <div className="loader"></div>
  }
}
