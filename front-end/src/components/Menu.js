import React from "react";
import { UserButton, useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Category from "./Category";

export default function Menu() {
  const navigate = useNavigate();

  const { isSignedIn, userId } = useAuth();

  const { user } = useUser();

  if (isSignedIn) {
    const email = user.primaryEmailAddress.emailAddress;
    let fullName;

    if (fullName) {
      fullName = user.fullName;
    } else {
      fullName = user.username;
    }
    return (
      <div>
        <div className="m-5">
          <UserButton />
        </div>
        <p>{fullName}</p>
        <p>{email}</p>
        <Category />
        <button onClick={() => navigate(`/api/stats/${userId}`)}>
          Statistics
        </button>
        <button onClick={() => navigate(`/`)}>
          Tasks
        </button>
      </div>
    );
  }
}
