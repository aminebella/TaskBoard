import React, { useState } from "react";
import GetCategories from "../hooks/GetCategories";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useAuth } from "@clerk/clerk-react";

export default function Category() {
  const categories = GetCategories();

  const { userId } = useAuth();

  const [index, setIndex] = useState(-2);
  const [showForm, setshowForm] = useState(false);
  const [categToMod, setcategToMod] = useState({
    nameCategory: "",
    color: "green",
    userId: userId,
  });
  const [oldCateg, setOldCateg] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  function HandleChangeCateg(e) {
    setcategToMod({ ...categToMod, [e.target.name]: e.target.value });
  }

  function EditCategory(e,categName) {
    e.preventDefault()
    const isCategExist = categories.filter(
      (categ) =>
        categ.nameCategory === categToMod.nameCategory &&
        categ.userId === userId
    );

    if (categToMod.nameCategory === "") {
      setError("Rename your category");
    } else if (isCategExist.length !== 0 || categToMod.nameCategory === "all") {
      setError("This category already exist");
    } else {
      axios.put(`http://localhost:8000/api/categories/${categName}/${userId}`, {
        ...categToMod,
      });
      window.location.reload();
    }
  }

  function DeleteCategory(e,categName) {
    e.preventDefault()
    //sweet alert "oussama"
    axios.delete(`http://localhost:8000/api/categories/${categName}/${userId}`);
    window.location.reload();
  }

  if (categories === "load") {
    return <div className="loader1"></div>;
  } else {
    const categs = categories.filter(
      (categorie) => categorie.userId === userId
    );
    return (
      <div>
        <p className="fw-bold fs-5">Task categories :</p>

        <div
          className="d-flex align-items-center gap-3 m-2"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIndex(-1);
            dispatch({
              type: "storeCateg",
              payload: "all",
            });
          }}
        >
          <span
            className="catColor"
            style={{ backgroundColor: "green" }}
          ></span>
          <span
            className={
              index === -1 && "fw-bold bg-body-secondary pt-0 pb-0 p-3 rounded"
            }
          >
            all
          </span>
        </div>

        {categs.length !== 0 && (
          categs.map((categorie, i) => (
            <div
              key={i}
              className="d-flex align-items-center gap-3 m-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIndex(i);
                dispatch({
                  type: "storeCateg",
                  payload: categorie.nameCategory,
                });
              }}
            >
              <span
                className="catColor"
                style={{ backgroundColor: categorie.color }}
              ></span>
              <span
                className={
                  i === index &&
                  "fw-bold bg-body-secondary pt-0 pb-0 p-3 rounded"
                }
              >
                {categorie.nameCategory}
              </span>
              <button onClick={(e) => DeleteCategory(e,categorie.nameCategory)}>
                Delete
              </button>
              <button
                onClick={() => {
                  setshowForm((prev) => !prev);
                  setcategToMod({ ...categorie });
                  setOldCateg(categorie.nameCategory);
                }}
              >
                Edit
              </button>
            </div>
          ))
        )}

        {showForm && (
          <form className="AddCategForm">
            <input
              type="text"
              placeholder="category name"
              name="nameCategory"
              onChange={(e) => HandleChangeCateg(e)}
              value={categToMod.nameCategory}
            />
            <input
              type="color"
              name="color"
              onChange={(e) => HandleChangeCateg(e)}
              value={categToMod.color}
            />
            <button onClick={(e) => EditCategory(e, oldCateg)}>Edit</button>
            <p>{error}</p>
          </form>
        )}
      </div>
    );
  }
}
