import { SignedIn, UserButton, useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import GetUsers from "../hooks/GetUsers";
import Category from "./Category";
import Tasks from "./Tasks";

export default function Board() {
  const navigate = useNavigate();

  const { isSignedIn } = useAuth();

  const { user } = useUser();

  const AllUsers = GetUsers();

  if (isSignedIn) {
    const email = user.primaryEmailAddress.emailAddress;

    if (AllUsers === "load") {
      return <div className="loader"></div>;
    } else {
      return (
        <SignedIn>
          <div className="m-5">
            <UserButton />
          </div>
          <p>{user.fullName}</p>
          <p>{email}</p>
          <Category />
          <Tasks />
        </SignedIn>
      );
    }
  } else {
    navigate("/");
  }
}
