import React from "react";
import { UserButton, useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

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
      <div style={{ width: "30%" }}>
        <div className="m-5">
          <UserButton />
        </div>
        <p>{fullName}</p>
        <p>{email}</p>
        <div>
          <button onClick={() => navigate(`/`)}>Tasks</button>
        </div>
        <div>
          <button onClick={() => navigate(`/statistics/${userId}`)}>
            Statistics
          </button>
        </div>
      </div>
    );
  }
}
