import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "@clerk/clerk-react";
import GetCategories from "../hooks/GetCategories";
import toast, { Toaster } from "react-hot-toast";

export default function AddTasks() {
  const [description, setDescription] = useState("");
  const [nameCategory, setNameCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("green");
  const [CreateNewCateForm, setCreateNewCateForm] = useState(false);
  const { userId } = useAuth();

  const categories = GetCategories();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let selectedCategory = nameCategory === "" ? newCategory : nameCategory;

    const isCategExist = categories.filter(
      (categ) => categ.nameCategory === newCategory && categ.userId === userId
    );

    if (selectedCategory === newCategory) {

      if (isCategExist.length !== 0) {
        toast.error("This category name already exists");
      } else if(selectedCategory !== "" && selectedCategory !== "all") {
        axios.post("http://localhost:8000/api/categories", {
          nameCategory: newCategory,
          color: newCategoryColor,
          userId: userId,
        });

      }
    }

    let newTask

    if(selectedCategory === ""){
      newTask = {
        description,
        nameCategory: "all",
        userId,
      };
    }
    else{
      newTask = {
        description,
        nameCategory: selectedCategory,
        userId,
      };
    }
    
    if (isCategExist.length === 0) {
      try {
        await axios.post("http://localhost:8000/api/tasks", newTask);
        Swal.fire({
          icon: "success",
          title: "Task Added",
          text: "Your task has been added successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => window.location.reload());
      } catch (error) {
        console.error("Error adding task:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add task. Please try again later.",
          showCancelButton: "Back",
        });
      }
    }
  };

  if (categories !== "load") {
    return (
      <div className="container mt-4">
        <Toaster position="top-right" reverseOrder={false} />
        <h2 className="mb-4">Add Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category:
            </label>
            <select
              className="form-select"
              id="category"
              value={nameCategory}
              onChange={(e) => setNameCategory(e.target.value)}
              // required
            >
              <option hidden value="">
                Choose Existing Category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category.nameCategory}>
                  {category.nameCategory}
                </option>
              ))}
            </select>
            <p
              className="text-body-secondary text-decoration-underline"
              style={{ textAlign: "right", cursor: "pointer" }}
              onClick={() => setCreateNewCateForm((prev) => !prev)}
            >
              Create New Category
            </p>
            {CreateNewCateForm && (
              <span>
                <input
                  type="color"
                  onChange={(e) => setNewCategoryColor(e.target.value)}
                />
                <input
                  type="text"
                  className=""
                  placeholder="Enter New Category Name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  required
                />
              </span>
            )}
          </div>
          <button type="submit" className="btn btn-dark">
            Add Task
          </button>
        </form>
      </div>
    );
  }
}
